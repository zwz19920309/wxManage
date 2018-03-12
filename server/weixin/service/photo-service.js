let uploadFile = require('../util/upload-file');

module.exports = {
async uploadPhoto(ctx) {
    // 创建测试文件
    // var filename = '1mb.zip';
    // var filepath = path.resolve(__dirname, filename);
    // await util.createFile(filepath, 1024 * 1024, function (err) {
    // });
    let formData;
    await uploadFile.uploadBase64File(ctx.request.body.file, '', '').then(function (result) {
      formData = result.formData;
    })

   
    return { code: 0, message: '上传成功' }
  }

}