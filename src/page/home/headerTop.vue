
<template>
    <div>
        <header id="header-top">
            <!-- logo -->
            <span class="logo">ele.me</span>
            <!-- login -->
            <router-link :to="userInfo ? '/profile':'/login'" class="head-login">
                <span class="login">登录</span>
                <span class="split">|</span>
                <span class="register">注册</span>
            </router-link>                
        </header>
    </div>
</template>

<script>
export default {
    data() {
        return {
            userInfo: false, //判断路由跳转的位置
        }
    },
    methods: {

    }
}
</script>

<style lang="scss" scoped>
@import '@/style/mixin';

#header-top {
    height: 50px;
    width: 100%;
    background-color: #3190e8;
    //固定定位在头部
    position: fixed;
    z-index: 100;
    left: 0;
    top: 0;
    .logo {
        left: 15px;
        font-weight: 400;
        font-size: 18px;
        line-height: 20px;
        color: #fff;
        width: 60px;
        height: 20px;
        position: absolute;
        top: 50%;
        -webkit-transform: translateY(-50%);
        -ms-transform: translateY(-50%);
        transform: translateY(-50%);
    }
    .head-login {
        right: 15px;
        position: absolute;
        @include ct;
        > span {
            font-size: 16px;
            color: #fff;
        }
    }
}
</style>

