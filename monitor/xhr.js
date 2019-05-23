export default {
  init(cb) {
    const xhr = window.XMLHttpRequest
    const oldOpen = xhr.prototype.open
    xhr.prototype.open = function(method, url, async, username, password) {
      this.info = {
        method,
        url,
        async,
        username,
        password
      }
      return oldOpen.apply(this, arguments)
    }
    const oldSend = xhr.prototype.send
    xhr.prototype.send = function(value) {
      let start = Date.now()
      const fn = type => () => {
        this.info.time = Date.now() - start
        this.info.requestSize = value ? value.length : 0
        this.info.responseSize = this.responseText.length
        this.info.type = type
        cb(this.info)
      }
      this.addEventListener('load', fn('load'), false)
      this.addEventListener('error', fn('error'), false)
      this.addEventListener('abort', fn('abort'), false)
      oldSend.apply(this, arguments)
    }
  }
}