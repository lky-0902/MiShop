import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../pages/home.vue'
import Index from '../pages/index.vue'
// import Product from '../pages/product.vue'
// import Detail from '../pages/detail.vue'
// import Order from '../pages/order.vue'
// import OrderList from '../pages/orderList.vue'
// import OrderConfirm from '../pages/orderConfirm.vue'
// import OrderPay from '../pages/orderPay.vue'
// import Login from '../pages/login.vue'
// import Cart from '../pages/cart.vue'
// import AliPay from '../pages/aliPay.vue'
Vue.use(VueRouter)

/**
 * 路由懒加载方案一：
 * component:resolve => require(['../pages/product.vue'],resolve)
 * 路由懒加载方案二：
 *  安装插件npm i @babel/plugin-syntax-dynamic-import --save
 *  component:() => import('../pages/order.vue'),
 */



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
        path:'/product/:id',
        name:'product',
        component:resolve => require(['../pages/product.vue'],resolve)
      },
      {
        path:'/detail/:id',
        name:'detail',
        component:resolve => require(['../pages/detail.vue'],resolve)
      }
    ]
  },
  {
    path:'/order',
    name:'order',
    component:() => import('../pages/order.vue'),
    children:[
      {
        path:'list',
        name:'list',
        component:() => import('../pages/orderList.vue'),
      },
      {
        path:'confirm',
        name:'confirm',
        component:() => import('../pages/orderConfirm.vue'),
      },
      {
        path:'pay',
        name:'pay',
        component:() => import('../pages/orderPay.vue'),
      },
      {
        path:'alipay',
        name:'alipay',
        component:() => import('../pages/aliPay.vue'),
      }
    ]
  },
  {
    path:'/login',
    name:'login',
    component:resolve => require(['../pages/login.vue'],resolve)
  },
  {
    path:'/cart',
    name:'cart',
    component:() => import('../pages/cart.vue'),
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
