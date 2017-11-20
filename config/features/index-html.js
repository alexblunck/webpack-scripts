/**
 * Feature
 * index-html
 */

const HtmlPlugin = require('html-webpack-plugin')

module.exports = function (options) {
    return {
        plugins: [
            new HtmlPlugin({
                template: './src/index.html'
            })
        ]
    }
}
