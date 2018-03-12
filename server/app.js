const Koa = require('koa');
const Router = require('koa-router')
const app = new Koa();

const router = require('./routers/index');

const path = require('path')
const static = require('koa-static')
const koaBody = require('koa-body');

// 静态资源目录对于相对入口文件index.js的路径
const staticPath = '';
//const staticPath = './views/dist';
app.use(static(
  path.join(__dirname, staticPath)
))

app.use(koaBody({
  'formLimit': '5mb',
  'jsonLimit': '5mb',
  'textLimit': '5mb'
}));

// 初始化路由中间件
app.use(router.routes()).use(router.allowedMethods())

app.listen(3000);
console.log('app started at port 3000...');