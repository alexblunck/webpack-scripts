/**
 * Feature
 * svg
 */

module.exports = function(options) {
    return {
        module: {
            rules: [
                {
                    test: /\.svg$/,
                    use: [
                        {
                            loader: require.resolve('raw-loader')
                        },
                        {
                            loader: require.resolve('svgo-loader')
                        }
                    ]
                }
            ]
        }
    }
}
