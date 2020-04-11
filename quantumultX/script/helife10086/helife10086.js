const cookieName ='山西移动和生活'
const cookieKey = 'sx_cookie_10086'
const chen = init()
let cookieVal = chen.getdata(cookieKey)
sign()
function sign() {
    let url = {url: 'http://he.sx.chinamobile.com/h/rest/v1/sign/process',headers: { Cookie:cookieVal}}
    url.headers['Origin'] = ' http://he.sx.chinamobile.com'
    url.headers['Connection'] = `keep-alive`
    url.headers['Content-Type'] = ` application/json;charset=utf-8`
    url.headers['Accept'] = `application/json, text/plain, */*`
    url.headers['Host'] = `he.sx.chinamobile.com`
    url.headers['User-Agent'] = ` Mozilla/5.0 (iPhone; CPU iPhone OS 13_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 oncon(iphone;13.3.1;com.MobileCommunicationSX.iHeYueSX;1.0.4) he`
    url.headers['Accept-Language'] = `zh-cn`
    url.headers['Accept-Encoding'] = ` gzip, deflate`
    chen.get(url, (error, response, data) => {
      const result = JSON.parse(data)
      const title = `${cookieName}`
      let subTitle = ``
      let detail = ``
    
      if (result.retCode == 0 && result.retMsg == 'OK') {
        subTitle = `签到结果: 成功`
      } else if (result.resultCode == 3) {
          subTitle = `签到结果: 失败,需要重新获得cookie`
      } else {
        subTitle = `签到结果: 未知`
        detail = `说明: ${result.resultrMsg}`
      }
      chen.msg(title, subTitle, detail)
    })
    chen.done()
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
  
