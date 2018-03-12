const request = require('request-promise');
module.exports = {
  /**
   *  post请求
   *  @param  {url} 请求url 
   *  @param  {params} 请求参数
   *  @return {object} 返回结果
   */
  post: function (url,params, type) {
       let options = {
         method: 'POST',
         url: url,
         json: true  
       }
       if (type === 'form') {
         options.formData = params;
       } else {
         options.body = params;
       }
       return request(options); 
  },
  /**
   *  get
   *  @param  {url} 请求url 
   *  @param  {params} 请求参数
   *  @return {object} 返回结果
   */
  get: function(url, params) {
    var options = {
      uri: url,
      qs: {params},
      json: true 
     };
     return request(options); 
  }
}