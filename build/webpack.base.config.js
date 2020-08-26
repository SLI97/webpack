const path = require("path")
const config = require('../config')
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin')

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

module.exports = {
    context: path.resolve(__dirname, '../'),   //基础目录，用于从配置中解析入口点(entry point)和 加载器(loader)。
    entry: {
        app: path.resolve(__dirname, '../src/main.js'),
    },
    output: {
        path: config.build.assetsRoot,
        publicPath: '/',
        filename: 'js/[name].[hash].js'  //chunkhash
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': path.resolve(__dirname, '../src'),
        },
        extensions: ['*', '.js', '.vue', '.json']
    },
    module: {
        rules: [
            { test: /\.vue$/, loader: 'vue-loader' },
            { test: /\.js$/, loader: 'babel-loader', exclude: path.resolve(__dirname, '../node_modules/') },
            /*
               使用 url-loader, 它接受一个 limit 参数，单位为字节(byte)

               当文件体积小于 limit 时，url-loader 把文件转为 Data URI 的格式内联到引用的地方
               当文件大于 limit 时，url-loader 会调用 file-loader, 把文件储存到输出目录，并把引用的文件路径改写成输出后的路径

               比如 views/foo/index.html 中
               <img src="smallpic.png">
               会被编译成
               <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAA...">

               而
               <img src="largepic.png">
               会被编译成
              <img src="/f78661bef717cf2cc2c2e5158f196384.png">
           */
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                exclude: [resolve('src/icons')],
                options: {
                    limit: 10000,
                    name: path.join('static', 'img/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: path.join('static', 'media/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: path.join('static', 'fonts/[name].[hash:7].[ext]')
                }
            }
        ]
    },
    /*
     配置 webpack 插件
     plugin 和 loader 的区别是，loader 是在 import 时根据不同的文件名，匹配不同的 loader 对这个文件做处理，
     而 plugin, 关注的不是文件的格式，而是在编译的各个阶段，会触发不同的事件，让你可以干预每个编译阶段。
    */
    plugins: [
        new webpack.BannerPlugin('版权所有，翻版必究'),  // new一个插件的实例
        new HtmlWebpackPlugin({
            title: '我是SPA',
            template: path.resolve(__dirname, '../public/index.html'),
            favicon: path.resolve(__dirname, '../public/favicon.ico'),
            inject: true,
            minify: {
                collapseInlineTagWhitespace: true,   //折叠空白区域
                removeRedundantAttributes: true, // 删除多余的属性
                removeAttributeQuotes: true, // 移除属性的引号
                removeComments: true,   //删除注释
                hash: true,    //是否需要对src引的文件后面加上Hash，使用时需要区分开发环境和生产环境
                collapseBooleanAttributes: true // 省略只有 boolean 值的属性值 例如：readonly checked
            },
            templateParameters: {
                // BASE_URL: config.dev.assetsPublicPath + config.dev.assetsSubDirectory,
                BASE_TITLE: '我是TITLE',
            },
        }),
        // new webpack.IgnorePlugin(/\.\/locale/,/moment/),
        // 有些包自带语言包，有时候不需要把所有的语言包跟着打包比如 moment，那么我们就需要把这个包特殊对待
        // new webpack.ProvidePlugin({ //提供全局变量
        //     "$": "jquery"
        // })
        //排除之外  加入 在cdn引入了这个包 就不会打包这个包
        // externals: { 如果在html引入cdn路径并且在页面也 import $ from jquery 这就坏了, 即使引入cdn也会打包
        //     'jquery': '$
        // }
    ],
}
