/**
 * Feature
 * zip
 */

const git = require('git-repo-info')
const ZipPlugin = require('zip-webpack-plugin')

module.exports = function (options) {
    // Skip on development builds
    if (!options.env.production) {
        return
    }

    const commit = git(options.paths.app).sha.substr(0, 7)

    return {
        plugins: [
            new ZipPlugin({
                filename: `${options.pkg.name}-${commit}.zip`,
                exclude: [
                    /(vendor|manifest).*map/,
                    /.*css\.map/,
                    /manifest\.json/
                ]
            })
        ]
    }
}
