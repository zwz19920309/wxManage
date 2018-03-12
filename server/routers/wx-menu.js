/**
 * 登录操作
 */
const recordRouter = require('koa-router')();
const menusCtrl = require('../controllers/menus-ctrl');

recordRouter.post('/menuList', menusCtrl.menuList);
recordRouter.post('/saveMenus', menusCtrl.saveMenus);
module.exports = recordRouter;