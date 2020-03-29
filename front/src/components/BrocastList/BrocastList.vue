<template>
  <div class="musicList">
    <el-table
      :data="tableData"
      :border="false"
      style="width: 100%"
      :stripe="false"
      @row-click="handleRowClick"
    >
      <el-table-column prop="songName" label="歌名" width="500"></el-table-column>
      <el-table-column prop="singerName" label="歌手" width="300"></el-table-column>
      <el-table-column prop="albumName" label="专辑" width="180"></el-table-column>
      <el-table-column prop="favor" label></el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getSong } from "../../server/index.js";
export default {
  data() {
    return {
      tableData: null
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

  computed: {},

  methods: {
    handleRowClick(obj) {
      this.$emit("choicemusic", obj);
    }
  }
};
</script>
<style lang="scss" scoped>
.musicList {
  /deep/ .el-table {
    &:before {
      height: 0;
    }
    border: none;
    margin-top: 20px;
    background-color: transparent;
    color: #fff;
    thead {
      color: #fff;
      border: none;
    }
    tbody {
      color: #fff;
      border: none;
      tr {
        &:hover {
          color: black;
        }
      }
    }
    tr {
      background-color: transparent;
      border: none;
    }
    td {
      background-color: transparent;
      border: none;
    }
    th {
      background-color: transparent;
      border: none;
    }
    .el-table__empty-text {
      color: #fff;
    }
  }
}
</style>