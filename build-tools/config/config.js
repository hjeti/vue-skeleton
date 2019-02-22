const path = require('path');
const argv = require('yargs').argv;

/*
change the publicPath if site is running in a subfolder on the server. It's also possible to override this
publicPath by using: yarn build -- --publicPath=/v/vue-skeleton/

When you don't know the publicPath at build time, you can set `window['webpackPublicPath']` before
loading any script in your HTML.
 */
let publicPath = '/';

if(argv.publicPath){
  publicPath = argv.publicPath;
}

// force leading /
if (!publicPath.startsWith('/')) {
  publicPath = `/${publicPath}`;
}
// force trailing /
if (!publicPath.endsWith('/')) {
  publicPath = `${publicPath}/`;
}

/*
It's also possible to override the version number during a build.

yarn build -- --versionNumber=v1
 */
let version = new Date().getTime();

if(argv.versionNumber){
  version = argv.versionNumber;
}

const versionPath = 'version/' + version + '/';

const buildTypes = {
  DEVELOPMENT: 'development',
  PRODUCTION: 'production'
};

module.exports = {
  buildTypes,

  projectRoot: path.resolve(__dirname, '../../'),

  compileNodeModules: false, // use babel to compile js code in node_modules

  devServer: {
    indexHtml: path.resolve(__dirname, '../../dist/index.html'),
    port: process.env.PORT || 8080,
    proxyTable: {},
    autoOpenBrowser: true,
    useHttps: false,
  },

  /* non-development builds */
  dist: {
    /* paths */
    versionPath,
    publicPath,

    /* optimization */
    enableImageOptimization: true,
    enablePNGQuant: true, // Best PNG optimizer but PNGQuant crashes on some images so use with caution.
    generateIcons: false, // generates icons for all platforms with favicon.png from static/image/favicon.png as the source image
    pngQuantQuality: '65',
  },

  /* tooling */
  enableBundleAnalyzer: !!argv.analyze,
  lintStaged: {
    eslintEnabled: true,
    tslintEnabled: true,
    stylelintEnabled: true,
  },

  /* environment variables (set using DefinePlugin) */
  env: {
    [buildTypes.PRODUCTION]: {
      NODE_ENV: JSON.stringify('production'),
      VERSIONED_STATIC_ROOT: JSON.stringify(versionPath + 'static/'),
      STATIC_ROOT: JSON.stringify(''),
      PUBLIC_PATH: JSON.stringify(publicPath),
    },
    [buildTypes.DEVELOPMENT]: {
      NODE_ENV: JSON.stringify('development'),
      VERSIONED_STATIC_ROOT: JSON.stringify('static/'),
      STATIC_ROOT: JSON.stringify(''),
      PUBLIC_PATH: JSON.stringify('/'),
    }
  },
};
