import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getter'
import mutations from './Mutation'
import actions from './action'

Vue.use(Vuex)

const state = {
    userInfo: null, //用户信息
} 

const store = new Vuex.Store({
    state,
    getters,
    mutations,
    actions,

})

export default store