const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const path = require('path')
const static = require('koa-static')

// 加载模板引擎
app.use(
  views(path.join(__dirname,"./views"),{
    extension:"ejs"
  })
)

app.use(static(
  path.join(__dirname,'./public')
))

app.use(async (ctx) => {
  let title = "hello koa"
  let message = "first use ejs"
  await ctx.render("index",{
    title,
    message
  })
})
app.listen(3000)
console.log('服务器启动了')