// config.js
const path = require("path")
const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const {CleanWebpackPlugin} = require("clean-webpack-plugin");

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
		clientLogLevel: 'warning',   //防止控制台一直输出信息
		// if you want dev by ip, please set host: '0.0.0.0' host: 'localhost
		host: '0.0.0.0',
		port: 4001,
		hot: true,
		open: false,
		stats: 'errors-only',   //不在Terminal输出没用的信息
		proxy: {   //开启反向代理，请求的时候直接写/api开头即可
			'/api': 'http://localhost:3000'
		}
	},
	module: {
		rules: [
			{
				test: /\.vue$/,
				loader: 'vue-loader',
				options: {
					loaders: {
						'stylus': 'vue-style-loader!stylus-loader',
						'scss': 'vue-style-loader!css-loader!sass-loader',
						'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
					}
				}
			},
			// {test: /\.vue$/, use: ['vue-loader']},
			{test: /\.js$/, loader: 'babel-loader', exclude: path.resolve(__dirname, '../node_modules/')},
			{test: /\.css$/, use: ['vue-style-loader','css-loader']},
			{test: /\.styl(us)?$/, use: ['vue-style-loader', 'style-loader', 'css-loader', 'stylus-loader']},
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
		]),
		// new CleanWebpackPlugin()  //清理原来的打包文件
	]
}
