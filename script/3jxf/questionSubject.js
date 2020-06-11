
const url = "http://221.204.170.88:8184/app/question";
const random = Math.floor(Math.random()*1000+1);
const code = "57782847872c4936a7d718472a36738e" + random.toString();
const body = "{\"userId\":\"2536713\",\"method\":4,\"totalGrade\":\"90\",\"list\":[{\"selectAnswer\":\"A-B-D\",\"grade\":10,\"ifCorrect\":1,\"questionCode\":\"38ee82960508481386eda038be97e415\",\"questionType\":2},{\"selectAnswer\":\"B-C-D\",\"grade\":10,\"ifCorrect\":1,\"questionCode\":\"bed556dbcc6f4d3f8af1772e3e2e4c47\",\"questionType\":2},{\"selectAnswer\":\"A\",\"grade\":10,\"ifCorrect\":1,\"questionCode\":\"971fada4ec734313ab36a2dd4db93dd4\",\"questionType\":1},{\"selectAnswer\":\"A\",\"grade\":10,\"ifCorrect\":1,\"questionCode\":\"aa13f82230ab4bef82c3377feaf2e904\",\"questionType\":1},{\"selectAnswer\":\"A\",\"grade\":10,\"ifCorrect\":1,\"questionCode\":\"cef67bd0d449407ca8323434f27365a2\",\"questionType\":1},{\"selectAnswer\":\"A-B-C-E\",\"grade\":10,\"ifCorrect\":1,\"questionCode\":\"6e47c7f782af4596a3b9274f20f6c0cf\",\"questionType\":2},{\"selectAnswer\":\"A\",\"grade\":10,\"ifCorrect\":1,\"questionCode\":\"04114cabccec481aa2b7326227fe974a\",\"questionType\":1},{\"selectAnswer\":\"B\",\"grade\":10,\"ifCorrect\":1,\"questionCode\":\"c21545c1d7f24c3aaa6e16ac829178c7\",\"questionType\":1},{\"selectAnswer\":\"C\",\"grade\":10,\"ifCorrect\":1,\"questionCode\":\"a2274a9fee57424a84edc32ee4edc353\",\"questionType\":1},{\"selectAnswer\":\"A\",\"grade\":10,\"ifCorrect\":2,\"questionCode\":\"c3a6d72dd05146bf9f267bee41637bcf\",\"questionType\":1}],\"summaryCode\":"+code+"}";
const headers = {
    "Connection": "close",
    "Accept-Encoding": "gzip, deflate",
    "Content-Type": "application/json",
    "Origin": "http://sxzhdjkhd.sxdygbjy.gov.cn:8081",
    "userId": "2536713",
    "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148",
    "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHBpcmVUaW1lIjoxNTkxNzE0ODMyNjgzLCJ1c2VyQ29kZSI6MjUzNjcxMywiYWNjb3VudCI6IjE4MjM1MTUyMDcwIiwiYWNjb3VudFR5cGUiOjF9.n8qf5VNU8XkT5ulq43FBSYzO_C2oN5si8w3iaK4m1yk",
    "Host": "221.204.170.88:8184",
    "Referer": "http://sxzhdjkhd.sxdygbjy.gov.cn:8081/zhdj-pre/",
    "Accept-Language": "zh-cn",
    "Accept": "*/*",
    "Content-Length": "1251"
};
const request = {
    url: url,
    headers: headers,
    method: "post",
    body: body
};

$task.fetch(request).then(response => {
        console.log(response.body)
        var body = JSON.parse(response.body);
        if(body.message == "请求成功"){
            $notify("3JXF","专题赛success🎉", "目前排名"+body.body.bestRank)}
    }, reason => {
        console.log(reason.error);
    });

