const path = require('path')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const notifier = require('node-notifier')
const merge = require('webpack-merge')
const config = require('../config')
const baseWebpackConfig = require('./webpack.base.config')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')//压缩css插件
const utils = require('./utils')
const SkeletonWebpackPlugin = require('vue-skeleton-webpack-plugin')
// const vueServerRenderer  = require("vue-server-renderer")
const MyExampleWebpackPlugin = require("./MyExampleWebpackPlugin")


const devWebpackConfig = merge(baseWebpackConfig, {
	mode: 'development',
	module: {
		rules: utils.styleLoaders({sourceMap: config.dev.cssSourceMap, extract: false, usePostCSS: true})
	},
	// cheap-module-eval-source-map is faster for development
	devtool: config.dev.devtool,
	devServer: {
		publicPath: config.dev.publicPath,
		host: config.dev.host,  //if you want dev by ip, please set host: '0.0.0.0' host: 'localhost
		port: config.dev.port,
		open: config.dev.autoOpenBrowser,
		stats: 'errors-only',   //不在Terminal输出没用的信息，除此之外还有"minimal"，"normal"，"verbose"
		contentBase: false,     //基础资源的根目录，但是我们用了copy插件，把资源都复制了，就不需要了
		historyApiFallback: true,  //如果是history模式，你发送一个home路由，他会匹配不到，你就404了，true的话，你会回到index再匹配路由，这样就OK了（还支持重写跳转位置）
		progress: true,   //输出编译进度条
		hot: true,   //true的话热更新的时候页面不会刷新
		inline: true,  // 文件修改后实时刷新
		//在热替换（HMR）机制里，不是重载整个页面，HMR程序会只加载被更新的那一部分模块，然后将其注入到运行中的APP中
		//当刷新页面的时候，一个小型的客户端被添加到webpack.config.js的入口文件中
		//webpack-dev-server/client?http://localhost:8080/‘必须和webpack.HotModuleReplacementPlugin一起使用
		// color: false, // 控制台打印彩色日志,不知道为什么用了就报错
		proxy: config.dev.proxyTable,
		quiet: true, // necessary for FriendlyErrorsPlugin，控制台只输出第一次编译的信息，当你保存后再次编译的时候不会输出任何内容
		compress: true,//采用gzip压缩的优点和缺点，传输快，但是两边要压缩和解压，增加了web端的负担
		clientLogLevel: 'warning',   //none,error,warning或info
		overlay: config.dev.errorOverlay  //在浏览页面输出报错信息
			? {warnings: false, errors: true}
			: false,
	},
	plugins: [
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
					return
				}
				const error = errors[0]
				notifier.notify({
					title: 'Webpack error',
					message: severity + ': ' + error.name,
					subtitle: error.file || '',
					// icon: ICON
				})
			},
			//是否每次编译之间清除控制台
			//默认为true
		}),
		new OptimizeCssAssetsPlugin(),
		// new MyExampleWebpackPlugin()
		new SkeletonWebpackPlugin({
			// webpackConfig: require('./webpack.skeleton.conf'),
			webpackConfig: {
				entry: {
					app: path.resolve(__dirname, '../src/entry-skeleton.js'),
				}
			},
			quiet: true
		})
	]
})

module.exports = devWebpackConfig
