const path=require('path');
const request = require('request-promise');
const config = require('../common/config.js');
const api = require('../common/api.js');
const util = require('../util/util.js');
const fileUtil = require('../util/file-util.js');
const validator = require('../util/validator.js');
const access_token_file = path.join(__dirname,'../config/wechat.txt')
module.exports = {
    /**
   * 获取access_token
   * @param  {string} appId 公众号appId
   * @param {string} appSecret 公众号appSecret
   * @return {object}      {access_token:'',expires_in:''}
   */
    async getAccessToken(appId, appSecret){ //
        let options = {
            uri: api.accessToken+'&appid='+appId+'&secret='+appSecret,
            json: true 
        };
       let access_token = await request(options);
       return access_token; 
    },
   /**
   * 获取access_token
   * @param  {string} appId 公众号appId
   * @param {string} appSecret 公众号appSecret
   * @return {object}      {access_token:'',expires_in:''}
   */
    async fetchAccessToken (appId, appSecret) {
        let access_token = await fileUtil.readFileAsync(access_token_file,'utf-8'); //accessToken-文件读取
        access_token = JSON.parse(access_token)
        if(validator.isValidAccessToken(access_token)) {
            return access_token;
        } 
        let a_appId = config.wechat.appId;
        let a_appSecret = config.wechat.appSecret;
        access_token = await this.getAccessToken(a_appId,a_appSecret);
        console.log('@access-token: ');
        console.dir(access_token);
        if(access_token.errcode) {
           return util.EResult(access_token);
        } else {
            access_token.expires_in = (new Date().getTime()) + 1000*58*2;
            await fileUtil.writeFileAsync(access_token_file,access_token);
        }
        return access_token; 
     }
}