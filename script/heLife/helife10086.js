const cookieName = 'CookieHeLife'
const cookieKey = 'chavy_cookie_HE10086'
const chavy = init()
const cookieVal = chavy.getdata(cookieKey)

sign()

function sign() {
    let url = {
        url: `http://he.sx.chinamobile.com/h/rest/v1/sign/process`,
        headers: {
            Cookie: cookieVal
        }
    }
    url.headers['Origin'] = 'http://he.sx.chinamobile.com'
    url.headers['Referer'] = 'http://he.sx.chinamobile.com/h/index.html'
    url.headers['Accept'] = 'application/json, text/plain, */*'
    url.headers['User-Agent'] = 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 oncon(iphone;13.3.1;com.MobileCommunicationSX.iHeYueSX;1.0.4) he'
    url.headers['Accept-Language'] = 'zh-cn'
    url.headers['Content-Length'] = '19'
    chavy.get(url, (error, response, data) => {
        let result = JSON.parse(data)
        let title = `${cookieName}`
        // 签到成功
        if (result.retMsg=="OK" && result.retCode == "0000") {
            let subTitle = `签到结果: 成功`
            chavy.msg(title, subTitle, detail)
        }
        // 签到失败
        else {
            let subTitle = `签到结果: 失败`
            let detail = `说明: ${result.message}`
            chavy.msg(title, subTitle, detail)
        }
        chavy.log(`${cookieName}, data: ${data}`)
    })

    chavy.done()
}
// function getsigninfo() {
//     let url = {
//         url: `https://api.live.bilibili.com/sign/GetSignInfo`,
//         headers: {
//             Cookie: cookieVal
//         }
//     }
//     url.headers['Host'] = 'api.live.bilibili.com'
//     url.headers['Origin'] = 'http://live.bilibili.com'
//     url.headers['Referer'] = 'http://live.bilibili.com/'
//     url.headers['Accept'] = 'application/json, text/javascript, */*; q=0.01'
//     url.headers['User-Agent'] = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_2) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.4 Safari/605.1.15'
//
//     chavy.get(url, (error, response, data) => {
//         let title = `${cookieName}`
//         let subTitle = `签到结果: 成功 (重复签到)`
//         let detail = ``
//         let result = JSON.parse(data)
//         if (result && result.code == 0) detail = `本月累计: ${result.data.hadSignDays}/${result.data.allDays}次, 说明: ${result.data.text}`
//         chavy.msg(title, subTitle, detail)
//     })
// }
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
