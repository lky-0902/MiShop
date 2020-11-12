<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import storage from './storage'
export default {
  data() {
    return {
      res:{}
    }
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
  },
}
</script>

<style>
@import './assets/scss/reset.scss';

</style>
