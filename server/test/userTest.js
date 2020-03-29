//再根目录下执行mocha，会找到test文件夹下的Test结尾的js文件，进行测试
//使用测试数据，对数据库方法进行测试（第三步=>上一步在./dao/BookDao.js中）
const mongoose = require('mongoose')
// require('../model')
const dao = require('../dao/userDao')
const assert = require('assert')

const testName = 'userDom'
const mongodbUrl = 'mongodb://localhost:27017/database'

describe('测试' + testName, () => {
  before(() => {
    mongoose.connect(
      mongodbUrl, {
        useMongoClient: true
      },
      err => {
        if (!err) {}
      }
    )
  })
  after(() => {
    mongoose.disconnect()
  })
  // it('添加一个用户', done => {
  //   let user = {
  //     userName: 'testUser',
  //     userPassword: '123456'
  //   }
  //   dao.addData(user, result => {
  //     assert(result.code == 0)
  //     done()
  //   })
  // })
  it('测试查询所有用户', done => {
    dao.findAllData(result => {
      assert(result.code == 0)
      done()
    })
  })
  it('根据用户名查找数据', done => {
    dao.findDataByUserName('testUser', result => {
      console.log(result);
      assert(result.code == 0)
      done()
    })
  })
})