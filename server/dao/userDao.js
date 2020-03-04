var model = require('../model/user').getModel();
const dbHelper = require('./dbHelp');

const addData = (data, callback) => {
  dbHelper.addData(model, data, result => {
    callback(result);
  });
}

const findAllData = (callback) => {
  dbHelper.findData(model, {}, {}, {}, result => {
    callback(result);
  })
}

module.exports = {
  addData,
  findAllData,
}