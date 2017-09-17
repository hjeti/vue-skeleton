const path = require('path');
const chalk = require('chalk');
const fs = require('fs');
const config = require('../config');
const shell = require('shelljs');
const pify = require('pify');

const prePush = {
	errors: [],

	run: () => {
		if (!config.prePush || config.prePush.length === 0) process.exit(0);
		const tasks = [];

		// Check if task is available when available push it to the task array.
		config.prePush.forEach(prePushTask => {
			const task = prePush.tasks.find(availableTask => availableTask.name === prePushTask.name);
			if (task) {
				tasks.push(task.run(prePushTask.options));
			} else {
				console.error(chalk.red(`Pre-push task ${prePushTask.name} is not found and is not executed before pushing`));
			}
		});

		Promise.all(tasks).then(() => {
			if(prePush.errors.length === 0) process.exit(0);

			prePush.errors.forEach((error) => {
				const lintError = error.outputPath ? fs.readFileSync(error.outputPath, 'utf8') : error.stdout;
				console.error(chalk.yellow(
					`\nYour push contains files that should pass ${error.executable} but do not.\nPlease fix the ${error.executable} errors and try again.`
				));

				console.error(chalk.red(lintError));
			});

			process.exit(1);
		});
	},

	errorHandler: (error, stdout, stderr, executable, outputPath) => {
		if (error) {
			prePush.errors.push({ outputPath, executable, stdout });
		}
	},

	/**
	 * Add tasks here you probably want to run before pushing your code to a repo.
	 */
	tasks: [
		{
			name: 'esLintCheck',
			run: (options) => {
				const linter = 'eslint';
				const linterBinary = path.resolve(__dirname, `../node_modules/.bin/${linter}`);
				const outputPath = path.resolve(__dirname, `../${linter}error.txt`);
				const sourceDir = path.resolve(__dirname, `../src`);

				return pify(shell.exec)(`${linterBinary} ${sourceDir} --ext .js -o ${outputPath} --cache`)
					.catch((error, stdout, stderr) => prePush.errorHandler(error, stdout, stderr, linter, outputPath))
			}
		},
		{
			name: 'tsLintCheck',
			run: (options) => {
				let excludeArgument = '';

				if (options && prePush.hasOption(options, 'exclude') && options.exclude instanceof Array) {
					excludeArgument = options.exclude.map(item => `--exclude "${item}"`).join(' ');
				}

				const linter = 'tslint';
				const linterBinary = path.resolve(__dirname, `../node_modules/.bin/${linter}`);
				const outputPath = path.resolve(__dirname, `../${linter}error.txt`);
				const sourceDir = './src/**/*.ts';
				const tsConfig = path.resolve(__dirname, '../tsconfig.json');
				const lintingRules = path.resolve(__dirname, '../.tslintrc.js');

				return pify(shell.exec)(`${linterBinary} "${sourceDir}" ${excludeArgument} -o ${outputPath} -p ${tsConfig} -c ${lintingRules}`)
					.catch((error, stdout, stderr) => prePush.errorHandler(error, stdout, stderr, linter, outputPath));
			}
		},
		{
			name: 'styleLintCheck',
			run: (options) => {
				const linter = 'stylelint';
				const linterBinary = path.resolve(__dirname, `../node_modules/.bin/${linter}`);
				const sourceDir = path.resolve(__dirname, '../src/**/*.scss');
				const outputPath = path.resolve(__dirname, `../${linter}error.txt`);

				return pify(shell.exec)(`${linterBinary} "${sourceDir}" > ${outputPath} --cache`)
					.catch((error, stdout, stderr) => prePush.errorHandler(error, stdout, stderr, linter, outputPath))

			}
		}
	],

	hasOption: (options, optionName) => {
		return options.hasOwnProperty(optionName);
	},
};

prePush.run();
