import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 1. 定义 (路由) 组件。
const Home = () => import(/* webpackChunkName: "home" */ '../page/home/home.vue')

// 2. 定义路由
const routes = [
  { path: '/', redirect: "/home" },
  { path: '/home', component: Home }
]

// 3. 创建 router 实例，然后传 `routes` 配置
const router = new VueRouter({
  routes
})

export default router