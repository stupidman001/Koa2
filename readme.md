## Koa2 web框架

#### koa2的安装

1. 创建一个包	npm init -y
2. 安装 koa2 包	npm i koa
3. 创建`index.js` 文件
   ```javascript
   const Koa = require('koa')
   const app = new Koa()

   app.use( async ( ctx ) => {
     ctx.body = 'hello koa2'
   })

   app.listen(3000)
   console.log('[demo] start-quick is starting at port 3000')
   ```

```javascript
const Koa = require('koa')
```

默认去找 koa 包的 index.js 文件，如果没有 index.js 文件，就要在 package.json 中找入口文件了。

```javascript
"main": "lib/application.js",
```

这个文件导出了一个类,所以在使用的时候是 new

```javascript
module.exports = class Application extends Emitter { ... }
```

app.use() 是用来加载中间件(第三方的包)。

```javascript
app.listen(3000)
```

监听端口 3000

```javascript
app.use( async ( ctx ) => {
  ctx.body = 'hello koa2'
})
```

app.use() 中可以写异步函数，也可以写同步函数，取决于业务。

ctx.body = 'hello koa2'	属于同步函数，在浏览器中直接能看到结果。

```javascript
function getData(){
  var data
  setTimeout(() => {
    data = Math.random();
  },3000);
  return data;
}
app.use( async ( ctx ) => {
  ctx.body = getData()
})
```

现在什么都打印不出来，只执行同步任务没有执行异步任务，data 是空的值，直接返回了。

```javascript
  var data 
  setTimeout(() => {
    data = Math.random();
  },3000);
  return data;
```

解决方法：使用 async 和 await

```javascript
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
```

#### 自定义中间件

1. 创建文件 log.js

```javascript
function log(ctx) {
  console.log(ctx.method, ctx.header.host + ctx.url)
}
module.exports = function () {
  return async function (ctx, next) {
    log(ctx)
    await next()
  }
}
```

2. 在index.js 中使用 log 中间件

```javascript
const logger = require('./log')
app.use(logger())
```

#### 路由

需求：根据不同的路由访问不同的页面。

创建 views 文件夹存放页面：index.html、todo.html、404.html

```javascript
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
```

#### koa-router

- 安装

```javascript
npm i @koa/router
```

- 引用

```javascript
const Koa = require('koa')
const Router = require('@koa/router')

const app = new Koa()
const router = new Router()

router.get('/', (ctx, next) => {
  ctx.body = "hello"
})

app
  .use(router.routes())
  .use(router.allowedMethods())
app.listen(3000)
console.log('服务器启动了')
```

koa-router 处理客户端传来的参数。

- ctx.querystring

```javascript
router.get('/', (ctx, next) => {
  console.log(ctx.querystring)
})
```

浏览器地址输入：http://localhost:3000/?name=lisi&age=18

控制台返回："name=lisi&age=18"

- ctx.query

```javascript
router.get('/', (ctx, next) => {
  console.log(ctx.query)
})
```

浏览器地址输入：http://localhost:3000/?name=lisi&age=18

控制台返回：{ name: 'lisi', age: '18' }

- ctx.params

```javascript
router.get('/:name/:age', (ctx, next) => {
  console.log(ctx.params)
})
```

浏览器地址输入：http://localhost:3000/lisi/18

控制台返回：{ name: 'lisi', age: '18' }

处理 post 请求传过来的值

- 安装koa2版本的koa-bodyparser@3中间件

```javascript
npm install --save koa-bodyparser@3
```

- 引用 koa-bodyparser@3

```javascript
const bodyParser = require('koa-bodyparser')
// 使用ctx.body解析中间件
app.use(bodyParser())
```

- 接收 post 请求传来的数据

先展示一个提交表单的页面

```javascript
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
```

接收 post 请求传来的数据

```javascript
router.post('/regist',(ctx) => {
  console.log(ctx.request.body)
})
```

![](image/readme/1632112984102.png)

控制台打印信息：{ userName: '111', nickName: '222', email: '333' }
