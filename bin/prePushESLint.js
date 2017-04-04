const exec = require('child_process').exec;
const chalk = require('chalk');
const fs = require('fs');

const outputPath = './eslinterror.txt';

exec(`eslint src --ext .js -o ${outputPath}`, (error, stdout, stderr) => {
	if (error) {
		console.error(chalk.red(error));
		process.exit(1);
	}


});
