// const mysql  = require('mysql')
// const connection = mysql.createConnection({
//   host     : '127.0.0.1',   // 数据库地址
//   user     : 'root',    // 数据库用户
//   password : '123456',   // 数据库密码
//   database : 'wx'  // 选中数据库
// })
 
// // 执行sql脚本对数据库进行读写 
// connection.query('SELECT * FROM user',  (error, results, fields) => {
//   if (error) throw error
//   // connected! 
//   console.log('results: ');
//   console.dir(results);
//    console.log('connect: ');  
//   // 结束会话

// });

const dbUtil  = require('./dbUtil');
// let user  = {"subscribe":1,"openid":"oYT6zv_SxKZb5P4t1h8K_qWf_rUU","nickname":"眼大有神","sex":0,"language":"zh_CN","city":"广州","province":"广东","country":"中国","headimgurl":"http://wx.qlogo.cn/mmopen/kdVBttR9d9ted4dycjibpsHFrSsom0GCxb5xHH0PZIXjKT1amUqrUsYvDWTgVZ8Cw4L1bzJt3rJXUzkWeCWPH9G0P0lJibgrov/0","subscribe_time":1465812421,"remark":"","groupid":0}
// dbUtil.insertData('user',user);

// const userService  = require('../weixin/service/user-service');

// let user = userService.updateUserList();
//insert into t values(1,'{"a":1,"s":"abc"}')
//建表语句
//CREATE TABLE  menu
//(id INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,menuid VARCHAR(40), menus JSON);
//insert into menu (menuid,menus) values('1234567890','{"a":1,"s":"abc"}')
let data = {id:2 ,js: '{"a":1,"s":"abc"}'};
let menus = {menuid:'1221321',menus:'{"a":1,"s":"1313"}'}
dbUtil.insertData('menu',menus);

