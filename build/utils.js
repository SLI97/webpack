const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const cssLoaders = ({ sourceMap, usePostCSS, extract }) => {
    const cssLoader = {
        loader: 'css-loader',
        options: {
            sourceMap: sourceMap
        }
    }

    const postcssLoader = {
        loader: 'postcss-loader',
        options: {
            sourceMap: sourceMap
        }
    }

    const generateLoaders = loader => {
        const loaders = usePostCSS ? [cssLoader, postcssLoader] : [cssLoader]
        // const loaders = usePostCSS ? ['css-loader', 'postcss-loader'] : ['css-loader']

        if (loader !== 'css') {
            loaders.push(`${loader}-loader`)
        }

        return { test: new RegExp('\\.' + loader + '$'), use: [extract ? MiniCssExtractPlugin.loader : 'style-loader'].concat(loaders) }
    }

    return [
        generateLoaders('css'),
        generateLoaders('less'),
        generateLoaders('sass'),
        generateLoaders('stylus')
    ]
}

module.exports = {
    cssLoaders
}