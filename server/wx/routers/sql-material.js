const sqlWxRouter = require('koa-router')();
const materialCtrl = require('../controllers/material-ctrl');

sqlWxRouter.post('/saveMaterialList',materialCtrl.saveMaterialList);
sqlWxRouter.post('/getMaterialList',materialCtrl.getMaterialList);
sqlWxRouter.post('/findMaterialByPage', materialCtrl.findMaterialByPage);
module.exports = sqlWxRouter;