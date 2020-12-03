import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../pages/home.vue'
import Index from '../pages/index.vue'
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
        component:() => import('../pages/product.vue')
      },
      {
        path:'/detail/:id',
        name:'detail',
        component:() => import('../pages/detail.vue')
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
        component:() => import('../pages/orderList.vue')
      },
      {
        path:'confirm',
        name:'confirm',
        component:() => import('../pages/orderConfirm.vue')
      },
      {
        path:'pay',
        name:'pay',
        component:() => import('../pages/orderPay.vue')
      },
      {
        path:'alipay',
        name:'alipay',
        component:() => import('../pages/aliPay.vue')
      }
    ]
  },
  {
    path:'/login',
    name:'login',
    component:() => import('../pages/login.vue')
  },
  {
    path:'/cart',
    name:'cart',
    component:() => import('../pages/cart.vue')
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
