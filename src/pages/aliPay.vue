<template>
  <div class="ali-pay">
    <Loading v-if="loading"></Loading>
    <div class="form" v-html="content"></div>
  </div>
</template>

<script>
import Loading from './../components/Loading'
export default {
  name:'ali-pay',
  components:{
    Loading
  },
  data() {
    return {
      orderId:this.$route.query.orderId,
      content:'',
      loading:true
    }
  },
  mounted() {
    this.paySubmit()
  },
  methods: {
    paySubmit(){
      this.axios.post('/pay',{
        orderId:this.orderId,
        orderName:'Vue高仿小米商城',
        amount:0.01, //单位元
        payType:1  //1.支付宝 2.微信
      }).then(res => {
        //接收支付宝传回的form表单代码
        this.content = res.content
        setTimeout(() => {
          // 提交form表单
          document.forms[0].submit()
        },100)
      })
    }
  },
}
</script>