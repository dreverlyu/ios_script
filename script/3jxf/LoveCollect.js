/**
 *@Author Drever
 *@Date 2020/5/22   下午 06:19
 *@Describe github.com/dreverlyu
 */
const appName = "三晋先锋"
const glory = init()
const loveUrl = 'http://221.204.170.88:8184/app/love';
const collectUrl = 'http://221.204.170.88:8184/app/collect';
const method = 'POST';
//const loveHeaderVal = glory.getdata('glory_header_3jLove').toString()

//const loveHeaderVal = "{'Content-Type' : 'application/json'"+ tempHeaderVal.substring(1)

const loveHeaderVal =  {
    'Accept' : '*/*',
    'Accept-Encoding' : 'gzip, deflate',
    'Connection' : 'keep-alive',
    'Content-Type' : 'application/json',
    'Host' : '221.204.170.88:8184',
    'User-Agent' : 'san jin xian feng/3.2.7 (iPhone; iOS 13.3.1; Scale/3.00)',
    'Authorization' : 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHBpcmVUaW1lIjoxNTkwMTQzMjc3OTU3LCJ1c2VyQ29kZSI6MjUzNjcxMywiYWNjb3VudCI6IjE4MjM1MTUyMDcwIiwiYWNjb3VudFR5cGUiOjF9.a1u7bis0y0TIwktBsrLNIAlMZInWTgN4tcgxl6oj_uY',
    'Accept-Language' : 'zh-Hans-CN;q=1, zh-Hant-HK;q=0.9, en-CN;q=0.8'
};
const defaultUniqueId = 6062198
const uniqueId = defaultUniqueId + Math.floor(Math.random()*1000+1);
const loveBody = JSON.stringify({"type":"1","userId":"2536713","uniqueId":uniqueId.toString()});
const collectBody = JSON.stringify({"type":"1","userId":"2536713","uniqueId":uniqueId.toString()});
const loveRequest = {
    url: loveUrl,
    method: method,
    headers: loveHeaderVal,
    body: loveBody
};
const collectRequest = {
    url: collectUrl,
    method: method,
    headers: loveHeaderVal,
    body: collectBody
};
$task.fetch(loveRequest).then(response => {
    console.log(loveHeaderVal)
    console.log(response.body)
    var body = JSON.parse(response.body);
    if (body.message == "点赞成功"){
     $notify(appName,"点赞成功","文章编号"+uniqueId.toString());
    }else if (body.message == "该用户已点赞"){
        $notify(appName,"这篇文章已点赞","文章编号"+uniqueId);
    }
}, reason => {
    console.log(reason.error);
});

$task.fetch(collectRequest).then(response => {
    console.log(body)
    var body = JSON.parse(response.body);
    if (body.message == "收藏成功"){
        console.log(appName+"收藏成功"+"文章编号"+uniqueId.toString());
    }
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
