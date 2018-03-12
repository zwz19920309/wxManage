const userService = require('../services/user-service');


module.exports = {
  /**
   *用户列表
   *@params {object} ctx 上下文对象
   */
  async userList(ctx) {
    let result ={msg:'21321'};  
    ctx.response.body = result;
  }

}
