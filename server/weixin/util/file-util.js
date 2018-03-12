const fs = require('fs');
const Promise =  require('bluebird');

module.exports = {
   async readFileAsync(fpath, encoding){
    return new Promise(function(resolve,reject){
        fs.readFile(fpath,encoding,function(err,content){
            if(err) reject(err);
             else{
                resolve(content);
            }
        })
    });
   },
   async writeFileAsync(fpath,content){
    return new Promise(function(resolve,reject){
        fs.writeFile(fpath,JSON.stringify(content),function(err,content){
            if(err) reject(err);
             else{
                resolve(content);
            }
        })
    });
   }
}