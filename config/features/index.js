/**
 * Feature
 * index
 */

const merge = require('webpack-merge')

module.exports = function (options) {
    return merge(
        require('./clean')(options),
        require('./babel')(options),
        require('./index-html')(options),
        require('./vendor-chunk')(options),
        require('./html')(options),
        require('./sass')(options),
        require('./svg')(options),
        require('./media')(options),
        require('./favicon')(options),
        require('./sourcemaps')(options),
        require('./uglify')(options),
        require('./compress')(options),
        require('./zip')(options),
        require('./hot')(options),
        require('./profile')(options)
    )
}
