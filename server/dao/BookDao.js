//通过mongoose 编辑对数据库进行数据增删改查的方法库（第二步=>上一步在./model/index.js中）
const mongoose = require('mongoose')

let bookModel = mongoose.model('Book')

const addBook = (book, callback) => {
  bookModel.create(book, function(err, newBook) {
    if (!err) callback(null, newBook.toObject())
    else callback(err)
  })
}

const findAllBooks = callback => {
  bookModel.find({}).exec((err, books) => {
    if (!err) callback(null, books)
    else callback(err)
  })
}

const deleteBookById = (id, callback) => {
  bookModel.findByIdAndRemove(id, err => {
    if (!err) callback(null, {})
    else callback(err)
  })
}

module.exports = { addBook, findAllBooks, deleteBookById }
