/**
 * Feature
 * html
 */

module.exports = function(options) {
    return {
        module: {
            rules: [
                {
                    test: /\.html$/,
                    loader: require.resolve('html-loader'),
                    options: {
                        minimize: true,
                        conservativeCollapse: false
                    }
                }
            ]
        }
    }
}
