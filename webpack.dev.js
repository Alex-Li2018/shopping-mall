
let { smart } = require('webpack-merge')
let base = require('./webpack.base.js')

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
        port: 8000, //端口
        progress: true, //进度条
        contentBase: './client', //找到对应的文件夹开启服务
        compress: true, //启动压缩
        proxy: { //请求的接口是 '/api/user'
            '/api': 'http://localhost:5000/' //配置一个代理 访问api都代理到3000端口
        }

        // proxy: {
        //     '/api': {
        //         target: 'http://localhost:3000',
        //         reWrite: {'/api': ''} //重写这个接口 就是我们请求的实际接口
        //     }
        // }
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

    ]
})
