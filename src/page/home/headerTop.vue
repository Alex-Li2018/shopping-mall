
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
@import '@/style/mixin.scss';

#header-top {
    height: px2rem(50px);
    width: 100%;
    background-color: #3190e8;
    //固定定位在头部
    position: fixed;
    z-index: 100;
    left: 0;
    top: 0;
    .logo {
        left: px2rem(15px);
        font-weight: 400;
        font-size: px2rem(18px);
        line-height: px2rem(20px);
        color: #fff;
        width: px2rem(60px);
        height: px2rem(20px);
        position: absolute;
        top: 50%;
        -webkit-transform: translateY(-50%);
        -ms-transform: translateY(-50%);
        transform: translateY(-50%);
    }
    .head-login {
        right: px2rem(15px);
        line-height:px2rem(50px);
        display: inline-block;
        @include ct;
        > span {
            float: right;
            height: px2rem(50px);
            font-size: px2rem(16px);
            color: #fff;
            line-height:px2rem(50px);
            
        }
    }
}
</style>

