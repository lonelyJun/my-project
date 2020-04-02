<template>
  <div class="home">
    <div class="core">
      <ul class="nav">
        <li>播放列表</li>
        <li>歌手列表</li>
        <li>搜索歌曲</li>
        <li @click="handleLogin">{{loginStatusText}}</li>
      </ul>
      <div class="content">
        <BrocastList @choicemusic="choiceMusic" />
      </div>

      <mediaplayer-component
        :mediainfo="music"
        meidaType="audio"
        :keyValue="music?music.id:0"
        :autoPlayFlag="true"
      />
    </div>
    <!-- 登录注册窗口 -->
    <el-dialog title="登录/注册" :visible.sync="loginFlag">
      <div class="content">
        <el-tabs v-model="activeName" type="card" stretch="stretch">
          <!-- 登录窗口 -->
          <el-tab-pane label="登录" name="login">
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
          </el-tab-pane>
          <!-- 注册窗口 -->
          <el-tab-pane label="注册" name="register">
            <el-form
              :model="ruleForm"
              status-icon
              :rules="rules"
              ref="ruleForm"
              label-width="100px"
              class="demo-ruleForm"
            >
              <el-form-item label="用户名" prop="username">
                <el-input v-model.number="ruleForm.username"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="确认密码" prop="password_sure">
                <el-input type="password" v-model="ruleForm.password_sure" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// @ is an alias to /src
import BrocastList from "../components/BrocastList/BrocastList";
import { login, register } from "../server/index";
export default {
  name: "Home",
  computed: {
    loginStatusText() {
      return this.userinfo ? "退出登录" : "登录/注册";
    }
  },
  components: {
    BrocastList
  },
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.password_sure !== "") {
          this.$refs.ruleForm.validateField("password_sure");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      music: {
        id: 0,
        url: ""
      },
      loginFlag: false, //登录窗口对话框显示控制器
      activeName: "login", //登录注册切换页控制器
      form: {
        username: "",
        password: ""
      },
      ruleForm: {
        username: "",
        password: "",
        password_sure: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [
          { validator: validatePass, trigger: "blur" },
          { required: true, message: "请输入密码", trigger: "blur" }
        ],
        password_sure: [
          { validator: validatePass2, trigger: "blur" },
          { required: true, message: "请输入密码", trigger: "blur" }
        ]
      },
      userinfo: null
    };
  },
  methods: {
    choiceMusic(obj) {
      this.music.id = obj._id;
      this.music.url = "/" + obj.url.replace(/\\/g, "/");
    },
    submitForm(formName) {
      if (formName == "form") {
        login({
          userName: this.form.username,
          userPassword: this.form.password
        }).then(doc => {
          let result = doc.data;
          this.$message({
            message: result.msg,
            type: result.code == 0 ? "success" : "error"
          });
          if (result.data && result.code == 0) {
            this.userinfo = result.data[0];
            this.loginFlag = false;
          }
        });
      } else {
        this.$refs[formName].validate(valid => {
          if (valid) {
            register({
              userName: this.ruleForm.username,
              userPassword: this.ruleForm.password
            }).then(doc => {
              let result = doc.data;
              this.$message({
                message: result.msg,
                type: result.code == 0 ? "success" : "error"
              });
              if (result.data && result.code == 0) {
                this.userinfo = result.data[0];
                this.activeName = "login";
              }
            });
          } else {
            this.$message({ message: "请先确认输入", type: "error" });
            return false;
          }
        });
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    cancle() {
      this.loginFlag = false;
    },
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
/deep/ .el-dialog {
  width: 350px;
}

.home {
  height: 100%;
}

.core {
  .aplayer {
    height: 66px;
  }
  width: 1200px;
  margin: 0 auto;
  height: 100%;
  display: flex;
  flex-direction: column;
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
