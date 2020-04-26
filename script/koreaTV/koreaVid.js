var body = $response.body;
var url = $request.url;
const path = '/api/user/info';
let obj = JSON.parse(body)
if (url.indexOf(path) != -1) {
    obj.vnjoy.at = 1;
    obj.vnjoy.as = 1;
    obj.vnjoy.grate.exp = 1598430380;
    obj.vnjoy.level = 1;
    obj.vnjoy.autoRenewal = 1;
    body = JSON.stringify(obj);
}

$done({body});
