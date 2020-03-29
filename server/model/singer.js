//建立模型模块（第一步）
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//schema 就是如何定义数据的结构
var singerSchema = new mongoose.Schema({
  singerName: {
    type: String
  },
  singerHeadImg: {
    type: String
  }
});

//生成方法getModel给予调用，返回user模型
module.exports = {
  getModel: function () {
    return _getModel();
  }
};

//通过mongoose将表user和Schema结构连接在一起，没有表的话会自动产生。
var _getModel = function (type, err) {
  const model = mongoose.model('singer', singerSchema);
  return model;
};