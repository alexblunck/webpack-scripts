const path = require('path')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')
const merge = require('webpack-merge')

module.exports = function(options) {
    const env = options.env

    const alias = {}

    if (options.alias) {
        Object.keys(options.alias).map(key => {
            const value = options.alias[key]
            alias[key] = path.resolve(options.paths.app, value)
        })
    }

    const config = {
        mode: env.production ? 'production' : 'development',
        bail: env.production,
        output: {
            path: options.paths.output,
            filename: env.production ? '[name].[contenthash].js' : '[name].js',
            publicPath: '/'
        },
        optimization: {
            splitChunks: {
                chunks: 'all'
            }
        },
        resolve: {
            symlinks: false,
            modules: [
                'node_modules',
                path.resolve(__dirname, '../node_modules')
            ],
            alias: alias
        },
        plugins: [new CaseSensitivePathsPlugin()]
    }

    return merge(config, require('./features')(options))
}
