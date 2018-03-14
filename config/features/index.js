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
        require('./html')(options),
        require('./markdown')(options),
        require('./sass')(options),
        require('./svg')(options),
        require('./files')(options),
        require('./images')(options),
        require('./favicon')(options),
        require('./sourcemaps')(options),
        require('./compress')(options),
        require('./zip')(options),
        require('./profile')(options)
    )
}
