#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const rc = require('rc')
const chalk = require('chalk')
const open = require('open')
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')

const config = require('./config/webpack.config')

const args = process.argv.slice(2)
const script = args[0]

const appDir = fs.realpathSync(process.cwd())
const pkg = JSON.parse(
    fs.readFileSync(path.join(appDir, 'package.json'), { encoding: 'utf-8' })
)

const userConfig = rc('webpack', {
    framework: 'vanilla',
    host: 'localhost',
    port: 3000,
    browser: 'google chrome',
    copy: null,
    cssSourceMap: false,
    alias: null,
    zip: false,
    bugsnagApiKey: null,
    outputPath: 'dist',
    publicPath: '/',
    sourceMaps: true,
    gzip: true
})

const options = {
    profile: false,
    env: {
        production: true
    },
    pkg: pkg,
    framework: userConfig.framework,
    host: userConfig.host,
    port: userConfig.port,
    browser: userConfig.browser,
    copy: userConfig.copy,
    cssSourceMap: userConfig.cssSourceMap,
    alias: userConfig.alias,
    zip: userConfig.zip,
    bugsnagApiKey: userConfig.bugsnagApiKey,
    sourceMaps: userConfig.sourceMaps,
    gzip: userConfig.gzip,
    paths: {
        app: appDir,
        src: path.resolve(appDir, 'src'),
        output: path.resolve(appDir, userConfig.outputPath),
        publicPath: userConfig.publicPath,
        resolveInAppNodeModules: request => {
            return require.resolve(request, {
                paths: [path.resolve(appDir, 'node_modules')]
            })
        }
    }
}

switch (script) {
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

        console.log(
            stats.toString({
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
            }) + '\n'
        )

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
 * Start development server using webpack-dev-server.
 */
function start() {
    console.log(chalk.cyan('Starting development server...\n'))

    options.env.production = false

    const compiler = webpack(config(options))
    const host = options.host
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
        quiet: true,
        before: app => {
            // Intercept request
            // app.get('/', (req, res) => {
            //     res.status(204).send()
            // })
        }
    })

    server.listen(options.port, host, err => {
        if (err) {
            console.log(chalk.red.bold(err.message) + '\n')
            process.exit(1)
        }

        console.log(chalk.green(`Started development server at ${url}\n`))

        open(url, { app: options.browser })
    })
}
