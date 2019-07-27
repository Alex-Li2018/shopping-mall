<template>
    <h1>Hello {{ msg }}</h1>
</template>
<script>
    export default {
        data(){
            return {
                msg: 'Vue.js'
            }
        }
    }
</script>
<style scoped>
    h1{
        font-family: 'Courier New';
        color: red;
    }
</style>