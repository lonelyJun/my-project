//测试成功后，讲相应方法加入到相应的路由上（第四步=>上一步在./test/bookTest.js中）
var express = require('express')
var router = express.Router()
const userDao = require('../dao/userDao')

router.get('/', function (req, res, next) {
  userDao.findAllData(result => {
    res.json(result)
  })
})

router.post('/', function (req, res, next) {
  userDao.addData(req.body, result => {
    res.json(result)
  })
})

// router.delete('/:id', function (req, res, next) {
//   let id = req.params.id
//   bookDao.deleteBookById(id, err => {
//     console.log(id)
//     if (!err) res.json({})
//     else {
//       res.json(err)
//     }
//   })
// })

module.exports = router