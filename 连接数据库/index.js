const Koa = require('koa')
const app = new Koa()
const Router = require('@koa/router')
const router = new Router()

var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'sql'
});

connection.connect();
connection.query('select * from t_user', function (error, results) {
  if (error) throw error;
  console.log(results);
});
 
connection.end();

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3000)
console.log('服务器启动了')