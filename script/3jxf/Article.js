/**
 *@Author Drever
 *@Date 2020/5/21  下午 11:11
 *@Describe github.com/dreverlyu
 */

/**
 * @fileoverview  Template to compose HTTP reqeuest.
 *
 */

const appEndTime = parseInt(new Date().getTime()/1000);
const appStartTime = appEndTime -38 ;
const articleId = 1836000 + Math.floor(Math.random()*500+1);
const url = 'http://221.204.170.88:8184/app/personalCenter/articleTime?type=1&time=38&articleId='+articleId.toString()+'&appStartTime='+appStartTime.toString();
const method = 'POST';
const headers = {
    'Accept' : '*/*',
    'Accept-Encoding' : 'gzip, deflate',
    'Connection' : 'keep-alive',
    'Content-Type' : 'application/json',
    'Host' : '221.204.170.88:8184',
    'User-Agent' : 'san jin xian feng/3.2.7 (iPhone; iOS 13.3.1; Scale/3.00)',
    'Authorization' : 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHBpcmVUaW1lIjoxNTkwMTQzMjc3OTU3LCJ1c2VyQ29kZSI6MjUzNjcxMywiYWNjb3VudCI6IjE4MjM1MTUyMDcwIiwiYWNjb3VudFR5cGUiOjF9.a1u7bis0y0TIwktBsrLNIAlMZInWTgN4tcgxl6oj_uY',
    'Accept-Language' : 'zh-Hans-CN;q=1, zh-Hant-HK;q=0.9, en-CN;q=0.8'
};
const body = JSON.stringify({"appEndTime":appEndTime.toString(),"appStartTime":appStartTime.toString(),"type":"1","time":"38","articleId":articleId.toString()});

const myRequest = {
    url: url,
    method: method,
    headers: headers,
    body: body
};

$task.fetch(myRequest).then(response => {
    console.log(response.body)
    var body = JSON.parse(response.body);
    if(body.msg == "请求成功"){
    $notify("三晋先锋","阅读🌱文章编号"+articleId, body.data)} 
}, reason => {
    console.log(reason.error);
});
