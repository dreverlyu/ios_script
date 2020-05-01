/**
 *@Author summer
 *@Date 2020/3/28  上午 10:36
 *@Describe github.com/dreverlyu
 *
 * 中国移动官方app签到(移动山西省归属地专用)
 */

//http://wap.sx.10086.cn/h/v1/sign/process  result.retCode == '0000'
function sign_ChinaMobile() {
  let cookieVal = $prefs.valueForKey('glory_cookie_ChinaMobile');
  if (!cookieVal) {
    $notify("中国移动官方App", "无法签到", "请先获取cookie");
  }
  var url = {
    url: "http://wap.sx.10086.cn/h/v1/sign/process",
    method: 'POST',
    headers: {
      "Content-Type": `application/json;charset=utf-8`,
      "User-Agent": `Mozilla/5.0 (iPhone; CPU iPhone OS 13_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 oncon(iphone;13.3.1;com.MobileCommunicationSX.iHeYueSX;1.0.4) he`,
      "Host": `he.sx.chinamobile.com`,
      "Origin": `http://wap.sx.10086.cn`,
      "Referer": `http://wap.sx.10086.cn/h/index.html`,
      "Accept-Language": `zh-cn`,
      "Accept-Encoding": `gzip, deflate`,
      Cookie: cookieVal
    },
    body: JSON.stringify({'channel': 'wt'})
  };
  console.log(url)
  $task.fetch(url).then(response => {
    var body = JSON.parse(response.body);
    console.log(response.body);
    if (body.retMsg == "OK" && body.retCode == "0000") {
      $notify("中国移动官方App", "签到成功 🎉");
    } else if (body.retMsg == "重复提交签到") {
      $notify("已进行签到 ‼️", `${body.retMsg}`);
    } else {
      $notify("中国移动官方App", "签到失败");
    }
  }, reason => {
    $notify("中国移动官方App", "签到失败", `${reason.error}`);
  })
}
sign_ChinaMobile();
