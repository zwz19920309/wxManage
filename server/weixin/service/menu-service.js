const api = require('../common/api.js');
const request = require('request-promise');
const baseService =  require('./base-service');
const Http = require('../http/http');
module.exports = {
  /**
   * 生成菜单
   * @param  {obejct} menu 菜单json数据 
   * @param  {string} appId 公众号appId 
   * @param  {string} appSecret 公众号appSecret
   * @param (menu)--exp {"button":[{"type":"click","name":"菜单一","key":"A"}]}
   * @return {object}  {errcode: 0, errmsg: "ok"}
   */
  async createMenu (menu,appId,appSecret) {
      let token = await baseService.fetchAccessToken(appId,appSecret);
      let url =api.menu.create + token.access_token;
      let result =await Http.post(url, menu);
      return result;
  },
   /**
   *  获取菜单
   *  @param  {string} appId 公众号appId 
   *  @param  {string} appSecret 公众号appSecret
   *  @return {object}  菜单列表
   */
  async getMenu (appId,appSecret) {
    let token = await baseService.fetchAccessToken(appId,appSecret);
    let url =api.menu.get + token.access_token;
    let result =await Http.get(url);
    return result;
  },
   /**
   *  删除菜单
   *  @param  {string} appId 公众号appId 
   *  @param  {string} appSecret 公众号appSecret
   *  @return {object}  {"errcode":0,"errmsg":"ok"}
   */
  async deleteMenu (appId,appSecret) {
    let token = await baseService.fetchAccessToken(appId,appSecret);
    let url =api.menu.delete + token.access_token;
    let result =await Http.get(url);
    return result;
  }
}