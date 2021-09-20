const Koa = require('koa')
const app = new Koa()
const fs = require('fs')

function render(path){
  let filename = "./views" + path + ".html"
  return new Promise((resolve,reject) => {
    fs.readFile(filename,'utf-8',function(err,data){
      if(err){
        reject(err)
      }else{
        resolve(data)
      }
    })
  })
}

app.use(async (ctx) => {
  let url = ctx.url
  let data
  switch (url) {
      case '/':
      case '/index':
        data = await render('/index')
      break;
      case '/todo':
        data = await render('/todo')
      break;
    default:
        data = await render('/404')
      break;
  }
  ctx.body = data
})

app.listen(3000)
console.log('服务器启动了')