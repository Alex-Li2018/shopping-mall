//api发送请求


/**
 * 获取首页默认地址
 */
export function cityGuess(params) {
    let url = 'v1/cities'
    let data = Object.assign({},params)
    return $Http.get(url,data)
        .then(res => {
            return res.data
        })
        .catch(res => {
            return res.data
        })
} 


/**
 * 获取当前所在城市
 */
export function currentCity(id) {
    let url = `v1/cities/${id}`
    return $Http.get(url)
        .then(res => {
            return res.data
        })
        .catch(res => {
            return res.data
        })
}

/**
 * 获取搜索的数据
 */

export function searchtarget(params) {
    let url = `v1/pois`
    let data = Object.assign({},params)
    return $Http.get(url,data)
        .then(res => {
            return res.data
        })
        .catch(res => {
            return res.data
        })
}