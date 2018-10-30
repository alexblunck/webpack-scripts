/**
 * Feature
 * zip
 */

const git = require('git-repo-info')
const ZipPlugin = require('zip-webpack-plugin')

module.exports = function (options) {
    // Skip on development builds or if disabled
    if (!options.env.production || !options.zip) {
        return
    }

    const sha = git(options.paths.app).sha
    const commit = sha ? sha.substr(0, 7) : null

    let filename = options.pkg.name

    if (commit) {
        filename += `-${commit}`
    }

    filename += '.zip'

    return {
        plugins: [
            new ZipPlugin({
                filename,
                exclude: [
                    /vendor.*map/,
                    /.*css\.map/
                ]
            })
        ]
    }
}
