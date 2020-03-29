//存放关联数据的中间表结构

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var user_commentSchema = new mongoose.Schema({
  albumId: {
    type: Schema.Types.ObjectId,
    ref: 'album'
  },
  songId: {
    type: Schema.Types.ObjectId,
    ref: 'song'
  },
  singerId: {
    type: Schema.Types.ObjectId,
    ref: 'singer'
  },
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