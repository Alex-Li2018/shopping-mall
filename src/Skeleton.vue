<template>
  <div class="skeleton page">
    <div class="skeleton-nav"></div>
    <div class="skeleton-swiper"></div>
    <ul class="skeleton-tabs">
      <li v-for="i in 8" class="skeleton-tabs-item"><span></span></li>
    </ul>
    <div class="skeleton-banner"></div>
    <div v-for="i in 4" class="skeleton-productions"></div>
    <ul class="skeleton-tabs">
      <li v-for="i in 8" class="skeleton-tabs-item"><span></span></li>
    </ul>
    <div class="skeleton-swiper"></div>
    <div class="skeleton-nav"></div>
  </div>
</template>

<style>
  .skeleton {
    position: fixed;
    height: 100%;
    overflow: hidden;
    padding: 15px;
    box-sizing: border-box;
    background: #fff;
    width: 98%;
    top: 0;
  }
  .skeleton-nav {
    height: 110px;
    background: #eee;
    margin-bottom: 15px;
  }
  .skeleton-swiper {
    height: 440px;
    background: #eee;
    margin-bottom: 15px;
  }
  .skeleton-tabs {
    list-style: none;
    padding: 0;
    margin: 0 -15px;
    display: flex;
    flex-wrap: wrap;
  }
  .skeleton-tabs-item {
    width: 22%;
    height: 80px;
    box-sizing: border-box;
    text-align: center;
    margin-bottom: 15px;
  }
  .skeleton-tabs-item span {
    display: inline-block;
    width: 80px;
    height: 80px;
    border-radius: 55px;
    background: #eee;
  }
  .skeleton-banner {
    height: 250px;
    background: #eee;
    margin-bottom: 15px;
  }
  .skeleton-productions {
    height: 50px;
    margin-bottom: 15px;
    background: #eee;
  }
</style>