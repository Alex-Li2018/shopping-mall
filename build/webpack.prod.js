let {smart} = require('webpack-merge')
let base = require('./webpack.base.js')
let webpack = require("webpack")

module.exports = smart(base,{
    mode: 'production',
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