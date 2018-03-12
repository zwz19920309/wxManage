/**
 * 素材操作
 */
const recordRouter = require('koa-router')();
const materialCtrl = require('../controllers/material-ctrl');

recordRouter.post('/perMaterialList',materialCtrl.perMaterialList);
recordRouter.post('/deleteMaterial',materialCtrl.deleteMaterial);
recordRouter.post('/saveMaterial',materialCtrl.saveMaterial);
recordRouter.post('/saveNewsMaterial',materialCtrl.saveNewsMaterial);
recordRouter.post('/wxAllPerMaterialList', materialCtrl.wxAllPerMaterialList);

module.exports = recordRouter;