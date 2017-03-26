// https://github.com/shelljs/shelljs
require('shelljs/global');
env.NODE_ENV = 'production';

const path = require('path');
const config = require('../config');
const ora = require('ora');
const webpack = require('webpack');
const webpackConfig = require('./webpack.prod.conf');
const fs = require('fs-extra');

const spinner = ora('building for production...');
spinner.start();

//empty build folder because webpack-cleanup-plugin doesn't remove folders
fs.emptyDirSync(webpackConfig.output.path);

webpack(webpackConfig, function (err, stats) {
	spinner.stop();
	if (err) throw err;
	process.stdout.write(stats.toString({
			colors: true,
			modules: false,
			children: false,
			chunks: false,
			chunkModules: false,
			reasons: false
		}) + '\n')
});
