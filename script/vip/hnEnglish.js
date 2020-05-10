/**
 *@Author drever
 *@Date 2020/5/10  下午 01:47
 *@Describe github.com/dreverlyu
 *
 *[rewrite_local]👇
 * ^https:\/\/engapi\.ihuman\.com\/(v1\/get_user_info|v1\/get_products) url script-response-body dreverlyu/script/vip/hnEnglish.js
 *
 * MITM = engapi.ihuman.com
 */

const path1 = "/v1/get_products";
const path2 = "/v1/get_user_info";

let key = {"expire_time":7955110875,"vip_type":1,"legacy_product_id":"com.ihuman.english.cons.vip1y"};

let obj = JSON.parse($response.body);

if ($request.url.indexOf(path1) != -1){
    obj.result["vip_status"] = key;
}
if ($request.url.indexOf(path2) != -1){
    obj.result.userinfo["vip"] = key;

}


$done({body: JSON.stringify(obj)});