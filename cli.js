#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const rc = require('rc')
const chalk = require('chalk')
const webpack = require('webpack')
const serve = require('webpack-serve')

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
    cssSourceMap: false
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
        on: {
            listening: () => {
                console.log(chalk.green(`Started development server at ${url}\n`))
            }
        }
    })
}

