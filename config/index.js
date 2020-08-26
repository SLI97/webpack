'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
    dev: {
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        host: 'localhost',   // '0.0.0.0'
        port: 8081,
        autoOpenBrowser: false,
        proxyTable: {
            // '/api': 'http://127.0.0.1:3000'
        },
        devtool: 'cheap-module-eval-source-map',
        errorOverlay: true,
        cssSourceMap: true
    },
    build: {
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        assetsRoot: path.resolve(__dirname, '../dist'),
        devtool: '#source-map',
        productionSourceMap: false
    }
}
