let {smart} = require('webpack-merge')
let base = require('./webpack.base.js')

module.exports = smart(base,{
    mode: 'production',
    plugins: [
        // //判断生产还是开发环境
        // new webpack.DefinePlugin({
        //     DEV: JSON.stringify('production'), //环境 JSON.stringify('dev')
        //     FLAG: true,
        //     EXPORESSION: JSON.stringify("1+1")
        // })
    ]
})