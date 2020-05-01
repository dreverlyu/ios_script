/**
 *@Author summer
 *@Date 2020/3/28  上午 10:38
 *@Describe github.com/dreverlyu
 *
 * 中国移动官方app获取cookie(移动山西省归属地专用)
 * 需访问移动APP,手动进入签到，并登陆获取鉴权cookie
 * ^http:\/\/wap\.sx\.10086\.cn\/h\/rest\/v1\/sign\/query$ url script-request-body dreverlyu/script/chinaMobile/chinamobileCookie.js
 */

const cookieName = 'CookieChinaMobileApp'
const cookieKey = 'glory_cookie_ChinaMobile'
const glory = init()
const cookieVal = $request.headers['Cookie']
if (cookieVal) {
    if (glory.setdata(cookieVal, cookieKey)) {
        glory.msg(`${cookieName}`, '获取Cookie: 成功', '')
        glory.log(`[${cookieName}] 获取Cookie: 成功, cookie: ${cookieVal}`)
    }
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
