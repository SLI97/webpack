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
    plugins: [
        new webpack.BannerPlugin('版权所有，翻版必究'),  // new一个插件的实例 
        new HtmlWebpackPlugin({
            title: '我是SPA',
            template: path.resolve(__dirname, '../public/index.html'),
            favicon: path.resolve(__dirname, '../public/favicon.ico'),
            inject: true,
            minify: {
                collapseInlineTagWhitespace: true,   //折叠空白区域
                removeComments: true,   //删除注释
                hash: true,    //是否需要对src引的文件后面加上Hash，使用时需要区分开发环境和生产环境
            },
            templateParameters: {
                // BASE_URL: config.dev.assetsPublicPath + config.dev.assetsSubDirectory,
                BASE_TITLE: '我是TITLE',
            },
        }),
    ]
}
