const path = require('path');
const fs = require('fs');
const config = require('../config/config');


/**
 * 同步创建文件目录
 * @param  {string} dirname 目录绝对地址
 * @return {boolean}        创建目录结果
 */
function mkdirsSync(dirname) {
  if (fs.existsSync(dirname)) {
    return true
  } else {
    if (mkdirsSync(path.dirname(dirname))) {
      fs.mkdirSync(dirname)
      return true
    }
  }
}

/**
 * 获取上传文件的后缀名
 * @param  {string} fileName 获取上传文件的后缀名
 * @return {string}          文件后缀名
 */
function getSuffixName(fileName) {
  let nameList = fileName.split('.')
  return nameList[nameList.length - 1]
}



function uploadBase64File(base64, rootPath, fileName) {
    return new Promise((resolve, reject) => {
      var base64Data = base64.replace(/^data:image\/\w+;base64,/, "");
      var dataBuffer = new Buffer(base64Data, 'base64');
      let fPath = rootPath + '/' + fileName;
      console.log('fPath: ' + fPath);
      fs.writeFile(fPath, dataBuffer, function(err) {
        if(err){
         reject ({code: -1, err: err});
        } else{
          resolve({fileName: fileName, filePath : fPath, code: 1});
        }
     });
    })  
}

module.exports = {
  uploadBase64File
}