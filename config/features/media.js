/**
 * Feature
 * media
 */

const path = require('path')

module.exports = function (options) {
    return {
        module: {
            rules: [
                {
                    test: /\.(png|gif|mp4)$/,
                    loader: require.resolve('file-loader'),
                    include: options.paths.src
                }
            ]
        }
    }
}
