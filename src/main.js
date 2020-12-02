import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueLazyLoad from 'vue-lazyload'
import VueCookie from 'vue-cookie'
import {
  Message
} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';

//这里不能用import引入，因为import是预编译加载，直接就拦截了，但是我们现在需要的是当mock = true才 拦截，所以用require
const mock = false
if (mock) {
  require('./mock/api')
}

// 根据前端的跨域方式做调整
axios.defaults.baseURL = '/api'
axios.defaults.timeout = 8000
// 拦截器 接口错误拦截
axios.interceptors.response.use(function (response) {
  let res = response.data;
  let path = location.hash;
  if (res.status == 0) { //成功
    return res.data
  } else if (res.status == 10) { //未登录报错
    if (path != '#/index') {
      window.location.href = '/#/login'
    }
    return Promise.reject(res)
  } else { //其他报错
    this.$message.warning(res.msg)
    return Promise.reject(res)
  }
}, (error) => {
  let res = error.response
  Message.error(res.data.message)
  return Promise.reject(error)
})


Vue.use(VueAxios, axios)
Vue.use(VueCookie)
Vue.use(VueLazyLoad, {
  loading: '/imgs/loading-svg/loading-bars.svg'
})
Vue.prototype.$message = Message
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')