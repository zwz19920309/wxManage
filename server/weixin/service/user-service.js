const api = require('../common/api.js');
const request = require('request-promise');
const baseService =  require('./base-service');
const Http = require('../http/http');
module.exports = {
   /**
   *  所有用户
   *  @param  {string} appId 公众号appId 
   *  @param  {string} appSecret 公众号appSecret
   *  @return {object} 用户总列表
   */
  async userTotal (appId,appSecret) {
    
    let token = await baseService.fetchAccessToken(appId,appSecret);
    let url =api.user.total + token.access_token;
    let result =await Http.get(url);
    return result;
  },
   /**
   *  用户列表
   *  @param  {string} appId 公众号appId 
   *  @param  {string} appSecret 公众号appSecret
   *  @param {string}  next_openid //拉取开始位 openid
   *  @return {object} 用户分段列表
   */
  async userList (next_openid,appId,appSecret) {
    if(!next_openid){
      let userTotal = await this.userTotal(appId,appSecret);
      next_openid = userTotal.data.openid[0] ? userTotal.data.openid[0] : '';
    }
    let token = await baseService.fetchAccessToken(appId,appSecret);
    let url = api.user.userlist + token.access_token  + (next_openid?('&next_openid=' + next_openid):'');
    let result = await Http.get(url);
    return result;
  },
  //根据用户openid获取用户详细信息
  async userDetail (openid,appId,appSecret) {
    let token = await baseService.fetchAccessToken(appId,appSecret);
    let url = api.user.userDetail + token.access_token  + '&openid=' + openid +'&lang=zh_CN';
  //  console.log('url: ' + url);
    let result = await Http.get(url);
    return result;
  }
}