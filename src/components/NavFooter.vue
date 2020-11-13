<template>
  <div>
    <div class="footer">
      <div class="footer-logo">
        <img src="/imgs/logo-footer.png" alt="">
        <p>小米商城</p>
      </div>
      <div class="footer-link">
        <a href="https://github.com/lky-0902">我的主页</a><span>|</span>
        <a href="https://cn.vuejs.org/">vue官网</a><span>|</span>
        <a href="https://sass.bootcss.com/documentation">sass文档</a><span>|</span>
        <a href="https://element.eleme.cn/#/zh-CN">ElementUI官网</a>
      </div>
      <div class="copyright">
        Copyright ©2020 <span class="domain">mi.futurefe.com</span> All Rights Reserved.
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:'nav-footer'
}
</script>

<style lang="scss" scoped>
  .footer{
    height: 234px;
    border-top: 4px solid #ff6600;
    background-color: #333;
    color: #999;
    font-size: 16px;
    text-align: center;
    .footer-logo{
      margin-top: 46px;
      margin-bottom: 31px;
      img{
        width: 53px;
        height: 36px;
        margin-bottom: 13px;
      }
    }
    .footer-link{
      margin-bottom: 10px;
      a{
        color: #999;
        display: inline-block;
      }
      span{
        margin:0 10px;
      }
    }
    .copyright{
      .domain{
        color: #ff6600;
      }
    }
  }
</style>