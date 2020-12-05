/**
 *@Author Drever
 *@Date 2020/12/05  下午 08:10
 *@Describe github.com/dreverlyu
 */
const appName ='3JXF'
const glory = init()
const viewListenHeaderVal = $prefs.valueForKey('glory_header_3jxf');
const method = 'POST';
// const endTime = parseInt(new Date().getTime()/1000);
const startTime = new Date().getTime() - 600*1000 ;
const url = 'http://221.204.170.88:8184/app/personalCenter/articleTime?type=2&time=652&articleId=14&appStartTime='+startTime.toString();

const myRequest = {
    url: url,
    method: method,
    headers: JSON.stringify(viewListenHeaderVal),
    body: JSON.stringify({"time": "600","ifScore":"1","appStartTime":startTime.toString(),"type": "2","userId":"2536713","articleId":"14"})
};


$task.fetch(myRequest).then(response => {
    console.log(response.body)
    var body = JSON.parse(response.body);
    $notify(appName,"视听学习", body.data+' 🎉 ')
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

