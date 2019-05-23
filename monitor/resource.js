let processData = _ => {
  let data = {
    name: _.name,
    initiatorType: _.initiatorType, // 资源类型
    duration: _.duration // 资源时间
  }
  return data
}

export default {
  init(cb) {
    // 获取资源相关的信息
    if (window.PerformanceObserver) {
      let observer = new PerformanceObserver(list => {
        let data = list.getEntries() // data Array
        cb(processData(data[0]))
      })
      observer.observe({ entryTypes: ['resource'] })
    } else {
      window.onload = function() {
        let resourceData = performance.getEntriesByType('resource')
        let data = resourceData.map(processData)
        cb(data)
      }
    }
  }
}