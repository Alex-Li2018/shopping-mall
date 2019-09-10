const path = require('path')
const nodeExternals = require('webpack-node-externals')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin');

var HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = { 
    target: 'node', 
    entry: { 
        skeleton: './src/skeleton.entry.js' 
    },
    output: { 
        path: path.resolve(__dirname, '../skeleton_dist'), 
        publicPath: '/dist/', 
        filename: '[name].js', 
        libraryTarget: 'commonjs2' 
    },
    module: { 
        rules: [{ 
                test: /\.css$/, 
                use: [ 'vue-style-loader', 'css-loader' ] 
            }, 
            { 
                test: /\.vue$/,
                loader: 'vue-loader' 
            }] 
        }, 
        externals: nodeExternals({ whitelist: /\.css$/ }), 
        resolve: { alias: { 'vue$': 'vue/dist/vue.esm.js' }, 
        extensions: ['*', '.js', '.vue', '.json'] 
    }, 
    plugins: [
        new HtmlWebpackPlugin({
            template: './client/index.html',
            filename: 'index.html'
        }), 
        //配合vue-loader
        new VueLoaderPlugin(), 
        new VueSSRServerPlugin({ filename: 'skeleton.json' }) 
    ] 
}