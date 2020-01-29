<template>
  <div>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>

    <h1>Book Manager</h1>
    <el-form :inline="true" :model="book" class="demo-form-inline">
      <el-form-item label="图书名称">
        <el-input v-model="book.name" placeholder="请输入书名"></el-input>
      </el-form-item>
      <el-form-item label="图书价格">
        <el-input
          v-model.number="book.price"
          type="number"
          placeholder="请输入价格"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addBook">添加图书</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="books" style="width: 80%">
      <el-table-column prop="_id" label="ID" width="180"> </el-table-column>
      <el-table-column prop="name" label="图书名称" width="300">
      </el-table-column>
      <el-table-column prop="price" label="图书价格"> </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="book">
          <el-button @click="deleteBook(book.row)" type="text" size="small"
            >删除</el-button
          >
          <el-button @click="dialogVisible = true" type="text" size="small"
            >编辑</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <h2>总价格： {{ priceTotal }}</h2>
  </div>
</template>

<script>
export default {
  name: 'BookManger',
  created() {
    fetch(this.url, { type: 'GET' })
      .then(res => res.json())
      .then(bks => (this.books = bks))
  },
  data() {
    return {
      url: '/books',
      maxId: 2,
      book: { name: '', price: '' },
      dialogVisible: false,
      books: []
    }
  },
  methods: {
    deleteBook(book) {
      fetch(this.url + '/' + book._id, { method: 'DELETE' })
        .then(res => res.json())
        .then(() => {
          let index = this.books.findIndex(item => item._id == book._id)
          this.books.splice(index, 1)
        })
    },
    addBook() {
      fetch(this.url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.book)
      })
        .then(res => res.json())
        .then(nb => this.books.push(nb))
    }
  },
  computed: {
    priceTotal() {
      return this.books.reduce((prev, book) => prev + book.price, 0)
    }
  }
}
</script>

<style scoped></style>
