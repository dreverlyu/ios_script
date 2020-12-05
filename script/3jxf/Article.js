/**
 *@Author Drever
 *@Date 2020/12/05  下午 11:11
 *@Describe github.com/dreverlyu
 */

/**
 * @fileoverview  Template to compose HTTP reqeuest.
 *
 */
//var aritcleHeaderVal = $prefs.valueForKey('glory_header_3jxf');
// const appEndTime = parseInt(new Date().getTime()/1000);
const aritcleHeaderVal =  {
    'Connection' : `keep-alive`,
    'Accept-Encoding' : `gzip, deflate`,
    'sUserId' : `2536713`,
    'version' : `3.3.4`,
    'Content-Type' : `application/json`,
    'User-Agent' : `SJXF/3.3.4 (iPhone; iOS 13.3.1; Scale/3.00)`,
    'signature' : `CE6FE7897D8DBB54F41C328AE0434409`,
    'Authorization' : `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHBpcmVUaW1lIjoxNjA3MzQzODYyMzg4LCJ1c2VyQ29kZSI6MjUzNjcxMywiYWNjb3VudCI6IjE4MjM1MTUyMDcwIiwiYWNjb3VudFR5cGUiOjF9.dE0RH2gfHl_0sOFibEqHyjriRNe4AIdWgM_8HnYqKpA`,
    'Host' : `221.204.170.88:8184`,
    'Accept-Language' : `zh-Hans-CN;q=1, zh-Hant-HK;q=0.9, en-CN;q=0.8`,
    'Accept' : `*/*`
    };
const appStartTime = new Date().getTime() -38*1000 ;
const articleId = 673000 + Math.floor(Math.random()*1000+1);
// const url = 'http://221.204.170.88:8184/app/personalCenter/articleTime?type=1&time=38&articleId='+articleId.toString()+'&appStartTime='+appStartTime.toString();
const url = 'http://221.204.170.88:8184/app/businessScore';
const method = 'POST';
const body = JSON.stringify({"appStartTime":appStartTime.toString(),"ifScore":"1","time":"38","userId":"2536713","articleId":articleId.toString()});

const articleRequest = {
    url: url,
    method: method,
    headers: aritcleHeaderVal,
    body: body
};

//var count = 0;

//每两秒执行一次，阅读两次文章后就退出
// var readTask = setInterval(() =>{
    $task.fetch(articleRequest).then(response => {
        console.log(response.body)
        var body = JSON.parse(response.body);
        if(body.msg == "请求成功"){
            $notify("3JJXF🎉","阅读文章编号"+articleId, body.data)}
        // count +=2;
    }, reason => {
        console.log(reason.error);
    });
//     if (count >=4){
//         clearInterval(readTask);
//     }
// },2000);


