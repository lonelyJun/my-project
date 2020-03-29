<template>
  <div class="admin">
    <!-- 面板 -->
    <div :class="{core:true,beforeLogin:!loginFlag}">
      <div v-if="loginFlag">
        <ul class="nav">
          <li>用户管理</li>
          <li>歌手管理</li>
          <li>歌曲管理</li>
          <li>专辑管理</li>
        </ul>
        <div class="content">
          <MusicManager />
        </div>
      </div>

      <!-- 登录窗口 -->
      <div class="loginWin" v-if="!loginFlag">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="用户名">
            <el-input v-model="form.username"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="form.password" type="password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('form')">提交</el-button>
            <el-button @click="cancel('form')">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import MusicManager from "../components/MusicManager/MusicManager.vue";
// import { login, register } from "../server/index";
export default {
  name: "Admin",
  computed: {
    // loginStatusText() {
    //   return this.userinfo ? "退出登录" : "登录/注册";
    // }
  },
  components: {
    MusicManager
  },
  data() {
    return {
      loginFlag: true,
      // activeName: "login",
      form: {
        username: "",
        password: ""
      },
      userinfo: null
    };
  },
  methods: {
    // submitForm(formName) {
    //   if (formName == "form") {
    //     login({
    //       userName: this.form.username,
    //       userPassword: this.form.password
    //     }).then(doc => {
    //       let result = doc.data;
    //       this.$message({
    //         message: result.msg,
    //         type: result.code == 0 ? "success" : "error"
    //       });
    //       if (result.data && result.code == 0) {
    //         this.userinfo = result.data[0];
    //         this.loginFlag = false;
    //       }
    //     });
    //   } else {
    //     this.$refs[formName].validate(valid => {
    //       if (valid) {
    //         register({
    //           userName: this.ruleForm.username,
    //           userPassword: this.ruleForm.password
    //         }).then(doc => {
    //           let result = doc.data;
    //           this.$message({
    //             message: result.msg,
    //             type: result.code == 0 ? "success" : "error"
    //           });
    //           if (result.data && result.code == 0) {
    //             this.userinfo = result.data[0];
    //             this.activeName = "login";
    //           }
    //         });
    //       } else {
    //         this.$message({ message: "请先确认输入", type: "error" });
    //         return false;
    //       }
    //     });
    //   }
    // },
    handleLogin() {
      if (this.userinfo) {
        //已登录
        this.userinfo = null;
      } else {
        this.loginFlag = true;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.admin {
  height: 100%;
}
.loginWin {
  width: 350px;
  padding: 20px;
  border-radius: 10px;
  background-color: #fff;
  box-sizing: border-box;
}
.core {
  width: 1200px;
  margin: 0 auto;
  height: 100%;
  display: flex;
  flex-direction: column;
  &.beforeLogin {
    justify-content: center;
    align-items: center;
  }
  .content {
    flex: 1 1 auto;
  }
  .nav {
    flex: 0 0 auto;
    padding-top: 20px;
    display: flex;
    li {
      margin-right: 20px;
      padding: 6px 25px;
      box-sizing: border-box;
      color: #fff;
      border: 1px solid #fff;
      &:last-child {
        margin-right: 0;
      }
      cursor: pointer;
      &:hover {
        border: 1px solid #409eff;
        color: #409eff;
      }
    }
  }
}
</style>
