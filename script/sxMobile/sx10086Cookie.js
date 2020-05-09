/**
 *@Author summer
 *@Date 2020/5/1  上午 10:36
 *@Describe github.com/dreverlyu
 *
 *[task_local]
 * # 山西移动app签到
 * 09  * * * dreverlyu/script/heLife/helife10086.js
 * [rewrite_local]
 * # Get Cookie
 * ^http:\/\/he\.sx\.chinamobile\.com\/h\/rest\/v1\/user\/* url script-request-body dreverlyu/script/sx10086/sx10086Cookie.js
 * # MITM = he.sx.chinamobile.com
 * 山西移动和生活获取cookie,访问主页即可,因为双重登录，需验证token
 */
const cookieName = 'sx10086Cookie'
const sxTokenUrlKey = 'glory_tokenUrl_10086'
const sxTokenHeaderKey = 'glory_tokenHeader_10086'
const sxSignUrlKey = 'glory_signUrl_10086'
const sxSgnHeaderKey = 'glory_signHeader_10086'

const glory = init()

const reqUrl = $request.url
const reqRef = $request.headers.Referer
if ($request && $request.method != 'OPTIONS' && reqUrl.indexOf('v1/businessTree/adInfoQry') >= 0) {
  const tokenUrlVal = reqUrl
  const tokenHeaderVal = JSON.stringify($request.headers)
  if (tokenUrlVal) glory.setdata(tokenUrlVal, sxTokenUrlKey)
  if (tokenHeaderVal) glory.setdata(tokenHeaderVal, sxTokenHeaderKey)
  title = glory.msg(cookieName, `获取刷新链接: 成功`, ``)
} else if ($request && $request.method != 'OPTIONS' && reqUrl.indexOf('rest/v1/sign/') >= 0) {
  const signUrlVal = reqUrl
  const signHeaderVal = JSON.stringify($request.headers)
  if (signUrlVal) glory.setdata(signUrlVal, sxSignUrlKey)
  if (signHeaderVal) glory.setdata(signHeaderVal, sxSgnHeaderKey)
  title = glory.msg(cookieName, `获取Cookie: 成功`, ``)
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
glory.done()