var model = require('../model/user').getModel();
const dbHelper = require('./dbHelp');

/**
 * 公共Add方法
 * @param model 要操作数据库的模型
 * @param conditions 增加的条件,如{id:xxx}
 * @param callback 回调方法
 */
const addData = (data, callback) => {
  dbHelper.addData(model, data, result => {
    callback(result);
  });
}

/**
 * 公共find方法 非关联查找
 * @param model
 * @param conditions
 * @param fields 查找时限定的条件，如顺序，某些字段不查找等
 * @param options
 * @param callback
 */
//返回所有数据
const findAllData = (callback) => {
  dbHelper.findData(model, {}, {}, {
    lean: true
  }, result => {
    callback(result);
  })
}
//根据用户名查找
const findDataByUserName = (userName, callback) => {
  dbHelper.findData(model, {
    'userName': userName
  }, {}, {
    lean: true
  }, result => {
    callback(result)
  })
}

/**
 * 公共update方法
 * @param model 要操作数据库的模型
 * @param conditions 增加的条件,如{id:xxx}
 * @param update 更新条件{set{id:xxx}}
 * @param options 
 * @param callback
 */

/**
 * 公共remove方法
 * @param model
 * @param conditions
 * @param callback
 */
const deleteDataById = (id, callback) => {
  dbHelper.removeData(model, {
    _id: id
  }, result => {
    callback(result);
  });
}


module.exports = {
  addData,
  findAllData,
  deleteDataById,
  findDataByUserName
}