const path = require("path")
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const merge = require('webpack-merge')
const config = require('../config')
const baseWebpackConfig = require('./webpack.base.config')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');//压缩css插件
const utils = require('./utils')

const devWebpackConfig = merge(baseWebpackConfig, {
  mode: 'development',
  module: {
    rules: utils.cssLoaders({ sourceMap: config.dev.cssSourceMap, extract: false, usePostCSS: true })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,
  devServer: {
    publicPath: config.dev.publicPath,
    host: config.dev.host,
    port: config.dev.port,
    hot: true,   //true的话热更新的时候不会刷新
    inline: true,  // 文件修改后实时刷新
    open: config.dev.autoOpenBrowser,
    stats: 'errors-only',   //不在Terminal输出没用的信息
    contentBase: false,     //基础资源的根目录，但是我们用了copy插件，把资源都复制了，就不需要了
    proxy: config.dev.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin
    compress: true,
    // if you want dev by ip, please set host: '0.0.0.0' host: 'localhost
    clientLogLevel: 'warning',   //none,error,warning或info
    overlay: config.dev.errorOverlay
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
      },
      // onErrors: config.dev.notifyOnErrors
      //     ? utils.createNotifierCallback()
      //     : undefined
    }),
    new OptimizeCssAssetsPlugin(),
  ]
})

module.exports = devWebpackConfig
