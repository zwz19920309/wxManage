const dbUtil  = require('../../mysql/dbUtil');
const util  = require('../util/util');
module.exports = {
    /**
     * 获取菜单列表
     * @param  {object} options 分页参数
     * @return {object} mysql执行结果
     */
    async menuList (params) {
      let result = await dbUtil.select('menu',['*']);
      return result;
    },
     /**
     * 保存菜单
     * @param  {object} params  菜单对象 
     * @return {object} mysql执行结果
     */
    async saveMenu (params) {
        let result = await dbUtil.insertData('menu',params);
        return result;
    },
     /**
     * 查找菜单
     * @param  {object} params 查找参数
     * @return {object} mysql执行结果
     */
    async findMenu (params) {
        let result = await dbUtil.findDataByCons('menu',params.keys,params.cons,params.value);
        return result;
    }
}