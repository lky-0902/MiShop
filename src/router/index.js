import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../pages/home.vue'
import Index from '../pages/index.vue'
import Product from '../pages/product.vue'
import Detail from '../pages/detail.vue'
import Order from '../pages/order.vue'
import OrderList from '../pages/orderList.vue'
import OrderConfirm from '../pages/orderConfirm.vue'
import OrderPay from '../pages/orderPay.vue'
import Cart from '../pages/cart.vue'
import AliPay from '../pages/aliPay.vue'
Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    name:'home',
    component:Home,
    redirect:'/index',
    children:[
      {
        path:'/index',
        name:'index',
        component:Index
      },
      {
        path:'/product',
        name:'product',
        component:Product
      },
      {
        path:'/detail',
        name:'detail',
        component:Detail
      }
    ]
  },
  {
    path:'/order',
    name:'order',
    component:Order,
    children:[
      {
        path:'list',
        name:'list',
        component:OrderList
      },
      {
        path:'confirm',
        name:'confirm',
        component:OrderConfirm
      },
      {
        path:'pay',
        name:'pay',
        component:OrderPay
      },
      {
        path:'alipay',
        name:'alipay',
        component:AliPay
      }
    ]
  },
  {
    path:'/cart',
    name:'cart',
    component:Cart
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
