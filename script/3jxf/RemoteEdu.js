/**
 *@Author Drever
 *@Date 2020/12/06  下午 08:10
 *@Describe  github.com/dreverlyu
 */
const url = `http://221.204.170.88:8184/app/learnRecord`;
const method = `POST`;
const headers = {
'Connection' : `keep-alive`,
'Accept-Encoding' : `gzip, deflate`,
'sUserId' : `2536713`,
'version' : `3.3.4`,
'Content-Type' : `application/json`,
'User-Agent' : `SJXF/3.3.4 (iPhone; iOS 13.3.1; Scale/3.00)`,
'signature' : `8B30A91AC5F3B631471F2D75C505BE75`,
'Authorization' : `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHBpcmVUaW1lIjoxNjA3NDAzNTA2MDg0LCJ1c2VyQ29kZSI6MjUzNjcxMywiYWNjb3VudCI6IjE4MjM1MTUyMDcwIiwiYWNjb3VudFR5cGUiOjF9.6SGmAAX97PUlU1CQKr0C0iNg0pSvriNp3Z6WBi6YXvc`,
'Host' : `221.204.170.88:8184`,
'Accept-Language' : `zh-Hans-CN;q=1, zh-Hant-HK;q=0.9, en-CN;q=0.8`,
'Accept' : `*/*`
};
const endTime = parseInt(new Date().getTime()/1000);
const startTime = endTime - 1800;
const body = JSON.stringify({"watchTime":"1800","appStartTime":startTime,"type":"3","userId":"2536713","appEndTime":endTime});

const myRequest = {
    url: url,
    method: method,
    headers: headers,
    body: body
};

$task.fetch(myRequest).then(response => {
    console.log(response.statusCode + "\n\n" + response.body);
    $notify("远程教育",  response.body.toString().message + ' 🎉 ', response.body.toString().success);
}, reason => {
    console.log(reason.error);
})

// 2020/5/21  下午 08:10 edit before
// const appName ='3JXF';
// const glory = init();
// const remoteEduHeaderVal = $prefs.valueForKey('glory_header_3jxf');
// const url = 'http://221.204.170.88:8184/app/learnRecord';
// const method = 'POST';
// const endTime = parseInt(new Date().getTime()/1000);
// const startTime = endTime - 1808;

// const myRequest = {
//     url: url,
//     method: method,
//     headers: JSON.stringify(remoteEduHeaderVal),
//     body: JSON.stringify({"watchTime": "1808","appStartTime":startTime.toString(),"type":"1","userId":"2536713","appEndTime":endTime.toString()})
// };


// $task.fetch(myRequest).then(response => {
//     console.log(response.body)
//     $notify(appName +"远程教育",  response.body.toStribg().message + ' 🎉 ', response.body.toString().success)
//     }, reason => {
//         console.log(reason.error);
//     });

// function init() {
//     isSurge = () => {
//         return undefined === this.$httpClient ? false : true
//     }
//     isQuanX = () => {
//         return undefined === this.$task ? false : true
//     }
//     getdata = (key) => {
//         if (isSurge()) return $persistentStore.read(key)
//         if (isQuanX()) return $prefs.valueForKey(key)
//     }
//     setdata = (key, val) => {
//         if (isSurge()) return $persistentStore.write(key, val)
//         if (isQuanX()) return $prefs.setValueForKey(key, val)
//     }
//     msg = (title, subtitle, body) => {
//         if (isSurge()) $notification.post(title, subtitle, body)
//         if (isQuanX()) $notify(title, subtitle, body)
//     }
//     log = (message) => console.log(message)
//     get = (url, cb) => {
//         if (isSurge()) {
//             $httpClient.get(url, cb)
//         }
//         if (isQuanX()) {
//             url.method = 'GET'
//             $task.fetch(url).then((resp) => cb(null, {}, resp.body))
//         }
//     }
//     post = (url, cb) => {
//         if (isSurge()) {
//             $httpClient.post(url, cb)
//         }
//         if (isQuanX()) {
//             url.method = 'POST'
//             $task.fetch(url).then((resp) => cb(null, {}, resp.body))
//         }
//     }
//     done = (value = {}) => {
//         $done(value)
//     }
//     return { isSurge, isQuanX, msg, log, getdata, setdata, get, post, done }
// }

