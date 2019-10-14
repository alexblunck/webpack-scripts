# webpack-scripts

[![Latest Version on NPM](https://img.shields.io/npm/v/@blunck/webpack-scripts.svg?style=flat-square)](https://www.npmjs.com/package/@blunck/webpack-scripts)

Opinionated webpack scripts

## Installation

```bash
npm install --save-dev @blunck/webpack-scripts
```

Add scripts to you `package.json`

```json
{
    "scripts": {
        "start": "webpack-scripts start",
        "build": "webpack-scripts build",
        "profile": "webpack-scripts profile"
    }
}
```

## Requirements

The webpack configuration expects the root of your project to contain a `src` directory with an `index.js` & `index.html` file:

```
src
  index.js
  index.html
package.json
.webpackrc
```

## Configuration

Add a `.webpackrc` file to the root of your project. Following options are default:

```json
{
    "framework": "vanilla",
    "host": "localhost",
    "port": 3000,
    "browser": "google chrome",
    "copy": null,
    "cssSourceMap": false,
    "alias": null,
    "zip": false,
    "bugsnagApiKey": null,
    "outputPath": "dist",
    "publicPath": "/",
    "sourceMaps": true,
    "gzip": true
}
```

-   `framework` Javascript framework that is used: "vanilla", "react" or "ng1"
-   `port` Port to start development server at
-   `browser` Browser to open development server in
-   `copy` Array of patterns to copy to `outputPath`. See [Copy Webpack Plugin](https://github.com/webpack-contrib/copy-webpack-plugin#patterns) for more info

-   `cssSourceMap` Enable css / scss source maps (Causes style flash on initial load when running development server)
-   `alias` Create aliases to import or require certain modules more easily. See [Webpack Documentation](https://webpack.js.org/configuration/resolve/#resolve-alias) for more info
-   `zip` If true create zip archive with build artifacts with following name: `PROJECT_NAME-GIT_COMMIT_HASH.zip`
-   `bugsnagApiKey` If set upload source maps to bugsnag
-   `outputPath` The output directory relative to th `.webpackrc` file
-   `publicPath` Public URL of the output directory when referenced in a browser
-   `sourceMaps` Set to `false` to disable generation of js & css source maps
-   `gzip` Set to `false` to prevent js / css files from being gzipped

## Scripts

### Build

Build a production version of your application

```bash
npm run build
```

### Start

Start a development server & re-compile / reload on changes. (HMR support for react)

```bash
npm run start
```

### Profile

Build a production version of your application & open a page
with information about your bundle.

```bash
npm run profile
```
