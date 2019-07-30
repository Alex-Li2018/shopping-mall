
<template>
    <div>
        <header id="header-top">
            <!-- logo -->
            <span class="logo" v-if="!goBack">ele.me</span>
            <!-- back -->
            <section class="head-goback" v-if="goBack" @click="$router.go(-1)">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">
                    <polyline points="12,18 4,9 12,0" style="fill:none;stroke:rgb(255,255,255);stroke-width:2"/>
                </svg>
            </section>
            <!-- login -->
            <router-link v-if="!goBack" :to="userInfo ? '/profile':'/login'" class="head-login">
                <span class="login">登录</span>
                <span class="split">|</span>
                <span class="register">注册</span>
            </router-link> 
            <!-- positionCity -->
            <section class="head-title ellipsis" v-if="headTitle">
                <h1>{{ headTitle }}</h1>
            </section>
            <!-- changeCity -->
            <slot name="changeCity"></slot>
        </header>
    </div>
</template>

<script>
export default {
    name: "headerTop",
    data() {
        return {
            userInfo: false, //判断路由跳转的位置
        }
    },
    props: {
        goBack: {
            type: Boolean,
            default: false
        },
        headTitle: {
            type: String,
            default: ""
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
    font-size: px2rem(12px);
    display: flex;
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
        width: px2rem(80px);
        @include ct;
        > span {
            float: right;
            height: px2rem(50px);
            font-size: px2rem(16px);
            color: #fff;
            line-height:px2rem(50px);
            
        }
    }
    .head-goback {
        height: px2rem(50px);
        line-height: px2rem(50px);
        width: px2rem(50px);
        margin-left: px2rem(10px);
        > svg {
           line-height: 1;
           text-align: center;
        }
    }
    .head-title {
        flex: 1;
        line-height: px2rem(50px);
        text-align: center;
        h1 {
            font-size: px2rem(20px);
            color: #fff;
            font-weight: 500;
        }
    }
}
</style>

