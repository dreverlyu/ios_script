const chavy = init();
chavy;
const  HE10086 = $request.headers.Cookie;
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
      $task.fetch(url).then((resp) => cb(null, {}, resp.body))
    }
  }
  post = (url, cb) => {
    if (isSurge()) {
      $httpClient.post(url, cb)
    }
    if (isQuanX()) {
      url.method = 'POST'
      $task.fetch(url).then((resp) => cb(null, {}, resp.body))
    }
  }
  done = (value = {}) => {
    $done(value)
  }
  return { isSurge, isQuanX, msg, log, getdata, setdata, get, post, done }
}
$done({});
