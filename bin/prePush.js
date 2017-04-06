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
		config.prePush.forEach(taskName => {
			const task = prePush.tasks.find(task => task.name === taskName);
			if (task) {
				tasks.push(task.run());
			} else {
				console.error(chalk.red(`Pre-push task ${taskName} is not found and is not executed before pushing`));
			}
		});

		Promise.all(tasks).then(() => {
			if(prePush.errors.length === 0) process.exit(0);

			prePush.errors.forEach((error) => {
				const lintError = fs.readFileSync(error.outputPath, 'utf8');
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
			prePush.errors.push({ outputPath: outputPath, executable: executable });
		}
	},

	/**
	 * Add tasks here you probably want to run before pushing your code to a repo.
	 */
	tasks: [
		{
			name: 'esLintCheck',
			run: () => {
				const linter = 'eslint';
				const linterBinary = path.resolve(__dirname, `../node_modules/.bin/${linter}`);
				const outputPath = path.resolve(__dirname, `../${linter}error.txt`);
				const sourceDir = path.resolve(__dirname, `../src`);

				return pify(shell.exec)(`${linterBinary} ${sourceDir} --ext .js -o ${outputPath}`)
					.catch((error, stdout, stderr) => prePush.errorHandler(error, stdout, stderr, linter, outputPath))
			}
		},
		{
			name: 'tsLintCheck',
			run: () => {
				const linter = 'tslint';
				const linterBinary = path.resolve(__dirname, `../node_modules/.bin/${linter}`);
				const outputPath = path.resolve(__dirname, `../${linter}error.txt`);
				const sourceDir = './src/**/*.ts';
				const tsConfig = path.resolve(__dirname, '../tsconfig.json');
				const lintingRules = path.resolve(__dirname, '../.tslintrc.js');

				return pify(shell.exec)(`${linterBinary} "${sourceDir}" -o ${outputPath} -p ${tsConfig} -c ${lintingRules}`)
					.catch((error, stdout, stderr) => prePush.errorHandler(error, stdout, stderr, linter, outputPath));
			}
		}
	],
};

prePush.run();
