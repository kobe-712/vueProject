import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './assets/css/base.css'
import axios from 'axios'

// 用axios发起ajax请求，将请求回来的数据挂载到$http上
Vue.prototype.$http = axios
// 请求配置的根路径
axios.defaults.baseURL = 'https://www.liulongbin.top:8888/api/private/v1/'

// axios请求拦截
axios.interceptors.request.use((config) => {
  // 为请求头对象，添加token验证的Authorization字段
  config.headers.Authorization = window.sessionStorage.getItem('token')
  // 固定格式，结束必须return config
  return config
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
