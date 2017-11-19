/**
 * Feature
 * babel
 */

module.exports = function(options) {
    const entry = {
        app: [
            './src/index.js'
        ]
    }

    const babelOptions = {
        compact: true,
        cacheDirectory: true,
        presets: [
            [require.resolve('babel-preset-env'), {
                modules: false
            }],
            require.resolve('babel-preset-react')
        ],
        plugins: [
            require.resolve('babel-plugin-syntax-dynamic-import')
        ]
    }

    // HMR
    if (!options.env.production) {
        entry.app.unshift(
            require.resolve('webpack-dev-server/client') + '?/',
            require.resolve('webpack/hot/dev-server'),
        )
    }

    // Framework - React
    if (options.framework === 'react') {
        babelOptions.presets.push(
            require.resolve('babel-preset-react')
        )

        babelOptions.plugins.push(
            require.resolve('babel-plugin-inline-react-svg')
        )

        // HMR
        if (!options.env.production) {
            entry.app.unshift('react-hot-loader/patch')
            babelOptions.plugins.unshift('react-hot-loader/babel')
        }
    }
    // Framework - AngularJs
    else if (options.framework === 'ng1') {
        babelOptions.plugins.push(
            require.resolve('babel-plugin-angularjs-annotate')
        )
    }

    return {
        entry: entry,
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: require.resolve('babel-loader'),
                    options: babelOptions
                }
            ]
        }
    }
}