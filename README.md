# shopping-mall
移动电商的项目: vue+webpack+mint-ui+axios+rem

## 说明

### 使用webpack配置基本脚手架,脚手架内容: 
 1.常见loader: vue-loader css-loader sass-loaer bbabel-loader url-loader file-loader </br>
 2.常见plugin: html-webpack-plugin clean-webpack-plugin uglifyjs-webpack-plugin </br>
   2.1 内置的plugin: webpack.DefinePlugin webpack.BannerPlugin </br>
 3.优化项optimization: splitChunks </br></br>
脚手架内容简单与上手,同时拥有可迁移性

### axios
全局封装的形式,对于请求及相应的拦截都做了处理;利用vue的plugin,优先于所有组件加载,将其挂载到vue的原型上,同时也挂载到了window对象上

每日会逐步更新
