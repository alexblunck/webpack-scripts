/**
 * Framework
 * react
 */

module.exports = function(options) {
    const entry = {
        app: [
            './src/index.js'
        ]
    }

    const babelPlugins = [
        require.resolve('babel-plugin-syntax-dynamic-import'),
        require.resolve('babel-plugin-inline-react-svg')
    ]

    // Hot module replacement
    if (!options.env.production) {
        entry.app.unshift(
            'react-hot-loader/patch',
            require.resolve('webpack-dev-server/client') + '?/',
            require.resolve('webpack/hot/dev-server'),
        )

        babelPlugins.unshift('react-hot-loader/babel')
    }

    return {
        entry: entry,
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: require.resolve('babel-loader'),
                    options: {
                        compact: true,
                        cacheDirectory: true,
                        presets: [
                            [require.resolve('babel-preset-env'), {
                                modules: false
                            }],
                            require.resolve('babel-preset-react')
                        ],
                        plugins: babelPlugins
                    }
                }
            ]
        }
    }
}
