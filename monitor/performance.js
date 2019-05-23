// 专门用来写页面性能监控的逻辑

let processData = (p) => {
  let data = {
    // 上一个页面到这个页面的时长
    prevPage: p.fetchStart - p.navigationStart,
    // 重定向时长
    redirect: p.redirectEnd - p.redirectStart,
    // dns解析时长
    dns: p.domainLookupEnd - p.domainLookupStart,
    // tcp连接时长
    connect: p.connectEnd - p.connectStart,
    // 从请求到响应的时长
    send: p.responseEnd - p.requestStart,
    // 首字节接收时长
    ttfb: p.responseStart - p.navigationStart,
    // DOM准备时长
    domready: p.domInteractive - p.domLoading,
    // 白屏
    whiteScreen: p.domLoading - p.navigationStart,
    // DOM加载时长
    dom: p.domComplete - p.domLoading,
    // onload的执行时间
    load: p.loadEventEnd - p.loadEventStart,
    // 总时长
    total: p.loadEventEnd - p.navigationStart
  }
  return data
}

let load = (cb) => {
  let timer;
  let check = () => {
    if (performance.timing.loadEventEnd) {
      clearTimeout(timer)
      cb()
    } else {
      clearTimeout(timer)
      timer = setTimeout(check, 100)
    }
  }
  window.addEventListener('load', check, false)
}

let domready = (cb) => {
  let timer;
  let check = () => {
    if (performance.timing.domInteractive) {
      clearTimeout(timer)
      cb()
    } else {
      clearTimeout(timer)
      timer = setTimeout(check, 100)
    }
  }
  window.addEventListener('DOMContentLoaded', check, false)
}

export default {
  init(cb) {
    // 有可能没有触发onload dom解析完成后统计一下，可能用户没加载完就关闭页面了
    domready(() => {
      let perfData = performance.timing
      let data = processData(perfData)
      data.type = 'domready'
      cb(data)
    })

    load(() => {
      let perfData = performance.timing
      let data = processData(perfData)
      data.type = 'loaded'
      cb(data)
    })
  }
}