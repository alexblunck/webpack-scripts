/**
 * Feature
 * sass
 */

const autoprefixer = require('autoprefixer')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = function (options) {

    const extractSass = new ExtractTextPlugin({
        filename: '[name].[contenthash].css',
        allChunks: true,
        disable: !options.env.production
    })

    const loaders = [
        { loader: require.resolve('css-loader') },
        {
            loader: require.resolve('postcss-loader'),
            options: {
                plugins: [autoprefixer()]
            }
        },
        { loader: require.resolve('sass-loader') }
    ]

    return {
        module: {
            rules: [
                {
                    test: /\.scss$/,
                    exclude: /node_modules/,
                    use: extractSass.extract({
                        use: loaders,
                        fallback: require.resolve('style-loader')
                    })
                }
            ]
        },
        plugins: [
            extractSass
        ]
    }
}
