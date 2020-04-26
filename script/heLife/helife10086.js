const userSignCheckinURL = 'http://he.sx.chinamobile.com/h/rest/v1/sign/process';
const userSignCookieKey = 'heLifeSign_10086_userCookieKey';
const userSignAgentKey = 'heLifeSign_10086_userAgentKey';
const userSignDataKey = 'heLifeSign_10086_userDataKey';


let isGetCookie = typeof ($request) !== 'undefined';
if (isGetCookie) {
    // 获取 Cookie
    if ($request.headers['Cookie']) {
        var cookie = $request.headers['Cookie'];
        var userAgent = $request.headers['User-Agent'];
        $prefs.setValueForKey(cookie, userSignCookieKey);
        $prefs.setValueForKey(userAgent, userSignAgentKey);
        $notify("成功获取山西和生活cookie 🎉", "", "请在Rewrite_Local禁用该脚本")
    }
    $done({});
} else {
    // 山西移动和生活签到
    var request = {
        url: userSignCheckinURL,
        method: 'POST',
        headers: {
            'Cookie': $prefs.valueForKey(userSignCookieKey),
            'Accept-Encoding': 'gzip, deflate',
            'xm-sign': '5eaf02499406c8e9f548ee374fcac69b(71)1582216331415(27)1582216331415',
            'Connection': 'keep-alive',
            'Host': 'he.sx.chinamobile.com',
            'Accept': '*/*',
            'Referer': 'http://he.sx.chinamobile.com/h/index.html',
            'User-Agent': $prefs.valueForKey(userSignAgentKey),
            'Content-type' : 'application/json;charset=utf-8',
            'Content-Length': '19',
            'Accept-Language': 'zh-cn'
        },
        body: JSON.stringify({})
    };

    $task.fetch(request).then(response => {
        const obj = JSON.parse(response.body);

        if (obj.retCode == userSignDataKey) {
            $notify("山西移动和生活", "", "重复签到");
        } else {
            $notify("山西移动和生活", "", "签到成功");
        }
        var temp = obj.retCode;
        console.log(obj);
        $prefs.setValueForKey(temp, userSignDataKey);
        var tt = $prefs.valueForKey(userSignDataKey);
        console.log(tt);
    }, reason => {
        $notify("山西移动和生活", "", reason.error)
    });
}
