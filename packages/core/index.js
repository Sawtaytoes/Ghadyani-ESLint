module.exports = {
	env: {
		es6: true,
	},
	extends: [
		'eslint:recommended',
	],
	parserOptions: {
		ecmaVersion: 2018,
		sourceType: 'module',
	},
	plugins: [
		'import',
	],
	rules: {
		'comma-dangle': [
			'warn',
			'always-multiline',
		],
		'import/no-unresolved': 'warn',
		'no-console': 'off',
		'no-unused-vars': 'warn',
		'semi': [
			'error',
			'never',
		],
		'strict': [
			'warn',
			'never',
		],
	},
}
