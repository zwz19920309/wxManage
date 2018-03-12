module.exports = {
    RResult:function (result,msg,code) {
       return {
          status: 'success',
          code:code || '0',
          body:result,
          message:msg || ''
       };   
    },
    EResult: function (result,msg,code) {
        return {
            status: 'fail',
            code: code  || '-1',
            body:result ,
            message:msg || ''
         }; 
    }
}