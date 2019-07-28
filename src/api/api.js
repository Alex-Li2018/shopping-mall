//api发送请求


/**
 * 获取首页默认地址
 */

export function cityGuess(params) {
    let url = '/v1/cities'
    let data = Object.assign({},params)
    return $Http.get(url,data)
        .then(res => {
            return res.data
        })
        .catch(res => {
            return res.data
        })
} 


// /**
//  * 获取当前所在城市
//  */

// export const currentcity = number => fetch('/v1/cities/' + number);
