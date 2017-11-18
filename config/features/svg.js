/**
 * Feature
 * svg
 */

module.exports = function (options) {
    return {
        module: {
            rules: [
                {
                    test: /\.svg$/,
                    loader: require.resolve('svg-inline-loader'),
                    options: {
                        removeTags: true,
                        // Don't remove width / height attributes
                        removeSVGTagAttrs: false
                    }
                }
            ]
        }
    }
}
