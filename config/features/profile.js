/**
 * Feature
 * profile
 */

const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

module.exports = function(options) {
    if (!options.profile) {
        return
    }

    return {
        plugins: [
            new BundleAnalyzerPlugin({
                defaultSizes: 'gzip'
            })
        ]
    }
}
