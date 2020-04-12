/*~~~~~~~~~~~~~~~~
QX 1.0.7+ :
[task_local]
0 9 * * * kuaishou.js

[rewrite_local]
# Get bilibili cookie. QX 1.0.5(188+):
https:\/\/nebula\.kuaishou\.com\/rest\/n\/nebula\/activity\/earn\/overview url script-request-header kuaishou.js
~~~~~~~~~~~~~~~~
QX or Surge MITM = nebula.kuaishou.com
~~~~~~~~~~~~~~~~

*/
const CookieName = '中国移动'
const cookieKey = 'cookie_10086'
const sy = init()
const cookieVal = sy.getdata(cookieKey);

let isGetCookie = typeof $request !== 'undefined'

if (isGetCookie) {
  GetCookie()
} else {
  sign()
}

function GetCookie() {
  if ($request.headers) {
    var CookieValue = $request.headers['Cookie'];

    if (sy.getdata(cookieKey) != (undefined || null)) {
      if (sy.getdata(cookieKey) != CookieValue) {
        var cookie = sy.setdata(CookieValue, cookieKey);
        if (!cookie) {
          sy.msg("更新" + CookieName + "Cookie失败‼️", "", "");
          sy.log(`[${CookieName}] 获取Cookie: 失败`);
        } else {
          sy.msg("更新" + CookieName + "Cookie成功 🎉", "", "");
          sy.log(`[${CookieName}] 获取Cookie: 成功, Cookie: ${CookieValue}`)
        }
      }
    } else {
      var cookie = sy.setdata(CookieValue, cookieKey);
      if (!cookie) {
        sy.msg("首次写入" + CookieName + "Cookie失败‼️", "", "");
      } else {
        sy.msg("首次写入" + CookieName + "Cookie成功 🎉", "", "");
      }
    }
  } else {
    sy.msg("写入" + CookieName + "Cookie失败‼️", "", "配置错误, 无法读取请求头, ");
  }
  sy.done()
}

function sign() {
  return new Promise((resolve, reject) => {
    let signurl = {
      url: 'http://wap.sx.10086.cn/h/v1/sign/process',
      headers: {Cookie: cookieVal}}
    sy.post(signurl, (error, response, data) => {
      sy.log(`${CookieName}, data: ${data}`)
      let result = JSON.parse(data)
      if(result.retCode != '0000'){
        subTitle = `签到结果: ${result.retMsg}`
        sy.msg(CookieName,subTitle,'')}
      sy.log(`错误代码: ${result.retCode}, 返回信息: ${result.retMsg}`)
    })
    earn()
    info()
    resolve()
  })
}
function earn() {
  return new Promise((resolve, reject) => {
    earnurl = {
      url: 'http://wap.sx.10086.cn/h/v1/sign/process',
      headers: {Cookie: cookieVal}}
    sy.get(earnurl, (error, response, data) => {
      sy.log(`${CookieName}, data: ${data}`)
      let result = JSON.parse(data)
      if (result.retCode == '0000'){
        subTitle = '签到成功'
        resolve()
      } else if (result.retMsg == '数据异常, 请稍后再试'){
        detail = '签到失败'
        resolve()
      }
    })
  })
}

function init() {
  isSurge = () => {
    return undefined === this.$httpClient ? false : true
  }
  isQuanX = () => {
    return undefined === this.$task ? false : true
  }
  getdata = (key) => {
    if (isSurge()) return $persistentStore.read(key)
    if (isQuanX()) return $prefs.valueForKey(key)
  }
  setdata = (key, val) => {
    if (isSurge()) return $persistentStore.write(key, val)
    if (isQuanX()) return $prefs.setValueForKey(key, val)
  }
  msg = (title, subtitle, body) => {
    if (isSurge()) $notification.post(title, subtitle, body)
    if (isQuanX()) $notify(title, subtitle, body)
  }
  log = (message) => console.log(message)
  get = (url, cb) => {
    if (isSurge()) {
      $httpClient.get(url, cb)
    }
    if (isQuanX()) {
      url.method = 'GET'
      $task.fetch(url).then((resp) => cb(null, {}, resp.body))
    }
  }
  post = (url, cb) => {
    if (isSurge()) {
      $httpClient.post(url, cb)
    }
    if (isQuanX()) {
      url.method = 'POST'
      $task.fetch(url).then((resp) => cb(null, {}, resp.body))
    }
  }
  done = (value = {}) => {
    $done(value)
  }
  return { isSurge, isQuanX, msg, log, getdata, setdata, get, post, done }
}
sy.done()
