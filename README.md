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

## Configuration
Add a `.webpackrc` file to the root of your project. Following options are default:
```json
{
  "framework": "vanilla",
  "host": "localhost",
  "port": 3000,
  "browser": "google chrome",
  "favicon": null,
  "cssSourceMap": false
}
```

- `framework` Javascript framework that is used: "vanilla", "react" or "ng1"
- `port` Port to start development server at
- `browser` Browser to open development server in
- `favicon` Relative path to favicon.ico to copy to `dist`
- `cssSourceMap` Enable css / scss source maps (Causes style flash on initial load when running development server)

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
