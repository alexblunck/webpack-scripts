/**
 * Feature
 * vendor-chunk
 */

const webpack = require('webpack')
const Md5HashPlugin = require('webpack-md5-hash')
const InlineChunkManifestHtmlWebpackPlugin = require('inline-chunk-manifest-html-webpack-plugin')

module.exports = function (options) {
    return {
        plugins: [
            // Create seperate chunk for modules imported from node_modules dir.
            new webpack.optimize.CommonsChunkPlugin({
                name: 'vendor',
                minChunks: function (module) {
                    return module.context && module.context.indexOf("node_modules") !== -1;
                }
            }),
            // Create seperate manifest chunk
            new webpack.optimize.CommonsChunkPlugin({
                name: 'manifest',
                minChunks: Infinity
            }),
            // Use md5 algorithm for creating hashes
            new Md5HashPlugin(),
            // Create / inline manifest.json into index.html
            new InlineChunkManifestHtmlWebpackPlugin()
        ]
    }
}
