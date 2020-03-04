var express = require('express')
var path = require('path')

var indexRouter = require('./routes/index')
//把写好的路由挂载（第五步=>上一步在./test/bookTest.js中）
var userRouter = require('./routes/user')

var app = express()

//跨域中间件
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  next()
})

app.use(express.json())
app.use(express.urlencoded({
  extended: false
}))
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/user', userRouter)

module.exports = app