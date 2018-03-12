const os = require('os');
module.exports = {
    /*分页函数*/
    pageOptions:function(params) {
        let options = params || {offset:0,limit:10,conditions:'*'};
        options.offset = options.offset?options.offset:0;
        options.limit = options.limit?options.limit:10;
        options.conditions = options.conditions?options.conditions:'*';
        return options;
    },
    getLocalIP : function()
    {
        var interfaces = require('os').networkInterfaces();  
        for(var devName in interfaces){  
              var iface = interfaces[devName];  
              for(var i=0;i<iface.length;i++){  
                   var alias = iface[i];  
                   if(alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal){  
                         return alias.address;  
                   }  
              }  
        }  
        return null;
    },
    RResult:function (result, code, msg) {
        return {
           status: 'success',
           code:code || '1',
           body:result,
           message:msg || '操作成功'
        };   
     },
     EResult: function (result, code, msg) {
         return {
             status: 'fail',
             code: code  || '-1',
             body:result ,
             message:msg || '操作失败'
          }; 
     }
}