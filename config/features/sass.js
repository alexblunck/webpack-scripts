/**
 * Feature
 * sass
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
        },
        {
            loader: require.resolve('sass-loader'),
            options: {
                sourceMap: options.cssSourceMap,
                sassOptions: {
                    quiet: true
                }
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
                    test: /\.scss$/,
                    exclude: /node_modules/,
                    use: loaders
                }
            ]
        }
    }
}
