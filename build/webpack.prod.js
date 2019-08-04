const {smart} = require('webpack-merge')
const base = require('./webpack.base.js')
const webpack = require("webpack")
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = smart(base,{
    mode: 'production',
    //优化项
    optimization: {
        //抽离拆包
        splitChunks: {
            chunks: 'async',
            minSize: 1000000000
            // 多入口有效
            // cacheGroups: { //缓存组
            //     common: { //公共的模块
            //         chunks: 'initial',
            //         minSize: 0, //包的最小体积
            //         minChunks: 2 //被引用的次数
            //     },
            //     vendor: {
            //         priority: 1, //优先级,先抽离第三方包
            //         test: /node_modules/, //抽离第三方
            //         chunks: 'initial',
            //         minSize: 0,
            //         minChunks: 2
            //     }
            // }
        },
        minimizer: [
        //压缩js代码
            new UglifyJsPlugin({
                sourceMap: true, //源码隐射
                parallel: true, //并发打包
                uglifyOptions: {
                    ecma: 7, //支持ECMA8规范
                    drop_console: true, //移出console
                    drop_debugger: true, //移出debugger
                }
            })
        ]
    },
    plugins: [
        //判断生产还是开发环境
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify("production")
            }
        }),

        //打包文件的信息
        new webpack.BannerPlugin(
            `
                Copyright(c) 2019 liyapeng

                Licensed Under MIT

                shoppingMall @Version 1.0.0
            `
        )
    ]
})