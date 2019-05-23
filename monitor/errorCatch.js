export default {
  init(cb) {
    // img window.addEventListener('error', fn, true)
    // promise错误 window.addEventListener('unhandledrejection', fn, false)
    window.onerror = function(message, source, lineno, colno, error) {
      console.dir(error)
      let info = {
        message: error.message,
        type: error.name
      }
      let stack = error.stack
      let matchUrl = stack.match(/http:\/\/[^\n]*/)[0]
      info.filename = matchUrl.match(/http:\/\/(?:\S*)\.js/)[0]
      // console.log(matchUrl.match(/:(\d+):(\d+)/))
      // 行号
      info.lineno = lineno
      // 列号
      info.colume = colno // 上线时代码压缩 source-map 找到对应的真实的报错
      cb(info)
    }
  }
}