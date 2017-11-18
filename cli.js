#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const config = require('./config/webpack.config')

const args = process.argv.slice(2)
const script = args[0]

const appDir = fs.realpathSync(process.cwd())
const pkg = JSON.parse(fs.readFileSync(path.join(appDir, 'package.json'), { encoding: 'utf-8' }))

const options = {
    profile: false,
    env: {
        production: true
    },
    pkg: pkg,
    paths: {
        app: appDir,
        src: path.resolve(appDir, 'src'),
        output: path.resolve(appDir, 'dist')
    }
}

switch(script) {
    case 'build':
        build()
        break
    case 'profile':
        profile()
        break
    case 'start':
        start()
        break
}

function build() {
    const compiler = webpack(config(options))

    compiler.run((err, stats) => {
        if (err) {
            console.error(err)
            return
        }

        const str = stats.toString({
            colors: true,
            modules: false,
            children: false,
            chunks: false,
            chunkModules: false
        })

        console.log(str)
    })
}

function profile() {
    options.profile = true
    build()
}

function start() {
    options.env.production = false

    const compiler = webpack(config(options))

    const server = new WebpackDevServer(compiler, {
        hot: true,
        host: 'localhost',
        stats: 'errors-only',
        historyApiFallback: true,
        compress: true,
        inline: true,
        overlay: true,
        clientLogLevel: 'none'
    })

    server.listen(3000, 'localhost', err => {
        if (err) {
            return console.log(err)
        }
    })
}

