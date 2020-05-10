/**
 *@Author summer
 *@Date 2020/5/6  上午 10:36
 *@Describe github.com/dreverlyu
 *
 * test
 */

//http://wap.sx.10086.cn/h/v1/sign/process  result.retCode == '0000'
function sign_ChinaMobile() {
    var url = {
        url: "http://he.sx.chinamobile.com/h/rest/v1/businessTree/adInfoQry",
        method: 'POST',
        headers: {
            "Content-Type": `application/json;charset=utf-8`,
            "User-Agent": `Mozilla/5.0 (iPhone; CPU iPhone OS 13_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 oncon(iphone;13.3.1;com.MobileCommunicationSX.iHeYueSX;1.0.4) he`,
            "Host": `he.sx.chinamobile.com`,
            "Origin": `http://he.sx.chinamobile.com`,
            "Referer": `http://he.sx.chinamobile.com/h/index.html`,
            "Accept-Language": `zh-cn`,
            "Accept-Encoding": `gzip, deflate`,
            Cookie:`client_cookie=001; route=44082b71ad3ad4aafb9c09d54dc4f54e; SI_FPC=id=11880d42f90d33da6521588119251848; WT_FPC=id=29b5ab08396c7007a781588119264416:lv=1589079060776:ss=1589078278189; mobile=20818-16496-6266-9045; SI_SS=1588119251848 `,

},
        body: JSON.stringify({'appId': '116'})
    };

    $task.fetch(url).then(response => {
        var body = JSON.parse(response.body);
        console.log(response.body);
        }, reason => {
        $notify("山西移动", "测试失败", `${reason.error}`);
    })
}
sign_ChinaMobile();
