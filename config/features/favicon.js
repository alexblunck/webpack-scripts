/**
 * Feature
 * favicon
 */

const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = function(options) {
    if (!options.env.production || !options.favicon) {
        return
    }

    return {
        plugins: [
            new CopyWebpackPlugin([
                {
                    from: options.favicon
                }
            ])
        ]
    }
}
