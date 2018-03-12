const materialModal  = require('../models/material-model');
const util  = require('../util/util');
module.exports = {
    /**
     * 获取菜单列表
     * @param  {object} options 分页参数
     * @return {object}       mysql执行结果
     */
    async materialList (params, type) {
      let result = await materialModal.materialList(type);
      return result;
    },
       /**
     * 获取素材列表总数
     * @param  {object} options 分页参数
     * @return {object} mysql执行结果
     */
    async materialCount(type) {
      let result = await materialModal.materialCount(type);
      return result;
    },
    /**
     * 保存菜单
     * @param  {object} options 分页参数
     * @return {object}       mysql执行结果
     */
    async saveMaterial (params, type) {
        let result = await materialModal.saveMaterial(params, type);
        return result;
    },
     /**
     * 查找菜单
     * @param  {object} params 查找参数
     * @return {object} mysql执行结果
     */
    async findMaterial (params, type) {
        let result = await materialModal.findMaterial(params, type);
        return result;
    },
    /**
    * 删除素材
    * @param  {object} params 删除参数
    * @return {object} mysql执行结果
    */
    async deleteMaterial (id, type) {
       let result = await materialModal.deleteMaterial(id, type);
       return result;
   },
    /**
     * 分页查询
     * @param  {object} params 删除参数
     * @return {object} mysql执行结果
     */
    async findMaterialByPage (params, type) {
        let result = await materialModal.findMaterialByPage(params, type);
        return result;
    }
}