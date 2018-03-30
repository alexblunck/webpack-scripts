/**
 * Feature
 * sass
 */

const autoprefixer = require('autoprefixer')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = function (options) {
    const plugins = [
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css'
        })
    ]

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
                sourceMap: options.cssSourceMap
            }
        }
    ]

    // Extract css in production
    if (options.env.production) {
        loaders.unshift(
            MiniCssExtractPlugin.loader
        )
    }
    // Use style loader in development
    else {
        loaders.unshift({
            loader: require.resolve('style-loader')
        })
    }

    // Minify in production
    if (options.env.production) {
        plugins.push(
            new OptimizeCssAssetsPlugin()
        )
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
        },
        plugins: plugins
    }
}
