<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import storage from "./storage";
export default {
  data() {
    return {
      res: {},
    };
  },
  mounted() {
    // storage试用
    // storage.setItem('a',1)
    // storage.setItem('user',{a:1})
    // storage.setItem('abc',{a:1},'user')
    // storage.clear('a')

    // 本地集成mockjs实现数据mock
    // this.axios.get('/user/login').then(res =>{
    //   this.res = res
    //   console.log(res)
    // })
    if (this.$cookie.get("userId")) {
      this.getUser();
      this.getCartCount();
    }
  },
  methods: {
    // 给res设置默认值，防止未登录显示错误
    getUser() {
      this.axios.get("/user").then((res = {}) => {
        this.$store.dispatch("saveUserName", res.username);
      });
    },
    getCartCount() {
      this.axios.get("/carts/products/sum").then((res = 0) => {
        console.log("zzz" + res);
        this.$store.dispatch("saveCartCount", res);
      });
    },
  },
};
</script>

<style lang='scss'>
/* 这里不带后缀会报错 ,这里顺序不能错*/
@import "./assets/scss/reset.scss";
@import "./assets/scss/config.scss";
@import "./assets/scss/button.scss";
</style>
