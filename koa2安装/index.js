const Koa = require('koa')
const app = new Koa()

function getData(){
  return new Promise((resolve,reject) => {
    setTimeout(() => {
      var data = Math.random();
      resolve(data)
    },3000);
  })
}

app.use( async ( ctx ) => {
  ctx.body = await getData()
})

app.listen(3000)
console.log('服务器启动了')
