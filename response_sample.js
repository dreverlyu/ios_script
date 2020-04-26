var body = $response.body; //取出响应体并赋值
var obj = JSON.parse(body);




//重新打包为json字符串
body = JSON.stringify(obj);
$done(body);
