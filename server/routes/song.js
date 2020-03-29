//测试成功后，讲相应方法加入到相应的路由上（第四步=>上一步在./test/bookTest.js中）
var express = require('express')
var router = express.Router()
let multer = require('multer');
let fs = require("fs");
let path = require("path");
const songDao = require('../dao/songDao')

router.get('/', function (req, res, next) {
  songDao.findAllData(doc => {
    res.json(doc)
  })
})

router.post('/upload', multer({
  //设置文件存储路径
  dest: './music' //upload文件如果不存在则会自己创建一个。
}).array('file', 10), function (req, res, next) {
  let files = req.files;
  if (files.length === 0) {
    res.json({
      code: 1,
      msg: "上传文件不能为空！",
      data: null
    });
    return
  } else {
    let fileInfos = [];
    files.forEach(item => {
      let fileInfo = {};
      fs.renameSync('./music/' + item.filename, './music/' + item.originalname); //这里修改文件名。
      //获取文件基本信息
      // fileInfo.mimetype = item.mimetype;
      fileInfo.songName = item.originalname;
      // fileInfo.size = item.size;
      fileInfo.url = item.originalname;
      fileInfos.push(fileInfo);
    })
    songDao.addData(fileInfos, (doc) => {
      res.json(doc);
    })
  }
})

router.post('/delete', function (req, res, next) {
  let id = req.body.id
  songDao.deleteDataById(id, doc => {
    res.json(doc)
  })
})

router.post('/deleteAll', (req, res, next) => {
  songDao.deleteAll(doc => {
    res.json(doc)
  })
})

module.exports = router