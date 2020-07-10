/**
 *@Author Drever
 *@Date 2020/5/21  下午 11:11
 *@Describe github.com/dreverlyu
 */

/**
 * @fileoverview  Template to compose HTTP reqeuest.
 *
 */
var aritcleHeaderVal = $prefs.valueForKey('glory_header_3jxf');
const appEndTime = parseInt(new Date().getTime()/1000);
const appStartTime = appEndTime -38 ;
const articleId = 1772000 + Math.floor(Math.random()*100+1);
const url = 'http://221.204.170.88:8184/app/personalCenter/articleTime?type=1&time=38&articleId='+articleId.toString()+'&appStartTime='+appStartTime.toString();
const method = 'POST';
const body = JSON.stringify({"appEndTime":appEndTime.toString(),"appStartTime":appStartTime.toString(),"type":"1","time":"38","articleId":articleId.toString()});

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
        count +=2;
    }, reason => {
        console.log(reason.error);
    });
//     if (count >=4){
//         clearInterval(readTask);
//     }
// },2000);


