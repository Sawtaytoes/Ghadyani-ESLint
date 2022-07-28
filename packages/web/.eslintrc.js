module.exports = {
	env: {
		browser: true,
	},
	extends: [
		'@ghadyani-eslint/core',
	],
	globals: {
		document: 'readonly',
		navigator: 'readonly',
		window: 'readonly',
	},
	parser: '@babel/eslint-parser',
	plugins: [
		'compat',
	],
	rules: {
		'compat/compat': 'warn',
	},
}
