    /**
 *@Author summer
 *@Date 2020/5/1  上午 10:36
 *@Describe github.com/dreverlyu
 *
 * 山西移动和生活签到，访问我的，每日签到获取签到cookie
 */
loginApp();
sign_heLife();
const glory = init()
var cookieVal = $prefs.valueForKey('glory_cookie_HE10086');
function loginApp(){
    var loginUrl = {
        url: "http://he.sx.chinamobile.com/h/rest/v1/a",
        method: 'POST',
        headers: {
            "Host": `he.sx.chinamobile.com`,
            "Accept": `application/json, text/plain, */*`,
            "Accept-Language": `zh-cn`,
            "Accept-Encoding": `gzip, deflate`,
            "Content-Type": `application/json;charset=utf-8`,
            "Origin": `http://he.sx.chinamobile.com`,
            "Content-Length": `25`,
            "Connection": `keep-alive`,
            "User-Agent": `Mozilla/5.0 (iPhone; CPU iPhone OS 13_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 oncon(iphone;13.3.1;com.MobileCommunicationSX.iHeYueSX;1.0.4) he`,
            "Referer": `http://he.sx.chinamobile.com/h/index.html`,
            Cookie: `client_cookie=001; mobile=8530-20592-6153-9051; jsession_id_4_boss=l77947B08CAC03599DE401CBA53B25CB3-1; SI_FPC=id=15960a0e19e54bdf9ec1590424934109; route=f4e159a140b50e569cfc89659f00bb19; WT_FPC=id=2c099b1a252ce6e493b1590424905071:lv=1593940037224:ss=1593939568922; SI_SS=1590424934109`
        },
        body: JSON.stringify({'phoneNo': '18215112070'})
    };

    glory.post(url, (error, response, data) => {
        const respCookie = response.headers['Set-Cookie']
        console.log('login respCookie:'+respCookie)
        glory.log(`${cookieName}, loginApp - respcookie: ${respCookie}`)
        if (respCookie && respCookie.indexOf('jsession_id_4_boss=') >= 0) {
            let signCookie = cookieVal['Cookie']
            console.log('登录cookie==>'+signCookie)
            signCookie = signCookie.replace(/jsession_id_4_boss=[^;]*/,respCookie.match(/jsession_id_4_boss=[^;]*/))
            signHeaderObj['Cookie'] = signCookie
            cookieVal = JSON.stringify(signHeaderObj)
        }
        cb()
    })
}

function sign_heLife() {
    //let cookieVal = $prefs.valueForKey('glory_cookie_HE10086');
    if (!cookieVal) {
        $notify("山西移动和生活", "无法签到", "请先获取cookie");
    }
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