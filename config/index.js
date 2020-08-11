'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
    dev: {
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        host: 'localhost',   // '0.0.0.0'
        port: 8080,
        autoOpenBrowser: false,
        proxyTable: {},
        devtool: 'cheap-module-eval-source-map',
        errorOverlay: true
    },
    build: {
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        assetsRoot: path.resolve(__dirname, '../dist'),
        devtool: '#source-map',
        productionSourceMap: false
    }
}