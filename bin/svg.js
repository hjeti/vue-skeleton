const path = require('path');
const fs = require('fs');
const async = require('async');
const SVGO = require('svgo');
const toCamelCase = require('to-camel-case');

const sourceDirectory = path.resolve(__dirname, '../asset/svg');
const targetDirectory = path.resolve(__dirname, '../src/asset/svg');

const files = fs.readdirSync(sourceDirectory).filter((file)=> path.extname(file) === '.svg');

let svgo = new SVGO({
	plugins: [
		{
			removeStyleElement: true
		},
		{
			removeComments: true
		},
		{
			removeDesc: true
		},
		{
			removeUselessDefs: true
		},
		{
			removeTitle: true,
		},
		{
			removeMetadata: true,
		},
		{
			removeComments: true,
		},
		{
			cleanupIDs: {
				remove: true,
				prefix: ''
			}
		},
	]
});

async.each(files, processSvg, generateIndex);

function processSvg(file, done) {
	const filePath = path.join(sourceDirectory, file);

	fs.readFile(filePath, 'utf8', (err, data) => {
		if (err) {
			throw err;
		}

		svgo.optimize(data, (result) => {
			const outputFilePath = path.join(targetDirectory, file);
			fs.writeFile(outputFilePath, result.data, 'utf-8', (error) => {
				if(!error)
				{
					done();
				}
			});
		});
	});
}

function generateIndex(){
	const imports = [];
	const exports = [];

	files.forEach((file)=> {
		const fileName = file.replace('.svg', '');
		const fileNameCamelCase = toCamelCase(fileName);

		imports.push(`import ${fileNameCamelCase} from './${file}';\n`);

		if(fileName != fileNameCamelCase){
			exports.push(`	'${fileName}': ${fileNameCamelCase},\n`);
		} else {
			exports.push(`	${fileName},\n`);
		}
	});

	output = `${imports.join('')}
export default {
${exports.join('')}};
`;

	const outputFilePath = path.join(targetDirectory, 'index.js');
	fs.writeFile(outputFilePath, output, 'utf-8', (error) => {
		if(!error)
		{
			console.log(`Processed ${files.length} svg(s)`);
		}
	});
}



