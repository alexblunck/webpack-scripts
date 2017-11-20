/**
 * Feature
 * uglify
 */

const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

module.exports = function (options) {
    // Skip on development builds
    if (!options.env.production) {
        return
    }

    return {
        plugins: [
            new UglifyJSPlugin({
                sourceMap: true,
                cache: true
            })
        ]
    }
}
