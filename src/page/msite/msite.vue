<template>
    <div>
        <header-top :headTitle="headTitle" :goBack="false"></header-top>
        <!-- 轮播图 -->
        <div class="msite-swiper">
            <mt-swipe :auto="0">
                <mt-swipe-item>
                    <template v-for="item in pageOne">
                        <div class="msite-swiper-item" :key="item.id">
                            <img :src="imgBaseUrl + item.image_url" class="item-img" />
                            <p class="item-text">{{ item.title }}</p>
                        </div>
                    </template>
                </mt-swipe-item>
                <mt-swipe-item>
                    <template v-for="item in pageTwo">
                        <div class="msite-swiper-item" :key="item.id">
                            <img :src="imgBaseUrl + item.image_url" class="item-img" />
                            <p class="item-text">{{ item.title }}</p>
                        </div>
                    </template>
                </mt-swipe-item>
            </mt-swipe>
        </div>
        <!-- 商品列表 -->
        <section class="shop-list">
            <div class="near-shop">附近商家</div>
            <ul class="shop-container">
                <template v-for="item in shopList">
                    <li class="shop-item">
                        <img :src="imgBaseUrl + item.image_path" class="shop-img" />
                        <section class="shop-text">
                            <header class="title">
                                <span class="banner">{{ "品牌" }}</span>
                                <h5 class="name ellipsis">{{ item.name }}</h5>
                                <span class="tip">{{ "保准票" }}</span>
                            </header>
                            <div class="sale">
                                <span class="rating-count">{{ "月售" + item.rating_count + "单" }}</span>
                                <span class="time">
                                    <em>{{ "蜂鸟专送" }}</em>
                                    <em>{{ "准时达" }}</em>
                                </span>
                            </div>
                            <div class="goods-info">
                                <span class="price">
                                    <i>{{ "$" + item.float_minimum_order_amount + '元起送/' }}</i>
                                    <i>{{ "配送费约$" + item.float_delivery_fee + '元'}}</i>
                                </span>
                                <span>
                                    <i>{{ item.distance + "/" + item.order_lead_time }}</i>
                                </span>
                                <span class="min"></span>
                            </div>
                        </section>
                    </li>
                </template>
            </ul>
        </section>
    </div>
</template>

<script>
import headerTop from "@component/headerTop.vue";
import { getSearchContentCity,getSwiperData,getShopList } from "@/api/api"
import { Swipe, SwipeItem } from 'mint-ui';

export default {
    name: 'msite',
    components: {
        headerTop
    },
    data() {
        return {
          imgBaseUrl: 'https://fuss10.elemecdn.com/',
          headTitle: "", 
          pageOne: [], //轮播第一页的数据
          pageTwo: [], //轮播第二页的数据 
          shopList: [], //商品列表
        }
    },
    created() {
        this.getSearchContentCityData()
        this.getSwiper()
        this.getShopListData()
    },
    methods: {
        //获取标题的城市数据
        async getSearchContentCityData() {
            let geohash = this.$route.query.geohash
            let res = await getSearchContentCity(geohash)
            let { name } = res
            this.headTitle = name + name
        },
        //获取轮播图数据
        async getSwiper() {
            let params = {
                geohash: this.$route.query.geohash,
                group_type: 1,
                "flags[]": "F"
            }
            let res = await getSwiperData(params)
            this.pageOne = JSON.parse(JSON.stringify(res)).splice(0,8)         
            this.pageTwo = JSON.parse(JSON.stringify(res)).splice(8,res.length - 1)
        },
        //获取商品的列表
        async getShopListData() {
            let latitude = this.$route.query.geohash.split(",")[0]
            let longitude = this.$route.query.geohash.split(",")[0]

            let params = {
                latitude: latitude,
                longitude: longitude,
                offset: 0,
                limit: 20,
                'extras[]': 'activities',
                keyword: '',
                'restaurant_category_id':　"",
                'restaurant_category_ids[]': "",
                "order_by": '',
                'delivery_mode[]': "",
            }

            let res = await getShopList(params)
            this.shopList = res
            console.log(res)
        }    
    }
}
</script>

<style>
.mint-swipe-indicators {
    bottom: -20px;
}
</style>

<style lang="scss" scoped>
@import '@/style/mixin.scss';

.msite-swiper {
    margin-top: px2rem(50px);
    height: px2rem(200px);
    border-bottom: 1px solid #e4e4e4;
    position: relative;
    
}
.mint-swipe-item {
    display: flex !important;
    flex-wrap: wrap;
}

.msite-swiper-item {
    width: 25%;
    height: px2rem(80px);
    display: flex;
    flex-direction: column;
    .item-img {
        width: px2rem(50px);
        height: px2rem(50px);
        margin: 0 auto;
    }
    .item-text {
        text-align: center;
        font-size: px2rem(16px);
        color: #666;
    }
}
.shop-list {
    margin-top: px2rem(10px);
    padding: 0 px2rem(10px);
    border-top: px2rem(1px) solid #e4e4e4;
    .near-shop {
        font-size: px2rem(16px);
        line-height: px2rem(30px);
    }
}
.shop-container {
    // margin-top: px2rem(20px);
    width: 100%;
    .shop-item {
        height: px2rem(120px);
        padding: px2rem(20px) 0;
        font-size: px2rem(16px);
        width: 100%;
        display: flex;
        border-bottom: px2rem(1px) solid #e4e4e4;
    }
    .shop-img {
        height: px2rem(70px);
        width: px2rem(70px);
        margin-right: px2rem(10px); 
    }
    .shop-text {
        // display: flex;
        // flex-direction: column;
        // justify-content: space-between;
        // width: 100%;
        flex: 1;
        .title {
            display: flex;
            justify-content: space-between;
            width: 100%;
            height: 25px;
            line-height: 25px;
            .banner {
                width: px2rem(30px);
                background-color: yellow;
                font-size: px2rem(14px);
                border-radius: 4px;
                text-align: center;
            }
            .name {
                flex: 1;
                margin-left: px2rem(5px);
                font-size: px2rem(20px);
                font-weight: 600;
            }
            .tip {
                width: 50px;
                font-size: px2rem(12px);
                color: #333;
            }
        }
        .sale {
            margin-top: px2rem(15px);
            display: flex;
            justify-content: space-between;
            > span {
                font-size: px2rem(12px);
            }
            .time {
                transform: scale(0.7);
            }
            em {
                font-style: normal;
                font-size: px2rem(8px);
                border-radius: 4px;
                &:nth-of-type(1) {
                    color: #fff;
                    background-color: #3190e8;
                    border: 0.025rem solid #3190e8;
                }
                &:nth-of-type(2) {
                    color: #3190e8;
                    border: 0.025rem solid #3190e8;
                }
            }
        }
        .goods-info {
            margin-top: px2rem(15px);
            display: flex;
            justify-content: space-between;
            >span {
                font-size: px2rem(12px);
            }
        }
    }
}
</style>
