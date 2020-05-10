/**
 *@Author summer
 *@Date 2020/5/1  上午 10:36
 *@Describe github.com/dreverlyu
 *
 * 登录加签到
 */
const cookieName = 'sx10086Cookie'
const sxTokenUrlKey = 'glory_tokenUrl_10086'
const sxTokenHeaderKey = 'glory_tokenHeader_10086'
const sxSignUrlKey = 'glory_signUrl_10086'
const sxSgnHeaderKey = 'glory_signHeader_10086'
const glory = init()
const tokenUrlVal = glory.getdata(sxTokenUrlKey)
const tokenHeaderVal = glory.getdata(sxTokenHeaderKey)
const signUrlVal = glory.getdata(sxSignUrlKey)
let signHeaderVal = glory.getdata(sxSgnHeaderKey)
const signInfo = {}

sign()

function loginApp(cb) {
    console.log('tokenUrlVal'+tokenUrlVal,'header'+tokenHeaderVal)
    const url = { url: tokenUrlVal, headers: JSON.parse(tokenHeaderVal), body:JSON.stringify({'appId': '116'})}
    glory.post(url, (error, response, data) => {
        const respCookie = response.headers['Set-Cookie']
        console.log('login respCookie:'+respCookie)
        glory.log(`${cookieName}, loginApp - respcookie: ${respCookie}`)
        if (respCookie && respCookie.indexOf('jsession_id_4_boss=') >= 0) {
            const signHeaderObj = JSON.parse(signHeaderVal)
            let signCookie = signHeaderObj['Cookie']
            console.log('登录cookie==>'+signCookie)
            signCookie = signCookie.concat(/jsession_id_4_boss=([^;]*)/)
            signHeaderObj['Cookie'] = signCookie
            signHeaderVal = JSON.stringify(signHeaderObj)
        }
        cb()
    })
}

function sign() {
    loginApp(() => {
        const url = { url: signUrlVal, headers: JSON.parse(signHeaderVal) , body: JSON.stringify({'channel': 'heapp'})}
        glory.post(url, (error, response, data) => {
            glory.log(`${cookieName}, data: ${data}`)
            const result = JSON.parse(data)
            let subTitle = ``
            let detail = ``
            if (result.retCode == '0000'|| result.receiveInfo.signCount > 0 ) {
                subTitle = `签到结果: 成功 🎉 签到: ${result.receiveInfo.signCount} 天 🌿`
            } else if (result.retMsg == '重复提交签到' ) {
                subTitle = `签到结果: 成功 (重复签到) 🌱 `
            } else {
                subTitle = `签到结果: 失败`
            }
            glory.msg(cookieName, subTitle, detail)
            glory.done()
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
            $task.fetch(url).then((resp) => cb(null, resp, resp.body))
        }
    }
    post = (url, cb) => {
        if (isSurge()) {
            $httpClient.post(url, cb)
        }
        if (isQuanX()) {
            url.method = 'POST'
            $task.fetch(url).then((resp) => cb(null, resp, resp.body))
        }
    }
    done = (value = {}) => {
        $done(value)
    }
    return { isSurge, isQuanX, msg, log, getdata, setdata, get, post, done }
}


