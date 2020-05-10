const cookieName ='菜鸟裹裹'
const signHeaderKey = 'glory_signHeader_CNGUOGUO'
const glory = init()
const signHeaderVal = glory.getdata(signHeaderKey)
sign()
function sign() {
    let url = {url: `https://acs.m.taobao.com/gw/mtop.com.cainiao.cnactivitycenter.dailysignin.signin/1.0?rnd=ECEA7B9B769C9150F11257A3EF65B48F&wua=QHQ1_WjG1lKEC2%2FoIaQaV3ihewppwO%2BsPu4P2bMDbS6OLsPHYA9DfenXJEzG%2FFfhwYvggKGMauzs4Zj%2F3xlNcFG%2B6EKQYC4CuAjXK10tMC7q3hAYOIOa96grzn5iTegOT%2FKxlu8AGv1nhW5a3ARSXL%2FPwNhal3eYrPI9msjHoxXtkXyuJ0cbBEDFmnsq1Qc1bbRbammb1Zep9CEAZmHkVjY8s%2FqGzITES1hc0yp%2BTfKYZylg2t%2B8F%2BLr3LjVjyWPeY%2FMJ%2BDgxb4fh3AuCNfH%2F389KRVk5OnshWxGHtkJXJ76%2BAAS4QCN9KtYtMCVREwy29RRYiw0qbMOekBBX%2BiCgJmyT5UdGaqF8XlDFqkc9DY%2BkNbCNqYQnfrqEGPtv5guVuDKCxq713x5QhxQ7Ci4ueQztDWszNfIkV7LlIVZJ7dYO5gI%3D%26pBfj_i0020e23100c5c8cecd4ad736fc38fc7bb4f2eefa2550&data=%7B%7D`,headers: JSON.parse(signHeaderVal)}
    glory.get(url, (error, response, data) => {
      glory.log(`${cookieName}, data: ${data}`)
      let res = JSON.parse(data)
      const title = `${cookieName}`
      let subTitle = ``
      let detail = ``
      if (res.v =='1.0') {
        subTitle = `签到结果:成功`
        detail = `时间：${res.data.serverTime}`
      }
      else{
        subTitle = `未知错误,截图日志`
      }
      glory.msg(title, subTitle, detail)
    })
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