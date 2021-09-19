const Koa = require('koa')
const app = new Koa()
const logger = require('./log')
app.use(logger())

app.listen(3000)
console.log('服务器启动了')
