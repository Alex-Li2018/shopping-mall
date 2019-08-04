import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 1. 定义 (路由) 组件。
const Home = () => import(/* webpackChunkName: "home" */ '../page/home/home.vue');
const City = () => import(/* webpackChunkName: "city" */ '../page/search/search.vue');
const Login = () => import(/* webpackChunkName: "login" */ '../page/login/login.vue');
const Msite = () => import(/* webpackChunkName: "login" */ '../page/msite/msite.vue');

// 2. 定义路由
const routes = [
  { path: '/', redirect: "/home" },
  { path: '/home', name: 'Home', component: Home },
  //动态路由配置
  { path: '/city/:id', name: 'City', component: City },
  { path: '/login', name: 'Login', component: Login },
  { path: '/msite', name: 'Msite', component: Msite }
]

// 3. 创建 router 实例，然后传 `routes` 配置
const router = new VueRouter({
  routes
})

export default router