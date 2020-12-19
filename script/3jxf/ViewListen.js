
const viewListenHeaderVal =  {
    'Accept': `*/*`,
    'Accept-Encoding': `gzip, deflate`,
    'Accept-Language': `zh-Hans-CN;q=1, zh-Hant-HK;q=0.9, en-CN;q=0.8`,
    'Authorization': `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHBpcmVUaW1lIjoxNjA3MzQ2MDQzMTk2LCJ1c2VyQ29kZSI6MjUzNjcxMywiYWNjb3VudCI6IjE4MjM1MTUyMDcwIiwiYWNjb3VudFR5cGUiOjF9.V5eWpyXD_putSEihYfiYlfPantpypDpYyQHAiVH0aeM`,
    'Connection': `close`,
    'Content-Type': `application/json`,
    'Host': `221.204.170.88:8184`,
    'User-Agent': `SJXF/3.3.4 (iPhone; iOS 13.3.1; Scale/3.00)`,
    'sUserId': `2536713`,
    'signature': `2FC2E93BEC34ABDD545D297939F7274B`,
    'version': `3.3.4`
    };

const method = 'POST';
const body = JSON.stringify({
    "time": "600",
    "ifScore": "1",
    "appStartTime": "1607173804",
    "type": "2",
    "userId": "2536713",
    "articleId": "14"
  });

const url = 'http://221.204.170.88:8184/app/businessCore';
const myRequest = {
    url: url,
    method: method,
    headers: viewListenHeaderVal,
    body: body
};


$task.fetch(myRequest).then(response => {
    console.log(response.body)
    var body = JSON.parse(response.body);
    $notify("3JXF","视听学习", body.data+' 🎉 ')
    }, reason => {
        console.log(reason.error);
    });
