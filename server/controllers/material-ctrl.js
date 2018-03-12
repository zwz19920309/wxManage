const materialService =  require('../weixin/service/material-service');
const sqlMaterialService =  require('../wx/service/material-service');
// const sqlMaterialNewsService =  require('../wx/service/materialNews-service');
const photoService =  require('../weixin/service/photo-service');
const util  = require('../util/util');
const fs  = require('fs');
const path  = require('path');
const request = require('request');
let uploadFile = require('../weixin/util/upload-file');
//同步微信与数据库
module.exports = {
    async perMaterialList(ctx){ // 获取素材列表
      let params = {type: 'image', offset: 0, count: 10};
      let materialList = await materialService.perMaterialList(params);
      let imgurl = materialList.item[3].url;
      let data = await sqlMaterialService.saveMaterial(materialList.item[3]);
      request(imgurl).pipe(fs.createWriteStream('./1.png'));     //通过流的方式，把图片写到本地/image目录下，并用新闻的标题和图片的标题作为图片的名称。
      ctx.response.body = util.RResult(materialList,'获取素材列表成功','0');
    },
    async deleteMaterial(ctx){ // 删除素材
      let parmas = ctx.request.body;
      let result = {};
      let wxRes = await materialService.deleteMaterial(parmas.mediaId);
      if(wxRes && wxRes.errcode === 0) {
        result = await sqlMaterialService.deleteMaterial(parmas.id);
      } 
      ctx.response.body = util.RResult(result,1,'删除素材成功');
    },
    async saveMaterial(ctx){ // 保存素材 
      console.log('@saveMaterial: ----');
      let parmas = ctx.request.body;
      let result = {};
      // try {
      let base64 = ctx.request.body.file;
      let rootPath = path.resolve(__dirname, '../public/imgs/material/temp');
      let fileName = Date.parse(new Date()) + '.png';
      let res = await uploadFile.uploadBase64File(base64, rootPath, fileName);
      if (res.code === 1) {
        let wxRes = await materialService.uploadMaterial('image', res.filePath);
        console.log('wxRes: ');
        console.dir(wxRes);
        if (wxRes.media_id) {
          //let fetchResult = await materialService.fetchMaterial(wxRes.media_id); 
          let rootPath = path.resolve(__dirname, '../public/material');
          let localIp = 'http://' + util.getLocalIP() +':3000/';
          let imgPath = rootPath + '/' + wxRes.media_id + '.png';
          wxRes.localurl = localIp + 'public/material/' +  wxRes.media_id + '.png';
          let sqlRes = await sqlMaterialService.saveMaterial(wxRes);
          if (sqlRes) {
            result = sqlRes
          }
          request(wxRes.url).pipe(fs.createWriteStream(imgPath));     //通过流的方式，把图片写到本地/image目录下
        }
      }
    //  } catch (e) {
    //   result = {'fail': '系统异常'}
    //  }
      ctx.response.body = util.RResult(result,'1','保存成功');
    },
    async wxAllPerMaterialList (ctx) {
      let params = ctx.request.body;
      let type = params.type || 'image';
      let result  = await materialService.wxAllPerMaterialList(type);
      ctx.response.body = util.RResult(result,'获取数据成功','0');
    },
    async saveNewsMaterial(ctx) { // 保存图文素材
      let news = {
        "articles": [{
        "title": '测试',
        "thumb_media_id": 'z5gxzAz1trnjk9M-B2F14ScR2s_dZn3gcF1Wx_cemF8',
        "author": 'haha',
        "digest": 'xixixi',
        "show_cover_pic": 1,
        "content": '1234567',
        "content_source_url": 'http://www.baidu.com',
        "localUrl": 'http://127.0.01:3000/public/material/z5gxzAz1trnjk9M-B2F14ScR2s_dZn3gcF1Wx_cemF8.png'
        }]
      }
      let wxRes = await materialService.uploadMaterial('news', news);
      if (wxRes && wxRes.media_id) {
        let sRes = await materialService.fetchMaterial(wxRes.media_id);
        let sqlParams = {content: JSON.stringify(sRes), media_id: wxRes.media_id, update_time: sRes.update_time};
        let sqlRes = await sqlMaterialService.saveMaterial(sqlParams, 'news');
      }
     
      ctx.response.body = util.RResult(wxRes,'获取数据成功','0');
    }
}