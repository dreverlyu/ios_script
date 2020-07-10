/**
 *@Author Drever
 *@Date 2020/5/21  下午 08:13
 *@Describe github.com/dreverlyu
 */

const appName = '3JXF'
const taskHeaderKey = 'glory_header_3jxf'
const loveHeaderKey = 'glory_header_3jLove'
const answerHeaderKey = 'glory_header_answer'
const glory = init()
const requestUrl =  $request.url

const taskHeaderVal = JSON.stringify($request.headers)
    if (taskHeaderVal) {
        glory.setdata(taskHeaderVal, taskHeaderKey)
        glory.msg(appName, `获取request header: 成功`, `🎉`)
    }

// if (requestUrl.indexOf('/app/personalCenter/articleTime') >= 0) {
//     const taskHeaderVal = JSON.stringify($request.headers)
//     if (taskHeaderVal) {
//         glory.setdata(taskHeaderVal, taskHeaderKey)
//         glory.msg(appName, `获取request header: 成功`, `🎉`)
//     }
// }
// if (requestUrl.indexOf('/app/love') >= 0 || requestUrl.indexOf('/app/collect') >= 0) {
//     const loveHeaderVal = JSON.stringify($request.headers)
//     if (loveHeaderVal) {
//         glory.setdata(loveHeaderVal, loveHeaderKey)
//         glory.msg(appName, `获取点赞收藏header: 成功`, `🎉`)
//     }
// }
// if (requestUrl.indexOf('/app/question') >= 0 ) {
//     const answerHeaderVal = JSON.stringify($request.headers)
//     if (answerHeaderVal) {
//         glory.setdata(answerHeaderVal, answerHeaderKey)
//         glory.msg(appName, `获取答题header: 成功`, `🎉`)
//     }
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
glory.done()