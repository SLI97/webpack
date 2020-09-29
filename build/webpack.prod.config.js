const config = require('../config')
const baseWebpackConfig = require('./webpack.base.config')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin'); //压缩css插件
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const chalk = require('chalk')
const ora = require('ora')
const spinner = ora('building for production...')
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin')
const merge = require('webpack-merge')
const path = require("path")
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const utils = require('./utils')
const PrerenderSPAPlugin = require('prerender-spa-plugin')
const Renderer = PrerenderSPAPlugin.PuppeteerRenderer

spinner.start()

const prodWebpackConfig = merge(baseWebpackConfig, {
	mode: 'production',
	entry: {
		app: path.resolve(__dirname, '../src/main.js'),
		// vendor: ["vue",'vue-router']
	},
	output: {
		path: config.build.assetsRoot,
		filename: path.join('static', 'js/[name].[chunkhash].js'), //直接被入口文件引用的文件名
		chunkFilename: path.join('static', 'js/[name].[chunkhash].js') //异步加载的文件名，如router里的组件
	},
	devtool: config.build.productionSourceMap ? config.build.devtool : false,
	module: {
		rules: utils.styleLoaders({sourceMap: config.build.productionSourceMap, extract: true, usePostCSS: true})
	},
	plugins: [
		// new MiniCssExtractPlugin({ //提取css作为单独文件
		// 	filename: path.join('static', 'css/[name].[contenthash].css'),
		// 	chunkFilename: path.join('static', 'css/[name].[contenthash].css')
		// }),
		// keep module.id stable when vendor modules does not change
		/*
				 使用文件路径的 hash 作为 moduleId。
				 虽然我们使用 [chunkhash] 作为 chunk 的输出名，但仍然不够。
				 因为 chunk 内部的每个 module 都有一个 id，webpack 默认使用递增的数字作为 moduleId。
				 如果引入了一个新文件或删掉一个文件，可能会导致其他文件的 moduleId 也发生改变，
				 那么受影响的 module 所在的 chunk 的 [chunkhash] 就会发生改变，导致缓存失效。
				 因此使用文件路径的 hash 作为 moduleId 来避免这个问题。
		 */
		new webpack.HashedModuleIdsPlugin(),
		// enable scope hoisting
		// new webpack.optimize.ModuleConcatenationPlugin(),

		// copy custom static assets
		new CopyWebpackPlugin([{
			from: path.resolve(__dirname, '../static'),
			to: config.build.assetsSubDirectory,
			ignore: ['.*']
		}]),
		new BundleAnalyzerPlugin({
			analyzerMode: 'static',
			//  是否在默认浏览器中自动打开报告
			openAnalyzer: false,
			//  将在“服务器”模式下使用的端口启动HTTP服务器。
			analyzerPort: 9528,
			reportFilename: 'static/report.html',
		}),
		new CleanWebpackPlugin(), // 删除 dist 文件夹
		new PrerenderSPAPlugin({
			// 生成文件的路径，这个目录只能有一级。若目录层次大于一级，在生成的时候不会有任何错误提示，在预渲染的时候只会卡着不动
			staticDir: path.join(__dirname, '../dist'),
			// 对应自己的路由文件
			routes: ['/test'],
			// 若没有这段则不会进行预编译
			renderer: new Renderer({
				inject: {
				},
				headless: false,
				// 在 main.js 中 document.dispatchEvent(new Event('render-event'))，两者的事件名称要对应上。
				renderAfterDocumentEvent: 'render-event'
			})
		}),
	],
	// webpack4.x 新增配置项
	optimization: {
		splitChunks: {
			chunks: 'initial', // 只对入口文件处理    表示显示块的范围，有三个可选值：initial(初始块)、async(按需加载块)、all(全部块)，默认为all;
			cacheGroups: {
				vendors: {
					test: /node_modules\//,
					name: 'vendor',
					priority: 10,
					enforce: true,
				},
			}
		},
		/*
		 上面提到 chunkFilename 指定了 chunk 打包输出的名字，那么文件名存在哪里了呢？
		 它就存在引用它的文件中。这意味着一个 chunk 文件名发生改变，会导致引用这个 chunk 文件也发生改变。

		 runtimeChunk 设置为 true, webpack 就会把 chunk 文件名全部存到一个单独的 chunk 中，
		 这样更新一个文件只会影响到它所在的 chunk 和 runtimeChunk，避免了引用这个 chunk 的文件也发生改变。
		 */
		runtimeChunk: {
			name: 'manifest'
		},
		minimizer: [ // 用于配置 minimizers 和选项
			new UglifyJsPlugin({
				cache: true,
				parallel: true,
				sourceMap: config.build.productionSourceMap, // set to true if you want JS source maps
			}),
			// Compress extracted CSS. We are using this plugin so that possible
			// duplicated CSS from different components can be deduped.
			new OptimizeCssAssetsPlugin({ //压缩提取出来的css空格，并且把重复的css样式去掉
				cssProcessorOptions: config.build.productionSourceMap ?
					{safe: true, map: {inline: false}} :
					{safe: true}
			}),
		]
	},
})

// module.exports = prodWebpackConfig

webpack(prodWebpackConfig, (err, stats) => {
	spinner.stop()
	if (err) throw err
	process.stdout.write(stats.toString({
		colors: true,
		modules: false,
		children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
		chunks: false,
		chunkModules: false
	}) + '\n\n')

	if (stats.hasErrors()) {
		console.log(chalk.red('  Build failed with errors.\n'))
		process.exit(1)
	}

	console.log(chalk.cyan('  Build complete.\n'))
	console.log(chalk.yellow(
		'  Tip: built files are meant to be served over an HTTP server.\n' +
		'  Opening index.html over file:// won\'t work.\n'
	))
})
