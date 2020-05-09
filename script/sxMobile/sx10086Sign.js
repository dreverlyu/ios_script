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
    console.log('tokenUrlVal'+tokenUrlVal,'header'+headers)
    const url = { url: tokenUrlVal, headers: JSON.parse(tokenHeaderVal) }
    glory.get(url, (error, response, data) => {
        const respcookie = response.headers['Set-Cookie']
        console.log('respcookie:'+respcookie)
        glory.log(`${cookieName}, loginApp - respcookie: ${respcookie}`)
        if (respcookie && respcookie.indexOf('jsession_id_4_boss=') >= 0) {
            const signheaderObj = JSON.parse(signHeaderVal)
            let signcookie = signheaderObj['Cookie']
            signcookie = signcookie.concat(/jsession_id_4_boss=([^;]*)/)
            signheaderObj['Cookie'] = signcookie
            console.log('signcookie'+signheaderObj);
            signHeaderVal = JSON.stringify(signheaderObj)
        }
        cb()
    })
}

function sign() {
    loginApp(() => {
        const url = { url: signUrlVal, headers: JSON.parse(signHeaderVal) }
        glory.get(url, (error, response, data) => {
            glory.log(`${cookieName}, data: ${data}`)
            const result = JSON.parse(data)
            let subTitle = ``
            let detail = ``
            if (result.retCode == '0000') {
                subTitle = `签到结果: 成功`
            } else if (result.retMsg == '重复提交签到' ) {
                subTitle = `签到结果: 成功 (重复签到)`
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


