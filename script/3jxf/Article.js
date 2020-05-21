/**
 *@Author Drever
 *@Date 2020/5/21  下午 11:11
 *@Describe github.com/dreverlyu
 */

/**
 * @fileoverview Template to compose HTTP reqeuest.
 *
 */

const appEndTime = new Date().getTime();
const appStartTime = appEndTime -38 ;
const articleId = Math.floor(Math.random()*10+1);
const url = 'http://221.204.170.88:8184/app/personalCenter/articleTime?type=1&time=38&articleId='+articleId+'&appStartTime='+appStartTime;
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
const body = '{"appEndTime":'+appEndTime+',"appStartTime":'+appStartTime+',"type":"1","time":"38","articleId":'+articleId+'}';

const myRequest = {
    url: url,
    method: method,
    headers: headers,
    body: body
};

$task.fetch(myRequest).then(response => {
    console.log(body)
    console.log(response.body.code == 0 ? "阅读文章"+response.body.data: "阅读失败！！" );
}, reason => {
    console.log(reason.error);
});
