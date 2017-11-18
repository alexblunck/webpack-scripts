/**
 * Feature
 * index-html
 */

const path = require('path')
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
