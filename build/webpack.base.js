const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin') //把打包后的结果插入到模板中
const { CleanWebpackPlugin } = require('clean-webpack-plugin') //每次打包都删除dist目录
const VueLoaderPlugin = require('vue-loader/lib/plugin'); //vue-loader15.*之后,必须配合这个plugin

module.exports = {
    entry: './src/main.js',
    output: {
        filename: 'app.[hash:4].js',
        path: path.resolve(__dirname,'../dist'),
        chunkFilename: 'chunk.[name].[hash:4].js'
    },
    resolve: {
        extensions: ['.vue', '.js', '.css', '.scss'],
        // 找包的顺序是从当前的node_modules下开始寻找，找不到会从外层再去寻找，我们可以使用module字段来指定找包的范围
        modules: [path.join(__dirname, '../node_modules')],
        alias: {
            'vue$': 'vue/dist/vue.common.js',
            '@': path.resolve(__dirname, '../src'),
            "@component": path.resolve(__dirname, "../src/page/component")
        }
    },
    module: {
        //loader的执行顺序是从下到上,从右到左
        rules: [
            // js语法规范
            // {
            //     test: /\.js$/,
            //     use: [
            //        {
            //             loader: 'eslint-loader',
            //             options: {
            //                 enforce: 'pre' //前置loader pre 后置loader post 
            //             }
            //        }
            //     ] 
            // },
            //es6的语法处理
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            // //预设 用babel把es6转为es5
                            // presets: ['@babel/preset-env'],
                            // plugins: [
                            //     ["@babel/plugin-proposal-class-properties", { "loose": true }], //支持class语法
                            //     "@babel/plugin-transform-runtime", //支持promise的语法 Generator语法
                            //     "@babel/plugin-syntax-dynamic-import" //支持import()函数
                            // ],
                            // include: [path.resolve('../src'), path.resolve('../node_modules/mint-ui/src'), path.resolve('../node_modules/mint-ui/packages')]
                        }
                    }
                ],
                include: [path.resolve('../src'), path.resolve('../node_modules/mint-ui/src'), path.resolve('../node_modules/mint-ui/packages')]
                // include: path.resolve(__dirname,'src'), //包括src下面的js
                // exclude: /node_modules/ //排除那些js 
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
            //处理图片路径问题
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                use: [
                  {
                    loader: "url-loader",
                    options: {
                      limit: 8092,
                      name: "img/[hash:7].[ext]"
                    }
                  }
                ]
              },
              {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                use: [
                  {
                    loader: "url-loader",
                    options: {
                      limit: 8092,
                      name: "media/[hash:7].[ext]"
                    }
                  }
                ]
              },
              {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                use: [
                  {
                    loader: "url-loader",
                    options: {
                      limit: 8092,
                      name: "font/[hash:7].[ext]"
                    }
                  }
                ]
              }
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