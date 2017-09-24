module.exports = {
	extends: [
		'tslint-config-airbnb',
		'tslint-config-prettier',
	],
	defaultSeverity: 'error',
	rules: {
		'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
		'no-console': process.env.NODE_ENV === 'production' ? 1 : 0,
		'prefer-array-literal': [ true, { 'allow-type-parameters': true } ],
		'variable-name': [ true, 'allow-pascal-case' ],
		'max-line-length': [true, 120],
	},
};
