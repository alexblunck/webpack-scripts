# webpack-scripts
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
Add a `.webpackrc` file to the root of your project. Following options are available:
```json
{
  "framework": "vanilla",
  "port": "3000",
  "browser": "google chrome",
  "favicon": "./src/assets/img/favicon.png"
}
```

- `framework` Javascript framework that is used: "vanilla", "react" or "ng1"
- `port` Port to start development server at
- `browser` Browser to open development server in
- `favicon` Relative path to image to use as favicon

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
