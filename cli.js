#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const rc = require('rc')
const chalk = require('chalk')
const opn = require('opn')
const webpack = require('webpack')
const serve = require('webpack-serve')
const history = require('connect-history-api-fallback')
const convert = require('koa-connect')
const WebpackDevServer = require('webpack-dev-server')

const config = require('./config/webpack.config')

const args = process.argv.slice(2)
const script = args[0]

const appDir = fs.realpathSync(process.cwd())
const pkg = JSON.parse(fs.readFileSync(path.join(appDir, 'package.json'), { encoding: 'utf-8' }))

const userConfig = rc('webpack', {
    framework: 'vanilla',
    port: 3000,
    browser: 'google chrome',
    favicon: null,
    cssSourceMap: false,
    devServer: 'webpack-dev-server' // "webpack-serve" or "webpack-dev-server"
})

const options = {
    profile: false,
    env: {
        production: true
    },
    pkg: pkg,
    framework: userConfig.framework,
    port: userConfig.port,
    browser: userConfig.browser,
    favicon: userConfig.favicon,
    cssSourceMap: userConfig.cssSourceMap,
    devServer: userConfig.devServer,
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

            // Make sure error results in non-zero exit code
            process.on('beforeExit', () => {
                process.exit(1)
            })

            return
        }

        if (stats.hasErrors()) {
            console.log(stats.toString('errors-only') + '\n')
            process.exit(1)
        }

        console.log(stats.toString({
            colors: true,
            assetsSort: 'name',
            cachedAssets: false,
            warnings: false,
            modules: false,
            children: false,
            chunks: false,
            chunkModules: false,
            entrypoints: false,
            performance: false
        }) + '\n')

        console.log(chalk.green(`Build finished\n`))
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

    if (options.devServer === 'webpack-serve') {
        startWebpackServe()
    } else if (options.devServer === 'webpack-dev-server') {
        startWebpackDevServer()
    }
}

/**
 * Start development server using webpack-serve.
 */
function startWebpackServe() {
    const port = options.port
    const url = `http://localhost:${port}`

    serve({
        config: config(options),
        logLevel: 'error',
        port: port,
        dev: {
            publicPath: '/',
            logLevel: 'error'
        },
        hot: {
            logLevel: 'error'
        },
        open: {
            app: options.browser
        },
        add: (app) => {
            // History API fallback
            app.use(convert(history()))
        },
        on: {
            listening: () => {
                console.log(chalk.green(`Started development server at ${url}\n`))
            }
        }
    })
}

/**
 * Start development server using webpack-dev-server.
 */
function startWebpackDevServer() {
    const compiler = webpack(config(options))
    const host = 'localhost'
    const url = `http://${host}:${options.port}`

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

    server.listen(options.port, host, err => {
        if (err) {
            console.log(chalk.red.bold(err.message) + '\n')
            process.exit(1)
        }

        console.log(chalk.green(`Started development server at ${url}\n`))

        opn(url, { app: options.browser })
    })
}
