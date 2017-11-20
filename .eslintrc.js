// http://eslint.org/docs/user-guide/configuring

module.exports = {
	root: true,
	parser: 'babel-eslint',
	parserOptions: {
		sourceType: 'module',
	},
	env: {
		browser: true,
	},
	extends: ['airbnb-base', 'prettier'],
	plugins: ['html', 'import', 'prettier'],
	settings: {
		'import/resolver': {
			webpack: {
				config: 'build/webpack.base.conf.js',
			},
		},
	},
	rules: {
		// don't require .vue extension when importing
		'import/extensions': [
			'error',
			'always',
			{
				js: 'never',
				vue: 'never',
				ts: 'never',
			},
		],
		// allow debugger during development
		'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
		'no-console': process.env.NODE_ENV === 'production' ? 1 : 0,
		'no-tabs': 0,
		'max-len': ['error', 120],
		'no-param-reassign': 0,
		'prettier/prettier': [
			'error',
			{ singleQuote: true, trailingComma: 'all', printWidth: 120, tabWidth: 4, useTabs: true },
		],
	},
};
