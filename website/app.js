const Koa = require('koa')
const path = require('path')
const Server = require('koa-static')

const app = new Koa()

app.use(Server(path.join(__dirname, './client')))
app.use(Server(path.join(__dirname, 'node_modules')))

app.use(async (ctx, body) => {
  if (ctx.path === '/api/list') {
    ctx.body = { name: 'brolly', age: 18 }
  } else {
    return next()
  }
})

app.listen(3000, function() {
  console.log('server start 3000')
})