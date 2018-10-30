/**
 * Feature
 * css
 */

const autoprefixer = require('autoprefixer')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = function(options) {
    const loaders = [
        {
            loader: require.resolve('css-loader'),
            options: {
                sourceMap: options.cssSourceMap
            }
        },
        {
            loader: require.resolve('postcss-loader'),
            options: {
                plugins: [autoprefixer()],
                sourceMap: options.cssSourceMap
            }
        }
    ]

    // Extract css in production
    if (options.env.production) {
        loaders.unshift(MiniCssExtractPlugin.loader)
    }
    // Use style loader in development
    else {
        loaders.unshift({
            loader: require.resolve('style-loader')
        })
    }

    return {
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: loaders
                }
            ]
        }
    }
}
