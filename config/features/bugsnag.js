/**
 * Feature
 * bugsnag
 */

const { BugsnagSourceMapUploaderPlugin } = require('webpack-bugsnag-plugins')

module.exports = function(options) {
    // Skip on development builds or missing bugsnag api key
    if (!options.env.production || !options.bugsnagApiKey) {
        return
    }

    return {
        plugins: [
            new BugsnagSourceMapUploaderPlugin({
                apiKey: options.bugsnagApiKey,
                publicPath: '*',
                overwrite: true
            })
        ]
    }
}
