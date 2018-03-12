const fs  = require('fs');
const request = require('request');
const path = require("path");
const sqlMaterialService = require('../service/material-service');
const wxMaterialService = require('../../weixin/service/material-service');
const util = require('../util/util');
module.exports = {
  /**
   *批量保存素材列表
   *@params {object} ctx 上下文对象
   */
  async saveMaterialList(ctx) {
    console.log('@wx: saveMaterialList');
    let counts= await wxMaterialService.perMaterialCount();
    console.log('counts: ');
    console.dir(counts);
    let params = {type: 'image', offset: 0, count: counts.image_count};
    let materialList = await wxMaterialService.perMaterialList(params);
    let rootPath = path.resolve(__dirname, '../../public/material');
    let localIp = 'http://' + util.getLocalIP() +':3000/';
    if (materialList && materialList.item && materialList.item.length >0 ) {
        for(let m in materialList.item){
            let imgPath = rootPath + '/' + materialList.item[m].media_id + '.png';
            materialList.item[m].localurl = localIp + 'public/material/' +  materialList.item[m].media_id + '.png';
            await sqlMaterialService.saveMaterial(materialList.item[m]);
            request(materialList.item[m].url).pipe(fs.createWriteStream(imgPath));     //通过流的方式，把图片写到本地/image目录下，并用新闻的标题和图片的标题作为图片的名称。
        } 
    }
    ctx.response.body = {body:{},result:'SUCCESS'};
  },
   /**
   *获取素材列表
   *@params {object} ctx 上下文对象
   */
  async getMaterialList(ctx) {
    let params =  ctx.query || {};
    let materialList = await sqlMaterialService.materialList(params);
    ctx.response.body = util.RResult(materialList);
  },
   /**
   *根据id删除素材
   *@params {object} ctx 上下文对象
   */
  async deleteMaterial(ctx) {
    let params =  ctx.query || {}; 
    let result = await sqlMaterialService.deleteMaterial(params.id);
    ctx.response.body = util.RResult(result);
  },
    /**
   *分页查询素材
   *@params {object} ctx 上下文对象
   */
  async findMaterialByPage(ctx) {
    let params = ctx.request.body || {};
    let type = params.type || 'image';
    params.keys = ['*'];
    let result = await sqlMaterialService.findMaterialByPage(params, type);
    let cRes = await sqlMaterialService.materialCount(type);
    let count = cRes && cRes[0] ? cRes[0].total_count: 0;
    ctx.response.body = util.RResult({list: result, total: count});
  }
}
