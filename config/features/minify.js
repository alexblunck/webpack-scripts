/**
 * Feature
 * minify
 */

const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = function (options) {
    // Skip on development builds
    if (!options.env.production) {
        return
    }

    return {
        plugins: [
            new UglifyJSPlugin({
                sourceMap: true,
                cache: true
            }),
            new OptimizeCssAssetsPlugin()
        ]
    }
}
