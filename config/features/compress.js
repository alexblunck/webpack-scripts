/**
 * Feature
 * compress
 */

const CompressionPlugin = require('compression-webpack-plugin')

module.exports = function (options) {
    // Skip on development builds
    if (!options.env.production) {
        return
    }

    return {
        plugins: [
            new CompressionPlugin({
                test: /\.(js|css)$/
            })
        ]
    }
}
