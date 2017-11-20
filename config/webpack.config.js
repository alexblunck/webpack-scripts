const webpack = require('webpack')
const merge = require('webpack-merge')

module.exports = function (options) {
    const env = options.env
    const filename = env.production ? '[name].[chunkhash].js' : '[name].js'
    const environment = env.production ? 'production' : 'development'

    const config = {
        bail: env.production,
        output: {
            path: options.paths.output,
            filename: filename,
            chunkFilename: filename
        },
        plugins: [
            new webpack.DefinePlugin({
              'process.env.NODE_ENV': JSON.stringify(environment)
            })
        ],
        stats: true
    }

    return merge(
        config,
        require('./features')(options)
    )
}
