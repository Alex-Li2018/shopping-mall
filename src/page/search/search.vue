
<template>
    <div class="search">
        <header-top :headTitle="headTitle" :goBack="true">
            <template v-slot:changeCity>
                <router-link :to="'/home'">
                    <section class="head-change-city">{{ "切换城市" }}</section>
                </router-link>
            </template>
        </header-top>
        <div class="search-input">
            <mt-search
                v-model="value"
                cancel-text="取消"
                placeholder="请输入商城,饭馆或周边街道">
            </mt-search>
            <mt-button @click.native="searchData" type="primary">提交</mt-button>
        </div>
        <!-- 搜索历史 -->
        <div class="search-history" v-if="searchHistoryFlag">搜索历史</div>
        <!-- 搜索历史列表 -->
        <ul class="search-history-list" v-if="searchHistoryFlag">
            <template v-for="item in searchHistoryList">
                <li :key="item.id" class="list">
                    <h4 class="search-name ellipsis">{{ item.name }}</h4>
                    <p class="search-addr ellipsis">{{ item.address }}</p>
                </li>
            </template>
            <li class="remove-history" @click="removeHistory">清空历史数据</li>
        </ul>
        <!-- 搜索目标列表 -->
        <ul class="search-list">
            <template v-for="item in searchList">
                <li :key="item.id" class="list" @click="detailData(item)">
                    <h4 class="search-name ellipsis">{{ item.name }}</h4>
                    <p class="search-addr ellipsis">{{ item.address }}</p>
                </li>
            </template>
        </ul>
    </div>
</template>

<script>
import { Toast } from 'mint-ui';
import headerTop from "../component/headerTop.vue";
import { currentCity,searchtarget } from "@/api/api"
import * as lc from "../../until/localstorage.js"

export default {
    name: "search",
    components: {
        headerTop
    },
    data() {
        return {
            value: "", //查询的数据
            headTitle: "", //当前城市名称
            searchList: [], //搜索历史
            searchHistoryFlag: true, //搜索历史lc.queryLocalStorage('searchHistory')标志
            searchHistoryList: [], //搜索历史列表
        }
    },
    created() {
        this.queryCurrentCity()
    },
    mounted() {
        this.querysearchHistoryList()
    },
    methods: {
        queryCurrentCity() {
            let id = this.$route.params.id
            console.log(id)
            currentCity(id).then(res => {
                let { name } = res
                this.headTitle = name
            }) 
        },
        //搜索数据
        async searchData() {
            let params = {
                city_id: this.$route.params.id,
                keyword: this.value,
                type: 'search'
            }
            
            let res = await searchtarget(params)
            if(res.length) {
                res.forEach((_,index) => {
                    _.id = index
                })
                this.searchList = res
                this.searchHistoryFlag = false
            }else {
                //弹框提示
                Toast({
                    message: '请输入正确信息',
                    position: 'center',
                    duration: 1000
                });
            }
        },
        //获取详情数据
        detailData(item) {
            //操作localstorage
            lc.addlocalStorage(item)
            //路由跳转
            this.router.push({ name: 'msite', query: { geohash: '123' }}) // -> /user/123
        },
        //获取搜索的历史列表
        querysearchHistoryList() {
            this.searchHistoryList = JSON.parse(lc.queryLocalStorage('searchHistory'))
        },
        //清空历史数据
        removeHistory() {
            lc.clearHistory('searchHistory')
            this.querysearchHistoryList()
        }
    }
}
</script>

<style lang="scss">
@import '@/style/mixin.scss';

.search {
    .mint-search {
        height: 100%;
    }
    .mint-searchbar {
        background-color: #fff;
    }
    .mint-searchbar-inner {
        padding: 0 px2rem(6px);
        border: px2rem(1px) solid #e4e4e4;
        border-radius: px2rem(2px);
    }
    .mint-searchbar-inner .mintui-search {
        font-size: px2rem(12px);
        margin-right: px2rem(10px);
    }
    .mint-searchbar-cancel {
        font-size: px2rem(12px);
        margin-left: px2rem(10px);
    }
    .mint-button--normal {
        width: 95%;
        margin: 0 px2rem(10px) px2rem(5px);
        font-size: px2rem(18px);
        height: px2rem(41px);
        position: absolute;
    }
    .mint-search-list {
        display: none;
    }
}
</style>


<style lang="scss" scoped>
@import '@/style/mixin.scss';

.head-change-city {
    width: px2rem(100px);
    height: px2rem(50px);
    line-height: px2rem(50px);
    text-align: center;
    font-size: px2rem(16px);
    color: #fff;
}
.search-input {
    margin-top: px2rem(60px);
}

.search-history {
    margin: px2rem(60px) 0 0 px2rem(10px);
    font-size: px2rem(12px);
    line-height: px2rem(20px);
    border-top: px2rem(1px) solid #e4e4e4;
    border-bottom: px2rem(1px) solid #e4e4e4;
}

.search-history-list,
.search-list {
    margin-top: px2rem(50px);
    .list {
        height: px2rem(80px);
        width: 100%;
        padding: px2rem(10px);
        .search-name {
            color: #333;
            font-size: px2rem(16px);
            line-height: px2rem(30px);
            text-align: left;
        }
        .search-addr {
            color: #999;
            font-size: px2rem(10px);
            line-height: px2rem(30px);
            text-align: left;
        }
    }
}

.search-history-list {
    margin-top: px2rem(20px);
    .remove-history {   
        margin-top: px2rem(20px);
        width: 100%;
        line-height: px2rem(20px);
        font-size: px2rem(16px);
        text-align: center;
    }
}

</style>
