//预防xss攻击的工具函数
import { xssDefenseUncode, xssDefenseEncode } from '../xssDefense/xssDefense.js'

//api发送请求

/**
 * 获取首页默认地址
 */
export function cityGuess(params) {
    let url = 'v1/cities';
    let data = Object.assign({},params);
    return $Http.get(url,data)
        .then(res => {
            return res.data;
        })
        .catch(res => {
            return res.data;
        })
} 


/**
 * 获取当前所在城市
 */
export function currentCity(id) {
    let url = `v1/cities/${id}`;
    return $Http.get(url)
        .then(res => {
            return res.data;
        })
        .catch(res => {
            return res.data;
        })
}

/**
 * 获取搜索的数据(为了防止XSS攻击,处理输入的字符串)
 */
export function searchtarget(params) {
    let url = `v1/pois`;
    //处理keyword关键字,防止xss攻击
    params.keyword = xssDefenseEncode(params.keyword)

    let data = Object.assign({},params);
    return $Http.get(url,data)
        .then(res => {
            return res.data;
        })
        .catch(res => {
            return res.data;
        })
}

/**
 * 登录或注册
 */
export function accountLogin(params) {
    let url = `v2/login`;
    let data = Object.assign({},params);
    return $Http.post(url,data)
        .then(res => {
            return res.data;
        })
        .catch(res => {
            return res.data;
        })
}

/**
 * 获取验证码
 */
export function getCaptchas() {
    let url = `v1/captchas`;
    let data = Object.assign({});
    return $Http.post(url,data)
        .then(res => {
            return res.data;
        })
        .catch(res => {
            return res.data;
        })
}

/**
 * 获取所搜内容城市的名称
 */
export function getSearchContentCity(params) {
    let url = `v2/pois/${ params }`;
    let data = Object.assign({});
    return $Http.get(url,data)
        .then(res => {
            return res.data;
        })
        .catch(res => {
            return res.data;
        })
}

/**
 * 获取轮播图数据
 */
export function getSwiperData(params) {
    let url = `v2/index_entry`;
    let data = Object.assign({},params);
    return $Http.get(url,data)
        .then(res => {
            return res.data;
        })
        .catch(res => {
            return res.data;
        })
}

/**
 * 获取商品信息
 */

export function getShopList(params) {
    let url = `shopping/restaurants`;
    let data = Object.assign({},params);
    return $Http.get(url,data)
        .then(res => {
            return res.data;
        })
        .catch(res => {
            return res.data;
        })
}
 
