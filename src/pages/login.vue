<template>
  <div class="login">
    <div class="container">
      <img src="/imgs/login-logo.png" alt="" @click="gotoIndex" />
    </div>
    <div class="wrapper">
      <div class="container">
        <div class="login-form">
          <h3>
            <span class="check">账号登录</span>
            <span class="sep-line">|</span>
            <span>扫码登录</span>
          </h3>
          <div class="input">
            <input type="text" placeholder="请输入账号" v-model="username" />
          </div>
          <div class="input">
            <input
              type="password"
              placeholder="请输入密码"
              v-model="password"
            />
          </div>
          <div class="btn-box">
            <a href="javascript:;" class="btn" @click="login">登录</a>
          </div>
          <div class="tips">
            <div class="sms" @click="register">手机短信登录/注册</div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="footer-link">
        <a href="https://github.com/lky-0902">我的主页</a><span>|</span>
        <a href="https://cn.vuejs.org/">vue官网</a><span>|</span>
        <a href="https://sass.bootcss.com/documentation">sass文档</a
        ><span>|</span>
        <a href="https://element.eleme.cn/#/zh-CN">ElementUI官网</a>
      </div>
      <div class="copyright">
        Copyright ©2020 mi.futurefe.com All Rights Reserved.
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      username: "",
      password: "",
      userId: "",
    };
  },
  methods: {
    gotoIndex() {
      this.$router.push("/index");
    },
    login() {
      // 解构赋值的方法
      let { username, password } = this;
      console.log(username)
      this.axios
        .post("/user/login", {
          username,
          password,
        })
        .then((res) => {
          console.log(res)
          this.$cookie.set("userId", res.id, { expires: "Session" });
          this.$store.dispatch('saveUserName',res.username)
          this.$router.push("/index");
        });
    },
    register() {
      this.axios
        .post("/user/register", {
          username: "lky2",
          password: "lky2",
          email: "lky2@163.com",
        })
        .then((res) => {
          console.log(res)
          this.$message.success("注册成功");
        });
    },
  },
};
</script>

<style lang="scss">
@import "./../assets/scss/base.scss";
@import "./../assets/scss/mixin.scss";
@import "./../assets/scss/config.scss";
.login {
  .container {
    height: 113px;
    img {
      height: 113px;
      cursor: pointer;
    }
  }
  .wrapper {
    @include bgImg(100%, 576px, "/imgs/login-bg.jpg", auto);
    .container {
      position: relative;
      height: 576px;
      .login-form {
        width: 410px;
        height: 510px;
        background-color: $colorG;
        position: absolute;
        bottom: 29px;
        right: 0;
        padding: 0 31px;
        box-sizing: border-box;
        h3 {
          margin: 40px 0 49px;
          text-align: center;
          font-size: $fontE;
          color: $colorB;
          .check {
            color: $colorA;
          }
          .sep-line {
            margin: 0 32px;
          }
        }
        .input {
          margin-bottom: 20px;
          border: 1px solid $colorH;
          input {
            width: 100%;
            height: 100%;
            padding: 18px;
            border: none;
          }
        }
        .btn-box {
          .btn {
            display: inline-block;
            width: 100%;
            line-height: 50px;
            margin: 10px 0 0;
            font-size: $fontI;
          }
        }
        .tips {
          margin: 14px 0 0;
          .sms {
            display: inline;
            color: $colorA;
            font-size: $fontJ;
          }
        }
      }
    }
  }
  .footer {
    width: 100%;
    height: 160px;
    padding-top: 60px;
    box-sizing: border-box;
    background-color: $colorG;
    color: #999;
    font-size: 16px;
    text-align: center;
    .footer-link {
      margin-bottom: 10px;
      a {
        color: #999;
        display: inline-block;
      }
      span {
        margin: 0 10px;
      }
    }
    .copyright {
      .domain {
        color: #ff6600;
      }
    }
  }
}
</style>