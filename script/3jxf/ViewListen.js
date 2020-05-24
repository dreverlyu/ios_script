/**
 *@Author Drever
 *@Date 2020/5/21  下午 08:10
 *@Describe github.com/dreverlyu
 */

/**
 * @fileoverview  Template to compose HTTP reqeuest.
 *
 */

const appName ='3JXF'
const glory = init()
const taskHeaderKey = 'glory_header_3jxf'
const taskHeaderVal = glory.getdata(taskHeaderKey);
const method = 'POST';
const endTime = parseInt(new Date().getTime()/1000);
const startTime = endTime - 652 ;
const url = 'http://221.204.170.88:8184/app/personalCenter/articleTime?type=2&time=652&articleId=14&appStartTime='+startTime.toString();

const myRequest = {
    url: url,
    method: method,
    headers:  {
        'Accept' : '*/*',
        'Accept-Encoding' : 'gzip, deflate',
        'Connection' : 'keep-alive',
        'Content-Type' : 'application/json',
        'Host' : '221.204.170.88:8184',
        'User-Agent' : 'san jin xian feng/3.2.7 (iPhone; iOS 13.3.1; Scale/3.00)',
        'Authorization' : 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHBpcmVUaW1lIjoxNTkwMTQzMjc3OTU3LCJ1c2VyQ29kZSI6MjUzNjcxMywiYWNjb3VudCI6IjE4MjM1MTUyMDcwIiwiYWNjb3VudFR5cGUiOjF9.a1u7bis0y0TIwktBsrLNIAlMZInWTgN4tcgxl6oj_uY',
        'Accept-Language' : 'zh-Hans-CN;q=1, zh-Hant-HK;q=0.9, en-CN;q=0.8'
    },
    body: JSON.stringify({"appEndTime":endTime.toString(),"appStartTime":startTime.toString(),"type": "2","time": "652","articleId":"14"})
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

