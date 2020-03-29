//测试成功后，讲相应方法加入到相应的路由上（第四步=>上一步在./test/bookTest.js中）
var express = require('express')
var router = express.Router()
const userDao = require('../dao/userDao')

router.get('/', function (req, res, next) {
  userDao.findAllData(doc => {
    res.json(doc)
  })
})

router.post('/login', function (req, res, next) {
  userDao.findDataByUserName(req.body.userName, doc => {
    if (doc.code != 0) {
      doc.msg = "无此用户"
    } else {
      let userinfo = doc.data[0];
      if (userinfo.userPassword != req.body.userPassword) {
        doc.msg = "密码不正确"
        doc.data = null;
      } else {
        doc.msg = "登录成功"
      }
    }
    res.json(doc)
  })
})

router.post('/register', function (req, res, next) {
  userDao.findDataByUserName(req.body.userName, doc => {
    if (doc.data.length > 0 && doc.code == 0) {
      doc.msg = "此账号已存在"
      doc.code = 1;
      doc.data = null
      res.json(doc)
    } else {
      userDao.addData(req.body, doc_add => {
        doc_add.msg = "注册成功"
        res.json(doc_add)
      })
    }
  })
})

router.post('/delete', function (req, res, next) {
  let id = req.body.id
  userDao.deleteDataById(id, doc => {
    res.json(doc)
  })
})

module.exports = router