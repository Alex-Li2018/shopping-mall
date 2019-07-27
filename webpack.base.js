const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin') //把打包后的结果插入到模板中
const { CleanWebpackPlugin } = require('clean-webpack-plugin') //每次打包都删除dist目录
const VueLoaderPlugin = require('vue-loader/lib/plugin'); //vue-loader15.*之后,必须配合这个plugin

module.exports = {
    entry: './src/main.js',
    output: {
        filename: 'app.js',
        path: path.resolve(__dirname,'dist')
    },
    module: {
        //loader的执行顺序是从下到上,从右到左
        rules: [
            // js语法规范
            {
                test: /\.js$/,
                use: [
                   {
                        loader: 'eslint-loader',
                        options: {
                            enforce: 'pre' //前置loader pre 后置loader post 
                        }
                   }
                ] 
            },
            //es6的语法处理
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            //预设 用babel把es6转为es5
                            presets: ['@babel/preset-env'],
                            plugins: [
                                ["@babel/plugin-proposal-class-properties", { "loose": true }], //支持class语法
                                "@babel/plugin-transform-runtime", //支持promise的语法 Generator语法
                                "@babel/plugin-syntax-dynamic-import" //支持import()函数
                            ]
                        }
                    }
                ],
                include: path.resolve(__dirname,'src'), //包括src下面的js
                exclude: /node_modules/ //排除那些js 
            },
            //解析css文件,因为webpack只能打包js,所以需要loader来实现打包css
            //style-loader,将打包的css以style标签的形势插入页面
            {
                test: /\.css$/,
                loader: ['style-loader','css-loader']
            },
            //处理scss文件
            {
                test: /\.scss$/,
                loader: ['style-loader','css-loader',"sass-loader"] 
            },
            //解析vue文件,会将template,script,css,sass,less这三种分割开来
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './client/index.html',
            filename: 'index.html'
        }),
        //每次都删除 dist目录 生成新的dist 多个文件传一个数组
        new CleanWebpackPlugin(),
        //配合vue-loader
        new VueLoaderPlugin()  
    ]   
}