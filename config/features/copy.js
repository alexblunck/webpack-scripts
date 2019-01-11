/**
 * Feature
 * copy
 */

const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = function(options) {
    if (!options.copy) {
        return
    }

    return {
        plugins: [new CopyWebpackPlugin(options.copy)]
    }
}
