// config.js
const path = require("path")
const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const {CleanWebpackPlugin} = require("clean-webpack-plugin")
const ExtractTextPlugin = require("extract-text-webpack-plugin")  //webpack3 css提取
const MiniCssExtractPlugin = require('mini-css-extract-plugin')   //webpack4 css提取

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

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
    publicPath: '/',
    host: '0.0.0.0',
    port: 4001,
    hot: true,
    open: false,
    stats: 'errors-only',   //不在Terminal输出没用的信息
    contentBase: false,
    proxy: {   //开启反向代理，请求的时候直接写/api开头即可
      '/api': 'http://localhost:3000'
    },
    // if you want dev by ip, please set host: '0.0.0.0' host: 'localhost
    clientLogLevel: 'warning',   //防止控制台一直输出信息
  },
  module: {
    rules: [
      {
        test: /\.vue$/, loader: 'vue-loader',
        options: {
          loaders: {
            css: ExtractTextPlugin.extract({
              use: 'css-loader',
              fallback: 'style-loader',
              publicPath: "./",
              filename: path.join('static', 'css/[name].[contenthash].css')
            }),
            // stylus: ExtractTextPlugin.extract({
            //   fallback: 'style-loader',
            //   use: ['css-loader', 'stylus-loader'],
            //   publicPath: "./"
            // }),
          }
        }
      },
      {test: /\.js$/, loader: 'babel-loader', exclude: path.resolve(__dirname, '../node_modules/')},
      {
        test: /\.css$/, use: [
          // 'style-loader'
          process.env.NODE_ENV !== 'production'
              ? 'style-loader' :
              MiniCssExtractPlugin.loader
          , 'css-loader']
      },
      {test: /\.styl(us)?$/, use: ['style-loader', 'css-loader', 'stylus-loader']},
      {test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader']},
      {test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader']},
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
        BASE_TITLE: '我是BASE_TITLE',
      },
    }),
    new MiniCssExtractPlugin({
      filename: path.join('static', 'css/[name].[contenthash].css'),
      chunkFilename: path.join('static', 'css/[id].[contenthash].css')
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
    ]),
    // new CleanWebpackPlugin()  //清理原来的打包文件
  ]
}
