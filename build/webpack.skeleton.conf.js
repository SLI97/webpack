const path = require('path')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.config')
// const nodeExternals = require('webpack-node-externals')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')
const utils = require('./utils')
const config = require('../config')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

function resolve(dir) {
	return path.join(__dirname, dir)
}

module.exports = merge(baseWebpackConfig, {
	mode: 'production',
	target: 'node',
	devtool: false,
	entry: {
		app: resolve('../src/entry-skeleton.js')
	},
	module: {
		rules: utils.styleLoaders({sourceMap: config.build.productionSourceMap, extract: true, usePostCSS: true})
	},
	output: {
		path: config.build.assetsRoot,
		publicPath: '/',
		libraryTarget: 'commonjs2'
	},
	// externals: nodeExternals({
	// 	whitelist: /\.css$/
	// }),
	plugins:
		[
			new MiniCssExtractPlugin({ //提取css作为单独文件
				filename: path.join('static', 'css/[name].[contenthash].css'),
				chunkFilename: path.join('static', 'css/[name].[contenthash].css')
			}),
			new VueSSRServerPlugin({
				filename: 'skeleton.json'
			})
		]
})
