var  obj = JSON.parse($request.headers);
var HE10086 = obj.Cookie;
if (HE10086) {
  if ($prefs.valueForKey("CookieHeLife") != undefined) {
    if ($prefs.valueForKey("CookieHeLife") != HE10086) {
      var cookie = $prefs.setValueForKey(HE10086, "CookieHeLife");
      if (!cookie) {
        $notify("更新山西移动和生活 Cookie失败‼️", "", "")
      } else {
        $notify("更新山西移动和生活 Cookie成功 🎉", "", "")
      }
    } else {
      console.log("山西移动和生活 cookie", "无变化,无需获取")
    }
  } else {
    var cookie = $prefs.setValueForKey(WAPJ, "CookieYD");
    if (!cookie) {
      $notify("首次写入山西移动和生活 Cookie失败‼️", "", "")
    } else {
      $notify("首次写入山西移动和生活 Cookie成功 🎉", "", "")
    }
  }
}
$done({});