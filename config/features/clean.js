/**
 * Feature
 * clean
 */

const CleanPlugin = require('clean-webpack-plugin')

module.exports = function(options) {
    // Skip on development builds
    if (!options.env.production) {
        return
    }

    return {
        plugins: [
            new CleanPlugin(['dist'], {
                root: options.paths.app,
                verbose: false
            })
        ]
    }
}
