/**
 * Feature
 * images
 */

const ImageminPlugin = require('imagemin-webpack-plugin').default

module.exports = function (options) {
    return {
        module: {
            rules: [
                {
                    test: /\.(png|gif|jpe?g)$/,
                    loader: require.resolve('file-loader'),
                    include: options.paths.src
                }
            ]
        },
        plugins: [
            new ImageminPlugin()
        ]
    }
}
