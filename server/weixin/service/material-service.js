const request = require('request-promise');
const fs = require('fs');
const api = require('../common/api.js');
const baseService =  require('./base-service');
const Http = require('../http/http');
const self =this;
module.exports = {
  /**
   *  所有获取微信公众号素材总数
   *  @param  {string} appId 公众号appId 
   *  @param  {string} appSecret 公众号appSecret
   *  @return {object} 用户总列表
   */
  async perMaterialCount (appId, appSecret) {
    let token = await baseService.fetchAccessToken(appId,appSecret);
    let url =api.material.count + token.access_token;
    let result = await Http.get(url);
    return result;
  },
  
   /**
   *  所有获取微信公众号的素材列表
   *  @param  {string} appId 公众号appId 
   *  @param  {string} appSecret 公众号appSecret
   *  @return {object} 用户总列表
   */
  async perMaterialList (params, appId, appSecret) {
    let token = await baseService.fetchAccessToken(appId,appSecret);
    let url =api.material.fetchMaterialList + token.access_token;
    let result = await Http.post(url, params);
    return result;
  },
    /**
   *  shacn素材
   *  @param  {string} appId 公众号appId 
   *  @param  {string} appSecret 公众号appSecret
   *  @return {object} 返回删除结果
   */
  async deleteMaterial (media_id, appId, appSecret) {
    console.log('deleteService: ');
    let options = {media_id: media_id};
    let token = await baseService.fetchAccessToken(appId,appSecret);
    let url =api.permanent.delete + token.access_token;
    let result = await Http.post(url, options);
    console.log('@deletMaterial: ');
    console.dir(result);
    return result;
  },
   /**
   *  上传素材
   *  @param  {string} appId 公众号appId 
   *  @param  {string} appSecret 公众号appSecret
   *  @return {object} 返回删除结果
   */
  async uploadMaterial (type, material, appId, appSecret) {
    let url = api.permanent.uploadNews;
    let token = await baseService.fetchAccessToken(appId,appSecret);
    let options = { access_token: token.access_token };
    let dataYype = 'news';
    
    switch (type) {
      case 'image':
        url = api.permanent.add;
        // url = url + '&type=image';
        dataYype = 'form';
        options.media = fs.createReadStream(material);
        break;
      case 'news': 
        options = material;
        break;
    }
    url = url + token.access_token;
    let result = await Http.post(url, options, dataYype);
    return result;
  },
  /*获取微信素材列表*/
  async  wxAllPerMaterialList (type) {
    let counts = await this.perMaterialCount();
    let num = counts.image_count;
    switch (type) {
      case 'image':
        num = counts.image_count
        break;
      case 'news':
        num = counts.news_count
        break;
    }
    let options = {type: type, offset: 0, count: num};
    let result = await this.perMaterialList(options);
    return result;
  },
  /**
  *  根据media_id获取素材
  *  @param  {string} appId 公众号appId 
  *  @param  {string} appSecret 公众号appSecret
  *  @return {object} 返回微信获取结果
  */
 async fetchMaterial (media_id, appId, appSecret) {
   console.log('fetchMaterial: ');
   let options = {media_id: media_id};
   let token = await baseService.fetchAccessToken(appId,appSecret);
   let url =api.permanent.fetch + token.access_token;
   let result = await Http.post(url, options);
   return result;
 },
}