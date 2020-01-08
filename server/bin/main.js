//启动入口文件(考虑配置)

const mongoose = require('mongoose')
require('../model')
var app = require('../app')
const http = require('http')

const server = http.createServer(app)

mongoose.connect(
  'mongodb://localhost:27017/database',
  { useMongoClient: true },
  err => {
    if (!err) {
      server.listen(3000, err => {
        console.log('express 服务已打开')
      })
    }
  }
)

server.on('close', () => {
  mongoose.disconnect()
})
