const dbUtil  = require('../../mysql/dbUtil');
const util  = require('../util/util');
module.exports = {
    /**
     * 获取素材列表
     * @param  {object} options 分页参数
     * @return {object} mysql执行结果
     */
    async materialList (params, type) {
      let table = type ?  (type === 'news' ? 'material_news' : 'material') : 'materail';  
      let result = await dbUtil.select(table, ['*']);
      return result;
    },
     /**
     * 获取素材列表总数
     * @param  {object} options 分页参数
     * @return {object} mysql执行结果
     */
    async materialCount(type) {
        let table = type ?  (type === 'news' ? 'material_news' : 'material') : 'materail';  
        let result = await dbUtil.count(table, ['*']);
        return result;
      },
     /**
     * 保存素材
     * @param  {object} params  素材对象 
     * @return {object} mysql执行结果
     */
    async saveMaterial (params, type) {
        let table = type ?  (type === 'news' ? 'material_news' : 'material') : 'materail';  
        let result = await dbUtil.insertData(table, params);
        return result;
    },
     /**
     * 查找素材
     * @param  {object} params 查找参数
     * @return {object} mysql执行结果
     */
    async findMaterial (params, type) {
        let table = type ?  (type === 'news' ? 'material_news' : 'material') : 'materail';  
        let result = await dbUtil.findDataByCons(table, params.keys, params.cons, params.value);
        return result;
    },
     /**
     * 删除素材
     * @param  {object} params 删除参数
     * @return {object} mysql执行结果
     */
    async deleteMaterial (id, type) {
        let table = type ?  (type === 'news' ? 'material_news' : 'material') : 'materail';  
        let result = await dbUtil.deleteDataById(table, id);
        return result;
    },
    /**
     * 分页查询
     * @param  {object} params 删除参数
     * @return {object} mysql执行结果
     */
    async findMaterialByPage (params, type) {
        let table = type ?  (type === 'news' ? 'material_news' : 'material') : 'materail';  
        let result = await dbUtil.findDataByPage(table, params.keys, params.offset, params.limit);
        return result;
    }

}