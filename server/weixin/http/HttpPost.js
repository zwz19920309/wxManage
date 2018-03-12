const request = require('request-promise');

module.exports = function (url,params) {
       let options = {
         method: 'POST',
         url: url,
         body: params,
         json: true  
       }
       return request(options); 
    }