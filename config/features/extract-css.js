/**
 * Feature
 * extract-css
 */

const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = function (options) {
    const plugins = [
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css'
        })
    ]

    // Minify in production
    if (options.env.production) {
        plugins.push(
            new OptimizeCssAssetsPlugin()
        )
    }

    return {
        plugins: plugins
    }
}
