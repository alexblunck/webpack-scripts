/**
 * Feature
 * favicon
 */

const FaviconsWebpackPlugin = require('favicons-webpack-plugin')

module.exports = function (options) {
    if (!options.favicon) {
        return
    }

    return {
        plugins: [
            new FaviconsWebpackPlugin({
                logo: options.favicon,
                prefix: '[hash]-',
                icons: {
                    android: false,
                    appleIcon: false,
                    appleStartup: false,
                    coast: false,
                    favicons: true,
                    firefox: false,
                    opengraph: false,
                    twitter: false,
                    yandex: false,
                    windows: false
                }
            })
        ]
    }
}
