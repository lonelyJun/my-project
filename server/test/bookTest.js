//再根目录下执行mocha，会找到test文件夹下的Test结尾的js文件，进行测试
//使用测试数据，对数据库方法进行测试（第三步=>上一步在./dao/BookDao.js中）
const mongoose = require('mongoose')
require('../model')
const BookDao = require('../dao/BookDao')
const assert = require('assert')
let bookList = []
describe('测试BookDom', () => {
  before(() => {
    mongoose.connect(
      'mongodb://localhost:27017/database',
      { useMongoClient: true },
      err => {
        if (!err) {
        }
      }
    )
  })
  after(() => {
    mongoose.disconnect()
  })
  it('测试添加一本书', done => {
    let book = { name: 'zjj', price: '200' }
    BookDao.addBook(book, (err, nb) => {
      assert(nb._id != null)
      done()
    })
  })
  it('测试查询所有的书', done => {
    BookDao.findAllBooks((err, books) => {
      assert(books.length > 0)
      bookList = books.forEach(book => console.log(book._id))
      done()
    })
  })
  it('按照ID删除书本', done => {
    let id = bookList[0]._id
    BookDao.deleteBookById(id, err => {
      assert(err == null)
      done()
    })
  })
})
