const config = require("./config");
const mysql = require("mysql");
const Promise =  require('bluebird');
let pool = mysql.createPool({
    connectionLimit : 20,
    host     :  config.HOST,
    user     : config.USERNAME,
    password : config.PASSWORD,
    database : config.DATABASE
})

let query = function( sql, values) {
    return new Promise((resolve, reject) => {
        pool.getConnection(function(err,connection) {
             if(err) {
                 resolve(err);
             } else {
                 connection.query(sql,values,(err,rows) => {
                    if ( err ) {
                        reject( err )
                      } else {
                        resolve( rows )
                      }
                  connection.release()
                 })
             }
        });
    });
}

let createTable = function( sql ) {
    return query( sql, [] )
}
//增加数据
let insertData = function( table, values ) {
    let _sql = "INSERT INTO ?? SET ?"
    return query( _sql, [ table, values ] )
}
//分页查询  
let findDataByPage = function( table, keys, start, end ) {
    let  _sql =  "SELECT ?? FROM ?? order by id desc LIMIT ? , ? "
    return query( _sql, [keys,  table,  start, end ] )
}
//条件查询 
let findDataByCons = function( table, keys, cons, value) {
    let  _sql =  "SELECT ?? FROM ?? WHERE ?? = ? order by id desc"
    return query( _sql, ['*',  'menu', 'menuid' ,'123456'] )
}
//查询所有
let select = function( table, keys ) {
    let  _sql =  "SELECT ?? FROM ?? "
    return query( _sql, [ keys, table ] )
}
//更新数据
let updateData = function( table, values, id ) {
    console.log('values: ');
    console.dir(values);
    let _sql = "UPDATE ?? SET ? WHERE id = ?"
    return query( _sql, [ table, values, id ] )
}
// 删除
let deleteDataById = function( table, id ) {
    let _sql = "DELETE FROM ?? WHERE id = ?"
    return query( _sql, [ table, id ] )
  }
  
//统计数量
let count = function( table ) {
    let  _sql =  "SELECT COUNT(*) AS total_count FROM ?? "
    return query( _sql, [ table ] )
}

module.exports = {
    query,
    createTable,
    insertData,
    updateData,
    select,
    findDataByPage,
    count,
    findDataByCons,
    deleteDataById
}