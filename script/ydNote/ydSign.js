var bonus = {
    url: 'https://note.youdao.con/yws/api/daupromotion?method=sync',
    headers: {
        "Cookie": $prefs.valueForKey("CookieYD"),
    }
};

$task.fetch(bonus).then(response => {
    var body = JSON.parse(response.body);
    console.log(response.body);
    if (body.accept=="true"){
        $notify("有道云笔记","签到成功")
    }else{
        $notify("有道云笔记签到失败")
    }
}, reason => {
    $notify("有道云笔记签到. Interface error‼️‼️‼️", "", reason.error)
});
