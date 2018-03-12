
/*整合子路由*/
const Router = require('koa-router');
let wxMenu = require('./wx-menu');
let wxMaterial = require('./wx-material');
let sqlMaterial = require('../wx/routers/sql-material');
// 装载所有子路由
let router = new Router()

router.use('/menu',wxMenu.routes(), wxMenu.allowedMethods());
router.use('/material',wxMaterial.routes(), wxMaterial.allowedMethods());
router.use('/sqlMaterial',sqlMaterial.routes(), sqlMaterial.allowedMethods());

module.exports = router;