import Vue from 'vue';
import App from './app.vue';
import './global.js';

new Vue({
    render: h => h(App)
}).$mount('#app')