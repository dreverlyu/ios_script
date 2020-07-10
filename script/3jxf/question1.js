
const url = "http://221.204.170.88:8184/app/question";
const body = "{\"userId\":\"2536713\",\"method\":1,\"totalGrade\":\"100\",\"list\":[{\"selectAnswer\":\"A\",\"grade\":10,\"ifCorrect\":1,\"questionCode\":\"66c0b8b74e9e4f61961ac919cf93e7dc\",\"questionType\":1},{\"selectAnswer\":\"D\",\"grade\":10,\"ifCorrect\":1,\"questionCode\":\"cda80de538814c3f82dc9c4d4ac58396\",\"questionType\":1},{\"selectAnswer\":\"B\",\"grade\":10,\"ifCorrect\":1,\"questionCode\":\"372d271b929e4a6f95f38b4a92b05522\",\"questionType\":1},{\"selectAnswer\":\"B\",\"grade\":10,\"ifCorrect\":1,\"questionCode\":\"74b9ac532b364d7183d1ad2218f2e9ba\",\"questionType\":1},{\"selectAnswer\":\"C\",\"grade\":10,\"ifCorrect\":1,\"questionCode\":\"a091dca9b0c4453b979f10934ddec2a9\",\"questionType\":1},{\"selectAnswer\":\"C\",\"grade\":10,\"ifCorrect\":1,\"questionCode\":\"bfbde7cb0d9543cea6ba4faa6a3272c8\",\"questionType\":1},{\"selectAnswer\":\"C\",\"grade\":10,\"ifCorrect\":1,\"questionCode\":\"010ce1aaa59a4667ac3fe60a8d1d9eb8\",\"questionType\":1},{\"selectAnswer\":\"A\",\"grade\":10,\"ifCorrect\":1,\"questionCode\":\"4dc30f15bd0244568a07f96f00b88f4a\",\"questionType\":1},{\"selectAnswer\":\"B\",\"grade\":10,\"ifCorrect\":1,\"questionCode\":\"8de0983b86454b64b18a751217bebc23\",\"questionType\":3},{\"selectAnswer\":\"A\",\"grade\":10,\"ifCorrect\":1,\"questionCode\":\"cef67bd0d449407ca8323434f27365a2\",\"questionType\":1}],\"summaryCode\":\"1a40dba7b2d24acb9b6c9e5759eea871\"}";
const questionHeaderVal = $prefs.valueForKey('glory_header_3jxf');

const request = {
    url: url,
    headers: JSON.stringify(questionHeaderVal),
    method: "post",
    body: body
};

$task.fetch(request).then(response => {
        console.log(response.body)
        var body = JSON.parse(response.body);
        if(body.message == "请求成功"){
            $notify("3JXF","我要答题success🎉", "目前排名"+body.data.bestRank)}
 
    }, reason => {
        console.log(reason.error);
    });
