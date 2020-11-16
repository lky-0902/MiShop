<template>
  <div>
    <order-header></order-header>
    cart
    <service-bar></service-bar>
    <nav-footer></nav-footer>
  </div>
</template>

<script>
import OrderHeader from '../components/OrderHeader'
import NavFooter from '../components/NavFooter'
import ServiceBar from "../components/ServiceBar";
export default {
  name:'cart',
  components:{
    OrderHeader,
    NavFooter,
    ServiceBar
  }
}
</script>