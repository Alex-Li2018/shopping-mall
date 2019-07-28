import axios from 'axios'

// 创建axios实例
var instance = axios.create({    timeout: 1000 * 12});

//判断环境变量
if(process.env.NODE_ENV == 'development') {
    instance.defaults.baseURL = 'http://elm.cangdu.org'
}else if(process.env.NODE_ENV == 'production') {
    instance.defaults.baseURL = ''
}

// post请求头
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

//封装http请求
const $Http = {
    //get请求
    get(url, params) {    
        return new Promise((resolve, reject) =>{        
            instance.get(url, {            
                params: params        
            }).then(res => {
                resolve(res);
            }).catch(err =>{
                reject(err)        
            })    
        });
    },
    //post请求
    post(url, params) {
        return new Promise((resolve, reject) => {
            instance.post(url, params)
            .then(res => {
                resolve(res);
            })
            .catch(err =>{
                reject(err)
            })
        });
    }
}

export default $Http