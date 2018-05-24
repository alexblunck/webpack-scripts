/**
 * Feature
 * hot
 */

const webpack = require('webpack')

module.exports = function (options) {
    // Skip on production builds
    if (options.env.production) {
        return
    }

    return {
        plugins: [
            new webpack.HotModuleReplacementPlugin()
        ]
    }
}
