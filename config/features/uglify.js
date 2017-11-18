/**
 * Feature
 * uglify
 */

const webpack = require('webpack')

module.exports = function (options) {
    // Skip on development builds
    if (!options.env.production) {
        return
    }

    return {
        plugins: [
            new webpack.optimize.UglifyJsPlugin({
                sourceMap: true
            })
        ]
    }
}
