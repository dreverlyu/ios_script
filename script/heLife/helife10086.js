var myRequest  = {
    url: 'http://he.sx.chinamobile.com/h/rest/v1/sign/process',
    method: 'post',
    headers: {
        "Cookie": $prefs.valueForKey("CookieHeLife"),
    }
};

$task.fetch(myRequest ).then(response => {
    var body = JSON.parse(response.body);
    console.log(response.body);
    if (body.retMsg=="OK" && body.retCode=="0000"){
        $notify("山西移动和生活" ,"签到成功")
    }else{
        $notify("山西移动和生活签到失败")
    }
}, reason => {
    $notify("山西移动和生活签到. Interface error‼️‼️‼️", "", reason.error)
});
