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
            sourceMap: sourceMap,
            config: {
                path: 'postcss.config.js'
            }
        }
    }

    const generateLoaders = loader => {
        let loaders = usePostCSS ? [cssLoader, postcssLoader] : [cssLoader]
        loaders = extract ? [MiniCssExtractPlugin.loader].concat(loaders) : ['style-loader'].concat(loaders)

        if (loader) {
            loaders.push({
                loader: loader + '-loader',
                options: Object.assign({}, {
                    sourceMap: sourceMap
                })
            })
        }

        return loaders
    }

    return {
        css: generateLoaders(),
        postcss: generateLoaders(),
        less: generateLoaders('less'),
        scss: generateLoaders('sass'),
        stylus: generateLoaders('stylus'),
        styl: generateLoaders('stylus')
    }
}


// Generate loaders for standalone style files (outside of .vue)
const styleLoaders = (options) => {
    const output = []
    const loaders = cssLoaders(options)

    for (const extension in loaders) {
        const loader = loaders[extension]
        output.push({
            test: new RegExp('\\.' + extension + '$'),
            use: loader
        })
    }

    return output
}

module.exports = {
    styleLoaders
}
