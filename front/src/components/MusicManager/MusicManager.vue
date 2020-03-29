<template>
  <div class="musicList">
    <!-- 对话框 -->
    <el-dialog title="上传音乐" :visible.sync="addMusicFlag">
      <div class="content">
        <div class="addMusic">
          <el-upload
            class="upload-demo"
            drag
            :action="uploadUrl"
            :limit="10"
            :on-exceed="handleExceed"
            multiple
            :on-success="handleUploadSuccess"
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              将文件拖到此处，或
              <em>点击上传</em>
            </div>
            <div class="el-upload__tip" slot="tip">每次最多10个文件</div>
          </el-upload>
        </div>
        <div class="editMusic"></div>
      </div>
    </el-dialog>
    <el-button type="primary" plain class="addBtn" @click="handleAddMusic">上传音乐</el-button>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="songName" label="歌名" width="500"></el-table-column>
      <el-table-column prop="singerName" label="歌手" width="300"></el-table-column>
      <el-table-column prop="albumName" label="专辑" width="180"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="handleEdit(scope.row)" type="text" size="small">编辑</el-button>
          <el-button @click="handleDelete(scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="1"
      layout="prev, pager, next, jumper"
      :total="totalData"
    ></el-pagination>
  </div>
</template>

<script>
import { getSong } from "../../server/index.js";
export default {
  data() {
    return {
      uploadUrl: "/api/song/upload",
      addMusicFlag: false,
      fileList: null,
      tableData: null, //表格数据
      currentPage: 1 //当前页数
    };
  },

  mounted() {
    getSong().then(doc => {
      let result = doc.data;
      if (result.code == 0) {
        this.tableData = result.data;
      } else {
        this.$message({
          type: "error",
          message: result.msg
        });
      }
    });
  },

  components: {},

  computed: {
    totalData() {
      if (this.tableData) return this.tableData.length;
      else return 0;
    }
  },

  methods: {
    handleSizeChange() {
      //页面每页数据量变化
    },
    handleCurrentChange() {
      //当前页变化方法
    },
    handleEdit(obj) {
      console.log(obj);
    },
    handleDelelte(obj) {
      console.log(obj);
    },
    handleAddMusic() {
      this.addMusicFlag = true;
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 10 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    handleUploadSuccess(doc) {
      this.tableData = doc.data;
    }
  }
};
</script>
<style lang='scss' scoped>
.musicList {
  display: flex;
  flex-direction: column;
  .addBtn {
    margin-top: 20px;
    align-self: flex-start;
  }

  /deep/ .el-table {
    box-sizing: border-box;
    padding: 10px;
    margin-top: 20px;

    &:before {
      height: 0;
    }
    .el-button--text {
      color: #cc3299;
    }
  }

  /deep/ .el-pagination {
    padding-top: 10px;
    background-color: #fff;
  }
}
</style>