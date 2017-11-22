#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const rc = require('rc')
const chalk = require('chalk')
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const openBrowser = require('react-dev-utils/openBrowser')

const config = require('./config/webpack.config')

const args = process.argv.slice(2)
const script = args[0]

const appDir = fs.realpathSync(process.cwd())
const pkg = JSON.parse(fs.readFileSync(path.join(appDir, 'package.json'), { encoding: 'utf-8' }))

const userConfig = rc('webpack', {
    framework: 'vanilla',
    port: 3000,
    browser: 'google chrome',
    favicon: null
})

const options = {
    framework: userConfig.framework,
    profile: false,
    env: {
        production: true
    },
    pkg: pkg,
    port: userConfig.port,
    browser: userConfig.browser,
    favicon: userConfig.favicon,
    paths: {
        app: appDir,
        src: path.resolve(appDir, 'src'),
        output: path.resolve(appDir, 'dist'),
        resolveInAppNodeModules: request => {
            return require.resolve(request, {
                paths: [path.resolve(appDir, 'node_modules')]
            })
        }
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

/**
 * Build application.
 */
function build() {
    console.log(chalk.cyan('Building application...\n'))

    const compiler = webpack(config(options))

    compiler.run((err, stats) => {
        if (err) {
            console.log(chalk.red.bold(err.message) + '\n')
            process.exit(1)
        }

        if (stats.hasErrors()) {
            console.log(stats.toString('errors-only') + '\n')
            process.exit(1)
        }

        console.log(stats.toString({
            colors: true,
            warnings: false,
            modules: false,
            children: false,
            chunks: false,
            chunkModules: false
        }) + '\n')
    })
}

/**
 * Build & profile application.
 */
function profile() {
    options.profile = true
    build()
}

/**
 * Start development server.
 */
function start() {
    console.log(chalk.cyan('Starting development server...\n'))

    options.env.production = false

    const port = options.port
    const host = 'localhost'
    const url = `http://${host}:${port}`

    const compiler = webpack(config(options))

    const server = new WebpackDevServer(compiler, {
        hot: true,
        host: host,
        stats: 'errors-only',
        historyApiFallback: true,
        compress: true,
        inline: true,
        overlay: true,
        clientLogLevel: 'none',
        quiet: true
    })

    server.listen(port, host, err => {
        if (err) {
            console.log(chalk.red.bold(err.message) + '\n')
            process.exit(1)
        }

        console.log(chalk.green(`Started development server at ${url}\n`))

        process.env.BROWSER = options.browser
        openBrowser(url)
    })
}

