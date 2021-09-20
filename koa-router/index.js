const Koa = require('koa')
const Router = require('@koa/router')
const bodyParser = require('koa-bodyparser')

const app = new Koa()
const router = new Router()

app.use(bodyParser())

router.get('/', (ctx) => {
  let html = `
  <h1>koa2 request post demo</h1>
  <form method="POST" action="/regist">
    <p>userName</p>
    <input name="userName" /><br/>
    <p>nickName</p>
    <input name="nickName" /><br/>
    <p>email</p>
    <input name="email" /><br/>
    <button type="submit">submit</button>
  </form>
`
  ctx.body = html
})

router.post('/regist',(ctx) => {
  console.log(ctx.request.body)
})

app
  .use(router.routes())
  .use(router.allowedMethods())
app.listen(3000)
console.log('服务器启动了')