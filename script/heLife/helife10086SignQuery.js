/**
 *@Author summer
 *@Date 2020/7/6  上午 10:36
 *@Describe github.com/dreverlyu
 * 实现登录+签到+已签到天数查询
 * 仅自用
 */
loginApp();
const glory = init();
var cookieVal = $prefs.valueForKey('glory_cookie_HE10086');
function loginApp(){
    const url = `http://he.sx.chinamobile.com/h/rest/v1/l/a`;
const method = `POST`;
const headers = {
'Accept' : `application/json, text/plain, */*`,
'Origin' : `http://he.sx.chinamobile.com`,
'Connection' : `keep-alive`,
'Cookie' : `client_cookie=001; mobile=49490-45168-6188-9053; SI_FPC=id=15960a0e19e54bdf9ec1590424934109; jsession_id_4_boss=l569E8078C181B1EE437FA6EF45AC3286-1; route=be21cc1534edb31591867a9969f50df4; WT_FPC=id=2c099b1a252ce6e493b1590424905071:lv=1593944466889:ss=1593944465481; SI_SS=1590424934109`,
'Content-Type' : `application/json;charset=utf-8`,
'Host' : `he.sx.chinamobile.com`,
'User-Agent' : `Mozilla/5.0 (iPhone; CPU iPhone OS 13_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 oncon(iphone;13.3.1;com.MobileCommunicationSX.iHeYueSX;1.0.4) he`,
'Referer' : `http://he.sx.chinamobile.com/h/index.html`,
'Accept-Language' : `zh-cn`,
'Accept-Encoding' : `gzip, deflate`
};
const body = `{"phoneNo":"18215112070"}`;

const myRequest = {
    url: url,
    method: method,
    headers: headers,
    body: body
};

$task.fetch(myRequest).then(response => {
    const respCookie = response.headers['Set-Cookie']
        console.log('login respCookie:'+respCookie)
        
        if (respCookie && respCookie.indexOf('jsession_id_4_boss=') >= 0) {
            const signHeaderObj = JSON.parse(signHeaderVal)
            let signCookie = signHeaderObj['Cookie']
            console.log('登录cookie==>'+signCookie)
            signCookie = signCookie.replace(/jsession_id_4_boss=[^;]*/,respCookie.match(/jsession_id_4_boss=[^;]*/))
            signHeaderObj['Cookie'] = signCookie
            signHeaderVal = JSON.stringify(signHeaderObj)}
            console.log("--------"+signCookie)
            sleep(200)
            sign_heLife();
            query_heLife();
}, reason => {
    console.log(reason.error);
});

}

function sign_heLife() {
    var url = {
        url: "http://he.sx.chinamobile.com/h/rest/v1/sign/process",
        method: 'POST',
        headers: {
            "Content-Type": `application/json;charset=utf-8`,
            "User-Agent": `Mozilla/5.0 (iPhone; CPU iPhone OS 13_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 oncon(iphone;13.3.1;com.MobileCommunicationSX.iHeYueSX;1.0.4) he`,
            "Host": `he.sx.chinamobile.com`,
            "Origin": `http://he.sx.chinamobile.com`,
            "Referer": `http://he.sx.chinamobile.com/h/index.html`,
            "Accept-Language": `zh-cn`,
            "Accept-Encoding": `gzip, deflate`,
            Cookie: cookieVal
        },
        body: JSON.stringify({'channel': 'heapp'})
    };
    //console.log(url)
    $task.fetch(url).then(response => {
        var body = JSON.parse(response.body);
        console.log(response.body);
        if (body.retMsg == "OK" && body.retCode == "0000") {
            $notify("山西移动和生活", "签到成功 🎉");
        } else if (body.retMsg == "重复提交签到") {
            $notify("已进行签到 ‼️","retCode="+body.retCode, " 🎉");
        } else {
            $notify("山西移动和生活", "签到失败",`${body.retMsg}`);
        }
    }, reason => {
        $notify("山西移动和生活", "签到失败", `${reason.error}`);
    })
}

function query_heLife() {
    var url = {
        url: "http://he.sx.chinamobile.com/h/rest/v1/sign/query",
        method: 'POST',
        headers: {
            "Content-Type": `application/json;charset=utf-8`,
            "User-Agent": `Mozilla/5.0 (iPhone; CPU iPhone OS 13_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 oncon(iphone;13.3.1;com.MobileCommunicationSX.iHeYueSX;1.0.4) he`,
            "Host": `he.sx.chinamobile.com`,
            "Origin": `http://he.sx.chinamobile.com`,
            "Referer": `http://he.sx.chinamobile.com/h/index.html`,
            "Accept-Language": `zh-cn`,
            "Accept-Encoding": `gzip, deflate`,
            Cookie: cookieVal
        },
        body: JSON.stringify({'channel': 'heapp'})
    };
    //console.log(url)
    $task.fetch(url).then(response => {
        var body = JSON.parse(response.body);
        console.log(response.body);
        if (body.retMsg == "OK" && body.retCode == "0000") {
            $notify("山西移动和生活🎉", "目前签到天数=" + body.data.signCount,"今日签到情况=" + body.data.todayFlag);
        } 
        else {
            $notify("山西移动和生活", "查询签到天数失败",`${body.retMsg}`);
        }
    }, reason => {
        $notify("山西移动和生活", "查询签到天数失败", `${reason.error}`);
    })
}

function init() {
    isSurge = () => {
        return undefined === this.$httpClient ? false : true
    }
    isQuanX = () => {
        return undefined === this.$task ? false : true
    }
    getdata = (key) => {
        if (isSurge()) return $persistentStore.read(key)
        if (isQuanX()) return $prefs.valueForKey(key)
    }
    setdata = (key, val) => {
        if (isSurge()) return $persistentStore.write(key, val)
        if (isQuanX()) return $prefs.setValueForKey(key, val)
    }
    msg = (title, subtitle, body) => {
        if (isSurge()) $notification.post(title, subtitle, body)
        if (isQuanX()) $notify(title, subtitle, body)
    }
    log = (message) => console.log(message)
    get = (url, cb) => {
        if (isSurge()) {
            $httpClient.get(url, cb)
        }
        if (isQuanX()) {
            url.method = 'GET'
            $task.fetch(url).then((resp) => cb(null, resp, resp.body))
        }
    }
    post = (url, cb) => {
        if (isSurge()) {
            $httpClient.post(url, cb)
        }
        if (isQuanX()) {
            url.method = 'POST'
            $task.fetch(url).then((resp) => cb(null, resp, resp.body))
        }
    }
    done = (value = {}) => {
        $done(value)
    }
    return { isSurge, isQuanX, msg, log, getdata, setdata, get, post, done }
}
