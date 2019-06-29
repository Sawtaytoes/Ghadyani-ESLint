module.exports = {
	env: {
		browser: true,
	},
	extends: [
		'plugin:react/recommended',
		'@ghadyani-eslint/core',
	],
	parser: 'babel-eslint',
	parserOptions: {
		'ecmaFeatures': {
			jsx: true,
			modules: true,
		},
	},
	rules: {
		'compat/compat': 'warn',
		'jsx-quotes': 'error',
		'no-multi-spaces': 'error',
		'react/jsx-boolean-value': 'error',
		'react/jsx-closing-bracket-location': 'error',
		'react/jsx-closing-tag-location': 'error',
		'react/jsx-curly-spacing': 'error',
		'react/jsx-pascal-case': 'error',
		'react/jsx-tag-spacing': 'error',
		'react/jsx-uses-react': 'warn',
		'react/jsx-uses-vars': 'warn',
		'react/no-string-refs': 'error',
		'react/prop-types': 'warn',
		'react/react-in-jsx-scope': 'warn',
		'react/self-closing-comp': 'error',
	},
	plugins: [
		'compat',
		'react',
	],
}
