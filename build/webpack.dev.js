let { smart } = require('webpack-merge')
let base = require('./webpack.base.js')
let Webpack = require("webpack")

module.exports = smart(base,{
    mode: 'development',
    //实时打包
    watch: true,
    watchOptions: { //监控属性
        poll: 1000, //每秒 问我 1000次
        aggregateTimeout: 500, //防抖 我一直输入代码
        ignored: /node-modules/ //不需要监控那个文件
    },
    //必须安装webpack-dev-serve
    devServer: { //开发服务的配置
        port: 8080, //端口
        progress: true, //进度条
        // contentBase: '../client', //找到对应的文件夹开启服务
        compress: true, //启动压缩
        proxy: { 
            '/api': {
                target: 'http://elm.cangdu.org', //配置一个代理 访问api都代理到http://elm.cangdu.org/
                changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
                pathRewrite: {'^/api': ''} //重写接口 就是我们请求的实际接口
            }
        }
    },
    // 1) 映射源码,会单独生成一个sourcemap文件 出错了会标识当前报错的行列 大 全
    // devtool: 'source-map',
    // 2) 不会产生单独的文件但是可以显示行和列
    // devtool: 'eval-source-map',
    // 3) 不会产生列,但是是一个单独的映射文件
    // devtool: 'cheap-module-source-map',
    // 4) 不会产生文件,集成在打包后的文件中 不会产生列
    devtool: 'cheap-module-eval-source-map',
    plugins: [
        //判断生产还是开发环境
        new Webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify("development")
            }
        }), 
    ]
})
