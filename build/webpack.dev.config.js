const path = require("path")
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const notifier = require('node-notifier');
const merge = require('webpack-merge')
const config = require('../config')
const baseWebpackConfig = require('./webpack.base.config')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');//压缩css插件
const utils = require('./utils')

const devWebpackConfig = merge(baseWebpackConfig, {
  mode: 'development',
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, extract: false, usePostCSS: true })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,
  devServer: {
    publicPath: config.dev.publicPath,
    host: config.dev.host,
    port: config.dev.port,
    hot: true,   //true的话热更新的时候不会刷新
    open: config.dev.autoOpenBrowser,
    stats: 'errors-only',   //不在Terminal输出没用的信息
    contentBase: false,     //基础资源的根目录，但是我们用了copy插件，把资源都复制了，就不需要了
    historyApiFallback:true,  //如果是history模式，你发送一个home路由，他会匹配不到，你就404了，true的话，你会回到index再匹配路由，这样就OK了（还支持重写跳转位置）
    progress:true,   //输出编译进度条
    inline: true,  // 文件修改后实时刷新
    // color: false, // 控制台打印彩色日志,不知道为什么用了就报错
    proxy: config.dev.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin
    compress: true,
    // if you want dev by ip, please set host: '0.0.0.0' host: 'localhost
    clientLogLevel: 'warning',   //none,error,warning或info
    overlay: config.dev.errorOverlay  //在浏览页面输出报错信息
        ? {warnings: false, errors: true}
        : false,
  },
  plugins: [
    new VueLoaderPlugin(),  //Vue-loader在15.*之后的版本都是 vue-loader的使用都是需要伴生 VueLoaderPlugin的.
    new webpack.HotModuleReplacementPlugin(),
    // new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    // new webpack.NoEmitOnErrorsPlugin(),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.dev.assetsSubDirectory,
        ignore: ['.*']
      }
    ]),
    new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
            messages: [`Your application is running here: http://${config.dev.host}:${config.dev.port}`],
            // notes:['有些附加说明要在成功编辑时显示']
        },
        //  运行错误
        onErrors: function (severity, errors) {
            // 可以收听插件转换和优先级的错误
            // 严重性可以是'错误'或'警告'
            if (severity !== 'error') {
                return;
            }
            const error = errors[0];
            notifier.notify({
                title: "Webpack error",
                message: severity + ': ' + error.name,
                subtitle: error.file || '',
                // icon: ICON
            });
        },
        //是否每次编译之间清除控制台
        //默认为true
    }),
    new OptimizeCssAssetsPlugin(),
  ]
})

module.exports = devWebpackConfig
