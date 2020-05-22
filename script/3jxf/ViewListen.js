/**
 *@Author Drever
 *@Date 2020/5/21  下午 08:10
 *@Describe github.com/dreverlyu
 */

/**
 * @fileoverview Template to compose HTTP reqeuest.
 *
 */

const appName ='三晋先锋'
const glory = init()
const taskHeaderKey = 'glory_header_3jxf'
const taskHeaderVal = glory.getdata(taskHeaderKey);
const url = 'http://221.204.170.88:8184/app/learnRecord';
const method = 'POST';
const endTime = Date.parse(new Date().getTime()/1000);
const startTime = endTime - 608;

const myRequest = {
    url: url,
    method: method,
    headers: taskHeaderVal,
    body: JSON.stringify({"watchTime": "608","appStartTime":startTime,"type":"0","userId":"2536713","appEndTime":endTime})
};


$task.fetch(myRequest).then(response => {
    console.log(myRequest)
    console.log(response.body.message + "\n\n" + response.body.success == "true" ? "success": "failed" )
    }, reason => {
        console.log(reason.error);
    });

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

