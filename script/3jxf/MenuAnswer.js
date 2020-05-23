/**
 *@Author Drever
 *@Date 2020/5/23  下午 09:24
 *@Describe github.com/dreverlyu
 */
const appName ='三晋先锋'
const glory = init()
const answerHeaderKey = 'glory_header_answer'
const answerHeaderVal = glory.getdata(answerHeaderKey);
const url = 'http://221.204.170.88:8184/app/question';
const method = 'POST';
const body = JSON.stringify({"userId":"2536713","method":1,"totalGrade":"90","list":[{"selectAnswer":"B","grade":10,"ifCorrect":1,"questionCode":"7db9519451eb428182d128f8f61543b1","questionType":3},{"selectAnswer":"A","grade":10,"ifCorrect":1,"questionCode":"95d39c628dab4de7b04382a59f6ab781","questionType":3},{"selectAnswer":"A","grade":10,"ifCorrect":1,"questionCode":"926e6f75032243bfa8da0817d32406ad","questionType":3},{"selectAnswer":"A","grade":10,"ifCorrect":1,"questionCode":"71b33772befa44dfbd1d3d7183c8902d","questionType":3},{"selectAnswer":"B","grade":10,"ifCorrect":2,"questionCode":"2af8c067b8244e6bb282f0e74dc16a74","questionType":3},{"selectAnswer":"B","grade":10,"ifCorrect":1,"questionCode":"d46733a7305440d793d5cee18d4eb0a9","questionType":3},{"selectAnswer":"B","grade":10,"ifCorrect":1,"questionCode":"21c82def927a40018d3fafed2b0e9aa9","questionType":3},{"selectAnswer":"A-B-D","grade":10,"ifCorrect":1,"questionCode":"678a26a93bc146168ca10cfb5bb24408","questionType":2},{"selectAnswer":"B","grade":10,"ifCorrect":1,"questionCode":"98e48e27104342cc9f32ee84f2ac41f5","questionType":1},{"selectAnswer":"A-B-C","grade":10,"ifCorrect":1,"questionCode":"2e7c1134d23b4940abaf55547f043f13","questionType":2}],"summaryCode":"6202718d8991428ea510c972fa821732"})
const answerRequest = {
    url: url,
    method: method,
    headers: answerHeaderVal,
    body: body
};


$task.fetch(answerRequest).then(response => {
    console.log(response.body)
    var body = JSON.parse(response.body);
    $notify(appName,"手动答题", body.msg+' 🎉 '+"获得分数"+body.data.score)
}, reason => {
    console.log(reason.error);
});

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

