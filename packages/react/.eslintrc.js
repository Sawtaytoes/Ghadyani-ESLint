module.exports = {
	extends: [
		'plugin:react/recommended',
		'plugin:react-hooks/recommended',
		'@ghadyani-eslint/web',
	],
	// parser: '@babel/eslint-parser',
	parserOptions: {
		'ecmaFeatures': {
			jsx: true,
			modules: true,
		},
	},
	plugins: [
		'react',
	],
	rules: {
		'jsx-quotes': 'error',
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
	settings: {
		react: {
			version: 'detect',
		},
	},
}
