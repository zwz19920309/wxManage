const dbUtil  = require('../../mysql/dbUtil');
const userService  = require('../../weixin/service/user-service');
const filter  = require('../../weixin/util/filter');
const userModal  = require('../models/user-model');
module.exports = {
//批量更新用户列表
async  updateUserList (appId,appSecret) {
  let userTotal = await userService.userTotal();
  if(userTotal.data && userTotal.data.openid) {
     let openids = userTotal.data.openid;
     for(let m=0; m<openids.length; m++) {
       let userDetail = await userService.userDetail(openids[m],appId,appSecret);
       delete userDetail.tagid_list;
       if(userDetail && userDetail.openid) {
       let userData = {openid: userDetail.openid,nickname: userDetail.nickname}; 
       await dbUtil.insertData('user', userDetail);
       }
     }
  }  
  return {msg:'ok'};
 },
 /**
 *  获取用户列表
 *  @param  {object} params 分页对象 
 *  @return {object}  用户列表
 */
 async userList(params) {
   let res = userModal.userList(params);
   return  res;
 },
 /**
 *  获取用户列表总数
 *  @param  {object} params 分页对象 
 *  @return {object}  用户列表
 */
 async userTotal(params) {
  let res = await userModal.userTotal(params);
  return  res;
 }
}