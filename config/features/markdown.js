/**
 * Feature
 * markdown
 */

module.exports = function(options) {
    return {
        module: {
            rules: [
                {
                    test: /\.md$/,
                    use: [
                        {
                            loader: require.resolve('html-loader'),
                            options: {
                                minimize: true,
                                conservativeCollapse: false
                            }
                        },
                        {
                            loader: require.resolve('markdown-loader'),
                            options: {
                                gfm: true
                            }
                        }
                    ]
                }
            ]
        }
    }
}
