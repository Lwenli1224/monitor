// 监控页面的性能 - 算时间差
// import perf from './performance'

// let formatObj = (data) => {
//   let arr = []
//   for (let key in data) {
//     arr.push(`${key}=${data[key]}`)
//   }
//   return arr.join('&')
// }

// perf.init((data) => {
//   new Image().src = '/p.gif?' + formatObj(data)
//   console.log(data)
// })

// 资源监控
// import resource from './resource'

// resource.init(data => {
//   console.log(data)
// })

// ajax监控
// import xhr from './xhr'
// xhr.init((data) => {
//   console.log(data)
// })

// 页面错误捕获
import errorCatch from './errorCatch'

errorCatch.init(data => {
  console.log(data)
})