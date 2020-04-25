var headerCookie = $request.headers["Cookie"];

if (headerCookie) {
    if ($prefs.valueForKey("CookieYD") != undefined) {
        if ($prefs.valueForKey("CookieYD") != headerCookie) {
            if (headerCookie.indexOf("SI_FPC") != -1) {
                var cookie = $prefs.setValueForKey(headerCookie, "CookieYD");
                if (!cookie) {
                    $notify("更新中移动Cookie失败‼️", "", "");
                } else {
                    $notify("更新中移动Cookie成功 🎉", "", "");
                }
            }
        }
    } else {
        if (headerCookie.indexOf("ph18235152070") != -1) {
            var cookie = $prefs.setValueForKey(headerCookie, "CookieYD");
            if (!cookie) {
                $notify("首次写入中移动Cookie失败‼️", "", "");
            } else {
                $notify("首次写入中移动Cookie成功 🎉", "", "");
            }
        }
    }
}
$done({})