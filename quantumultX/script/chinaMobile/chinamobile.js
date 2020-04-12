//http://wap.sx.10086.cn/h/v1/sign/process

const cookieName = '中国移动签到'
const bodyKey = 'chen_body_10086'
const headerKey = 'chen_header_10086'
const chen = init()
let bodyVal = chen.getdata(bodyKey)
let headerVal = chen.getdata(headerKey)
sign()
function sign() {
  let url = {url: 'http://wap.sx.10086.cn/h/v1/sign/process',headers: JSON.parse(headerVal),body: JSON.parse(bodyVal)}
  chen.post(url, (error, response, data) => {
    chen.log(`${cookieName}, data: ${data}`)
    const result = JSON.parse(data)
    let subTitle = ``
    let detail = ``
    if (result.retCode == '0000') {
      subTitle = `签到结果: 成功`
      detail = `签到说明: ${result.retMsg}`
    }
    else {
      subTitle = `签到结果: 失败`
      detail = `说明: ${result.retMsg}`
    }
    chen.msg(cookieName, subTitle, detail)
    chen.done()
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
chen.done()
