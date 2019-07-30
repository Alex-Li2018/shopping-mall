
<template>
    <div>
        <!-- 头部 -->
        <header-top></header-top>
        <div class="city">
            <!-- 导航 -->
            <nav class="city-nav">
                <div class="city-tip clear">
                    <span class="left current-city">当前定位的城市</span>
                    <span class="right error-city">定位不准时,请在城市列表中选择</span>
                </div>
                <router-link :to="'/city/' + guessCityid" class="city-guess clear">
                    <span class="left position-city">{{ positionCity }}</span>
                    <span class="right">跳转</span>
                </router-link>
            </nav>
            <!-- 热门城市 -->
            <section class="hot-city">
                <h4 class="hot-city-title">热门城市</h4>
                <ul class="hot-city-list">
                    <template v-for="item in hotCity">
                        <router-link  tag="li" class="hot-city-detail" :to="'/city/' + item.id" :key="item.id">{{ item.name }}</router-link>
                    </template>
                </ul>
            </section>

            <!-- 所有城市 -->
            <section class="all-city">
                <template v-for="(item,key) in allCity">
                    <div :key="key">
                        <h4 class="all-city-title">{{ key }}</h4>
                        <ul class="all-city-list">
                            <template v-for="val in item">
                                <router-link  tag="li" class="hot-city-detail ellipsis font-color" :to="'/city/' + val.id" :key="val.id">
                                    {{ val.name }}
                                </router-link>
                            </template>
                        </ul>
                    </div>
                </template>
            </section>
        </div>
    </div>
</template>

<script>
import headerTop from "../component/headerTop.vue"
import { cityGuess } from "@/api/api"

export default {
    name: "home",
    components: {
        headerTop
    },
    mounted() {
        // this.cityGuessData()
        // this.hotCityData()
        // this.allCityData()
        this.qurryAllData()
    },
    data() {
        return {
            positionCity: "成都", //定位的城市
            guessCityid: null, //城市的id,
            hotCity: [], //热门城市
            allCity: [], //所有城市
        }
    },
    methods: {
        //---------服务-------------
        //定位的城市数据
        cityGuessData() {
            let params = {
                type: 'guess'
            }

            return cityGuess(params).then(res => {
                // this.positionCity = res.name
                // this.guessCityid = res.id
                return res
            })
        },

        //热门城市数据
        hotCityData() {
            let params = {
                type: 'hot'
            }

            return cityGuess(params).then(res => {
                // this.hotCity = res
                return res
            })
        },

        //所有城市
        allCityData() {
            let params = {
                type: 'group'
            }

            return cityGuess(params).then(res => {  
                // let sortobj = {};              
                // for (let i = 65; i <= 90; i++) {
                //     if (res[String.fromCharCode(i)]) {
                //         sortobj[String.fromCharCode(i)] = res[String.fromCharCode(i)];
                //     }
                // }
                // this.allCity = sortobj
                return res
            })
        },

        //查询所有数据
        qurryAllData() {
            Promise.all([this.cityGuessData(),this.hotCityData(),this.allCityData()]).then(res => {
                //数组的第一个元素
                this.positionCity = res[0].name
                this.guessCityid = res[0].id
                //数组的第二个元素
                this.hotCity = res[1]
                //数组第三个元素
                let sortobj = {};              
                for (let i = 65; i <= 90; i++) {
                    if (res[2][String.fromCharCode(i)]) {
                        sortobj[String.fromCharCode(i)] = res[2][String.fromCharCode(i)];
                    }
                }
                this.allCity = sortobj
            })
        }
    }    
}
</script>

<style lang="scss" scoped>
@import '@/style/mixin.scss';

.city {
    position: relative;
    top: px2rem(50px);
}
.city-nav {
    // position: relative;
    width: 100%;
    font-size: px2rem(12px);
    .city-tip {
        border-top: px2rem(1px) solid #e4e4e4;
        border-bottom: px2rem(1px) solid #e4e4e4;
        height: px2rem(40px);
        line-height: px2rem(40px);
        padding: 0 px2rem(10px);
    }
    .current-city {
        font-size: px2rem(15px);
        color: #666;
    }
    .error-city {
        font-size: px2rem(12px);
        color: #9f9f9f;
        font-weight: px2rem(900px);
    }
    .city-guess {
        width: 100%;
        border-bottom: px2rem(1px) solid #e4e4e4;
        padding: 0 px2rem(10px);
        display: inline-block;
        > span {
            width: 50%;
            height: px2rem(40px);
            line-height: px2rem(40px);
            font-size: px2rem(16px);
        }
        .position-city {
            color: #3190e8;
        }
    }
}
.hot-city {
    width: 100%;
    // .hot-city-detail {
    //     font-size: px2rem(14px);
    // }
}
.all-city {
   border-bottom: px2rem(1px) solid #e4e4e4;
   margin-bottom: px2rem(2px); 
}
.all-city-title,
.hot-city-title {
    padding-left: px2rem(10px);
    height: px2rem(40px);
    line-height: px2rem(40px);
    color: #666;
    font-weight: 400;
    font-size: px2rem(14px);
    border-top: px2rem(2px) solid #e4e4e4;
    border-bottom: px2rem(1px) solid #e4e4e4;
    margin-top: px2rem(10px);
}
.all-city-list,
.hot-city-list {
    display: flex;
    flex-wrap: wrap;
    > li {
        width: 25%;
        height: px2rem(45px);
        line-height: px2rem(45px);
        text-align: center;
        border-bottom: px2rem(1px) solid #e4e4e4;
        border-right: px2rem(1px) solid #e4e4e4;
        color: #3190e8;
        font-size: px2rem(14px);
        &:nth-of-type(4n) {
            border-right: none; 
        }
    }
}
.font-color {
    color: #666 !important;
}
</style>

