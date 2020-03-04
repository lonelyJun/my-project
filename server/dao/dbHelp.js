/**
 * 公共Add方法
 * @param model 要操作数据库的模型
 * @param conditions 增加的条件,如{id:xxx}
 * @param callback 回调方法
 */
const addData = (model, newData, callback) => {

  model.create(newData, (err, result) => {
    if (err) {
      callback({
        code: 1,
        msg: err,
        data: result
      });
    } else {
      callback({
        code: 0,
        msg: "save data success",
        data: result
      });
    }
  });

}

/**
 * 公共update方法
 * @param model 要操作数据库的模型
 * @param conditions 增加的条件,如{id:xxx}
 * @param update 更新条件{set{id:xxx}}
 * @param options 
 * @param callback
 */
const updateData = (model, conditions, update, options, callback) => {

  model.update(conditions, update, options, (err, result) => {
    if (err) {
      callback({
        code: 1,
        msg: err,
        data: result
      });
    } else {
      if (result.n != 0) {
        callback({
          code: 0,
          msg: "update data success",
          data: result
        });
      } else {
        callback({
          code: 1,
          msg: 'update fail:no this data!',
          data: result
        });
      }

    }
  });
}

/**
 * 公共remove方法
 * @param model
 * @param conditions
 * @param callback
 */
const removeData = (model, conditions, callback) => {

  model.remove(conditions, (err, result) => {
    if (err) {
      callback({
        code: 1,
        msg: "remove data fail",
        data: result
      });
    } else {
      if (result.n != 0) {
        callback({
          code: 0,
          msg: "remove data success",
          data: result
        });
      } else {
        callback({
          code: 1,
          msg: 'remove fail:no this data!',
          data: result
        });
      }

    }
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
const findData = (model, conditions, fields, options, callback) => {

  model.find(conditions, fields, options, (err, result) => {
    if (err) {
      callback({
        code: 1,
        msg: err,
        data: result
      });
    } else {
      if (result.length != 0) {
        callback({
          code: 0,
          msg: "find data success",
          data: result
        });
      } else {
        callback({
          code: 1,
          msg: 'find fail:no this data!',
          data: result
        });
      }

    }

  });
}

/**
 * 公共populate find方法
 * 是关联查找
 * @param model
 * @param conditions
 * @param path :The field need to be refilled （需要覆盖的字段）
 * @param fields :select fields (name -_id,Separated by a space field,In front of the field name plus "-"said not filled in)
 * @param refmodel （关联的字段，有path可为null）
 * @param options
 * @param callback
 */
const findDataPopulation = (model, conditions, path, fields, refmodel, options, callback) => {
  model.find(conditions)
    .populate(path, fields, refmodel, options)
    .exec((err, result) => {
      if (err) {
        callback({
          code: 1,
          msg: 'population find data fail',
          data: result
        });
      } else {
        if (result.length != 0) {
          callback({
            code: 0,
            msg: 'population find data success',
            data: result
          });
        } else {
          callback({
            success: 0,
            msg: 'population find fail:no this data!',
            data: result
          });
        }

      }

    });

}

module.exports = {
  addData,
  updateData,
  removeData,
  findData,
  findDataPopulation
}