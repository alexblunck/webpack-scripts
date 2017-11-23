/**
 * Feature
 * files
 */

module.exports = function (options) {
    return {
        module: {
            rules: [
                {
                    test: /\.(mp4)$/,
                    loader: require.resolve('file-loader'),
                    include: options.paths.src
                }
            ]
        }
    }
}
