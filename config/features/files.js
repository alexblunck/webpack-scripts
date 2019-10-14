/**
 * Feature
 * files
 */

module.exports = function(options) {
    return {
        module: {
            rules: [
                {
                    test: /\.(mp4|ttf)$/,
                    loader: require.resolve('file-loader'),
                    include: options.paths.src
                }
            ]
        }
    }
}
