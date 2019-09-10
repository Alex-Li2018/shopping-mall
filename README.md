# shopping-mall
移动电商的项目: vue+webpack+mint-ui+axios+rem
_____

## 说明
## 使用webpack配置基本脚手架,脚手架内容:
> * 1.常见loader: vue-loader css-loader sass-loaer bbabel-loader url-loader file-loader <br/>
> * 2.常见plugin: html-webpack-plugin clean-webpack-plugin uglifyjs-webpack-plugin <br/>
> > >  2.1 内置的plugin: webpack.DefinePlugin webpack.BannerPlugin <br/>
> * 3.优化项optimization: splitChunks <br/>

脚手架内容简单与上手,同时拥有可迁移性
____

## axios
全局封装的形式,对于请求及相应的拦截都做了处理;利用vue的plugin,优先于所有组件加载,将其挂载到vue的原型上,同时也挂载到了window对象上
_____

## XSS防御

利用he.js与htmlparse.js实现输入文本与数据返回的字符串的编码转义
_____

## 骨架屏

利用vue-server-renderer实现,详情见: [Vue页面显示骨架屏](https://www.cnblogs.com/xiaoxiaossrs/p/9936516.html),只是处理了首页的骨架屏,其他页面并未处理
____

每日会逐步更新

