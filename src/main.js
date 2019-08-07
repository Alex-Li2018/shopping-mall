import Vue from 'vue';
import App from './app.vue';
//引入mint-ui的样式
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
//引入路由
import router from "./router/router.js"
//引入vuex
import store from './store/index.js'
//引入全局操作的工具
import './global.js';
//rem适配
import "./config/rem.js"

Vue.use(MintUI)

new Vue({
    render: h => h(App),
    router,
    store
}).$mount('#app')