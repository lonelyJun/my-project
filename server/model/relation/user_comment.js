//存放关联数据的中间表结构

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var user_commentSchema = new mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  }, //定义类型为objectid ,ref是关联的模型名称
  commentId: {
    type: Schema.Types.ObjectId,
    ref: 'comment'
  } //定义类型为objectid ,ref是关联的模型名称</span>
});

module.exports = {
  getModel: function () {
    return _getModel();
  }
};

var _getModel = function (type, err) {
  var model = mongoose.model('user_comment', user_commentSchema);
  return user_schoolClassModel;
}