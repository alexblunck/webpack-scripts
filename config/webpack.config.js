const path = require('path')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')
const merge = require('webpack-merge')

module.exports = function (options) {
    const env = options.env

    const config = {
        mode: env.production ? 'production' : 'development',
        bail: env.production,
        output: {
            path: options.paths.output,
            filename: env.production ? '[name].[chunkhash].js' : '[name].js',
            publicPath: '/'
        },
        optimization: {
            splitChunks: {
                chunks: 'all'
            }
        },
        resolve: {
            symlinks: false,
            modules: ['node_modules', path.resolve(__dirname, '../node_modules')]
        },
        plugins: [
            new CaseSensitivePathsPlugin()
        ]
    }

    return merge(
        config,
        require('./features')(options)
    )
}
