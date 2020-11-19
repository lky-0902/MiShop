<template>
  <div class="product">
    <ProductParams>
      <template v-slot:buy>
        <button class="btn">立即购买</button>
      </template>
    </ProductParams>
    <div class="h">123</div>
  </div>
</template>

<script>
import ProductParams from './../components/ProductParams'
export default {
  name:'product',
  components:{
    ProductParams
  }
}
</script>

<style lang="scss">
  .product{
    button{
      margin-left: 10px;
    }
    .h{
      background-color: #fdfdff;
      height: 1000px;
    }
  }
</style>