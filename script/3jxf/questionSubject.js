
const url = "http://221.204.170.88:8184/app/question";
const body = "{\"userId\":\"2536713\",\"method\":4,\"totalGrade\":\"90\",\"list\":[{\"selectAnswer\":\"A-B-D\",\"grade\":10,\"ifCorrect\":1,\"questionCode\":\"38ee82960508481386eda038be97e415\",\"questionType\":2},{\"selectAnswer\":\"B-C-D\",\"grade\":10,\"ifCorrect\":1,\"questionCode\":\"bed556dbcc6f4d3f8af1772e3e2e4c47\",\"questionType\":2},{\"selectAnswer\":\"A\",\"grade\":10,\"ifCorrect\":1,\"questionCode\":\"971fada4ec734313ab36a2dd4db93dd4\",\"questionType\":1},{\"selectAnswer\":\"A\",\"grade\":10,\"ifCorrect\":1,\"questionCode\":\"aa13f82230ab4bef82c3377feaf2e904\",\"questionType\":1},{\"selectAnswer\":\"A\",\"grade\":10,\"ifCorrect\":1,\"questionCode\":\"cef67bd0d449407ca8323434f27365a2\",\"questionType\":1},{\"selectAnswer\":\"A-B-C-E\",\"grade\":10,\"ifCorrect\":1,\"questionCode\":\"6e47c7f782af4596a3b9274f20f6c0cf\",\"questionType\":2},{\"selectAnswer\":\"A\",\"grade\":10,\"ifCorrect\":1,\"questionCode\":\"04114cabccec481aa2b7326227fe974a\",\"questionType\":1},{\"selectAnswer\":\"B\",\"grade\":10,\"ifCorrect\":1,\"questionCode\":\"c21545c1d7f24c3aaa6e16ac829178c7\",\"questionType\":1},{\"selectAnswer\":\"C\",\"grade\":10,\"ifCorrect\":1,\"questionCode\":\"a2274a9fee57424a84edc32ee4edc353\",\"questionType\":1},{\"selectAnswer\":\"A\",\"grade\":10,\"ifCorrect\":2,\"questionCode\":\"c3a6d72dd05146bf9f267bee41637bcf\",\"questionType\":1}],\"summaryCode\":\"57782847872c4936a7d718472a36738g\"}";

const questionSubjectHeaderVal = $prefs.valueForKey('glory_header_3jxf');
const request = {
    url: url,
    headers: questionSubjectHeaderVal,
    method: "post",
    body: body
};

$task.fetch(request).then(response => {
        console.log(response.body)
        if(response.body.success){
       $notify("3JXF","专题赛success🎉", "目前排名"+response.body.data.bestRank)}
    }, reason => {
        console.log(reason.error);
    });

