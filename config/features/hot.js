/**
 * Feature
 * hot
 */

const webpack = require('webpack')

module.exports = function (options) {
    // Skip on production builds / webpack-dev-server configuration
    if (options.env.production || options.devServer !== 'webpack-dev-server') {
        return
    }

    return {
        plugins: [
            new webpack.HotModuleReplacementPlugin()
        ]
    }
}
