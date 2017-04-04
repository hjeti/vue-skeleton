const exec = require('child_process').exec;
const chalk = require('chalk');
const fs = require('fs');
const config = require('../config');

if(config.prePushEnabled)
{
	const outputPath = './eslinterror.txt';

	exec(`eslint src --ext .js -o ${outputPath}`, (error, stdout, stderr) => {
		if (error) {
			const eslintError = fs.readFileSync(outputPath, 'utf8');
			console.error(chalk.red(eslintError));
			console.error(chalk.yellow('fix eslint errors before pushing'));
			process.exit(1);
		}
	});
}

