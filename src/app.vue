<template>
    <keep-alive>
        <router-view></router-view>
    </keep-alive>
</template>
<script>
    export default {
        data(){
            return {
                
            }
        }
    }
</script>
<style lang="scss">
    //引入公共文件
    @import "./style/common.scss";
    @import "./style/mixin.scss";
</style>