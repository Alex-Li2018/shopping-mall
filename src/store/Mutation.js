import {
    GET_USERINFO,
    RECORD_USERINFO
} from './mutation-types'

export default {
    //记录用户信息
    [RECORD_USERINFO](state,user) {
        state.userInfo = user
    }
}