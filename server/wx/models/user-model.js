const dbUtil  = require('../../mysql/dbUtil');
const util  = require('../util/util');
module.exports = {
    /**
     * 获取用户列表
     * @param  {object} options 分页参数
     * @return {object}       mysql执行结果
    */
    async userList (params) {
      let options = util.pageOptions(params);
      let result = await dbUtil.findDataByPage('user',options.conditions,options.offset,options.limit);
      return result;
    },
    /**
     * 获取用户总数
     * @param  {object} options 分页参数
     * @return {object}
     */
    async userTotal (params) {
        let options = util.pageOptions(params);
        let result = await dbUtil.count('user',options.conditions,options.offset,options.limit);
        return result;
    }
}