import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/components/Login.vue'
import Home from '@/components/Home.vue'
import Welcome from '@/components/Welcome.vue'
import User from '@/components/user/User.vue'

Vue.use(VueRouter)

const routes = [{
  path: '/',
  redirect: '/login'
},
{
  path: '/login',
  component: Login
},
{
  path: '/home',
  component: Home,
  redirect: '/welcome',
  // 在home页面中出现的子路由
  children: [{
    path: '/welcome',
    component: Welcome
  },
  {
    path: '/users',
    component: User
  }
  ]
}
]

const router = new VueRouter({
  routes
})
// 挂载路由守卫
router.beforeEach((to, from, next) => {
  /* to 将要访问的路径
    from 代表从哪个路径跳转而来
    next 是一个函数，代表放行
   */
  // next() 放行    next('/login') 强制跳转
  if (to.path === '/login') return next()
  // 获取token
  const tokenData = window.sessionStorage.getItem('token')
  // 如果没有token值，则强制跳转到login页面，有的话就放行
  if (!tokenData) return next('/login')
  next()
})

export default router
