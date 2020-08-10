// config.js
const path = require("path")
const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

module.exports = {
    mode: 'development',    //development,production,none 会有内置优化
    context: path.resolve(__dirname, '../'),   //基础目录，用于从配置中解析入口点(entry point)和 加载器(loader)。
    // entry: './src/main.js',   //用了context就可以这么设置
    entry: path.resolve(__dirname, '../src/main.js'),
    output: {
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/',
        filename: 'js/[name].[hash].js'  //chunkhash
    },
    devServer: {
        clientLogLevel: 'warning',   //防止控制台一直输出信息
        // if you want dev by ip, please set host: '0.0.0.0' host: 'localhost
        host: '0.0.0.0',
        port: 4001,
        hot: true,
        open: false,
        stats: 'errors-only',   //不在Terminal输出没用的信息
	      proxy:{   //开启反向代理，请求的时候直接写/api开头即可
		      '/api': 'http://localhost:3000'
	      }
    },
    module: {
        rules: [{
            test: /\.vue$/,
            loader: 'vue-loader',
            options: {
                loaders: {
                    'scss': [
                        'vue-style-loader',
                        'css-loader',
                        'less-loader'
                    ]
                }
            }
        }, {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/
        },]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
	        '@': path.resolve(__dirname, '../src'),
        },
        extensions: ['*', '.js', '.vue', '.json']
    },
    plugins: [
        new VueLoaderPlugin(),  //Vue-loader在15.*之后的版本都是 vue-loader的使用都是需要伴生 VueLoaderPlugin的.
        new htmlWebpackPlugin({
            template: path.resolve(__dirname, '../public/index.html'),
            title: '我是SPA',
            favicon: path.resolve(__dirname, '../public/favicon.ico'),
            minify: {
                collapseInlineTagWhitespace: true,   //折叠空白区域
                removeComments: true,   //删除注释
                hash: true,    //是否需要对src引的文件后面加上Hash，使用时需要区分开发环境和生产环境
            },
            templateParameters: {
                // BASE_URL: config.dev.assetsPublicPath + config.dev.assetsSubDirectory,
            },
        }),
        new FriendlyErrorsPlugin({
            compilationSuccessInfo: {
                messages: [
                    `Your application is running! `
                ]
            },
            // onErrors: config.dev.notifyOnErrors
            //     ? utils.createNotifierCallback()
            //     : undefined
        }),
        //热加载需要使用这个插件才起作用
        // new webpack.HotModuleReplacementPlugin(),
        new CopyWebpackPlugin([    //复制静态文件
            {
                from: path.resolve(__dirname, '../static'),
                to: 'static',
                ignore: ['.*']
            }
        ])
    ]
}
