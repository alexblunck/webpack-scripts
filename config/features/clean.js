/**
 * Feature
 * clean
 */

const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = function(options) {
    // Skip on development builds
    if (!options.env.production) {
        return
    }

    return {
        plugins: [new CleanWebpackPlugin()]
    }
}
