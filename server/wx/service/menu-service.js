const menuModal  = require('../models/menu-model');
const util  = require('../util/util');
module.exports = {
    /**
     * 获取菜单列表
     * @param  {object} options 分页参数
     * @return {object}       mysql执行结果
     */
    async menuList (params) {
      let result = await menuModal.menuList();
      return result;
    },
    /**
     * 保存菜单
     * @param  {object} options 分页参数
     * @return {object}       mysql执行结果
     */
    async saveMenu (params) {
        let result = await menuModal.saveMenu(params);
        return result;
    },
     /**
     * 查找菜单
     * @param  {object} params 查找参数
     * @return {object} mysql执行结果
     */
    async findMenu (params) {
        let result = await menuModal.findMenu(params);
        return result;
    }
}