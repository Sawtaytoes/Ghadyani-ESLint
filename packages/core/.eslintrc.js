module.exports = {
	env: {
		es6: true,
	},
	extends: [
		'eslint:recommended',
		'plugin:import/errors',
		'plugin:import/warnings',
	],
	parserOptions: {
		ecmaVersion: 2020,
		sourceType: 'module',
	},
	plugins: [
		'import',
		'sort-destructure-keys',
	],
	rules: {
		'array-bracket-newline': [
			'warn',
			{
				minItems: 2,
				multiline: true,
			},
		],
		'array-bracket-spacing': 'warn',
		'array-element-newline': 'warn',
		'arrow-parens': [
			'warn',
			'as-needed',
		],
		'arrow-body-style': 'error',
		'comma-dangle': [
			'warn',
			{
				arrays: 'always-multiline',
				objects: 'always-multiline',
				imports: 'always-multiline',
				exports: 'always-multiline',
				functions: 'only-multiline',
			},
		],
		'comma-style': 'warn',
		'eol-last': 'warn',
		'func-call-spacing': 'warn',
		'function-call-argument-newline': 'warn',
		'function-paren-newline': [
			'warn',
			{ minItems: 2 },
		],
		'key-spacing': 'warn',
		'keyword-spacing': 'warn',
		'import/no-unresolved': 'warn',
		// 'import/order': [
		// 	'warn',
		// 	{
		// 		// alphabetize: {
		// 		// 	caseInsensitive: true,
		// 		// 	order: 'asc',
		// 		// },
		// 		groups: [
		// 			[
		// 				'builtin',
		// 				'external',
		// 			],
		// 			[
		// 				'index',
		// 				'parent',
		// 				'sibling',
		// 			],
		// 		],
		// 	},
		// ],
		'indent': [
			'error',
			'tab',
			{
				ignoredNodes: ['ConditionalExpression'],
				MemberExpression: 0,
				SwitchCase: 1,
			},
		],
		'lines-between-class-members': 'warn',
		'multiline-ternary': 'warn',
		'new-parens': 'warn',
		'newline-per-chained-call': [
			'warn',
			{ ignoreChainWithDepth: 1 },
		],
		'no-console': 'off',
		'no-lonely-if': 'warn',
		'no-multi-spaces': [
			'warn',
			{ exceptions: {} },
		],
		'no-multiple-empty-lines': [
			'warn',
			{
				max: 1,
				maxBOF: 0,
				maxEOF: 1,
			},
		],
		'no-trailing-spaces': 'warn',
		'no-unneeded-ternary': [
			'warn',
			{ 'defaultAssignment': false },
		],
		'no-unused-vars': 'warn',
		'no-useless-computed-key': [
			'warn',
			{ enforceForClassMembers: true },
		],
		'no-whitespace-before-property': 'warn',
		'object-curly-newline': [
			'warn',
			{
				consistent: true,
				minProperties: 2,
				multiline: true,
			},
		],
		'object-curly-spacing': [
			'warn',
			'always',
		],
		'object-property-newline': 'warn',
		'one-var': [
			'warn',
			'never'
		],
		'operator-assignment': [
			'warn',
			'never'
		],
		'operator-linebreak': [
			'warn',
			'before'
		],
		'padded-blocks': [
			'warn',
			'never'
		],
		'padding-line-between-statements': [
			'warn',
			{
				blankLine: 'always',
				next: 'return',
				prev: '*',
			},
			{
				blankLine: 'always',
				next: '*',
				prev: [
					'const',
					'let',
					'var'
				],
			},
			{
				blankLine: 'any',
				next: [
					'const',
					'let',
					'var',
				],
				prev: [
					'const',
					'let',
					'var'
				],
			},
		],
		'prefer-exponentiation-operator': 'warn',
		'prefer-object-spread': 'warn',
		'quotes': [
			'warn',
			'single',
		],
		'quote-props': [
			'warn',
			'consistent-as-needed',
		],
		'semi': [
			'error',
			'never',
		],
		'semi-spacing': 'error',
		'semi-style': [
			'error',
			'first',
		],
		// 'sort-imports': [
		// 	'warn',
		// 	{
		// 		ignoreCase: true,
		// 		memberSyntaxSortOrder: [
		// 			'single',
		// 			'all',
		// 			'multiple',
		// 			'none',
		// 		],
		// 	},
		// ],
		'sort-destructure-keys/sort-destructure-keys': [
			'warn',
			{ caseSensitive: false },
		],
		'sort-keys': [
			'warn',
			'asc',
			{
				caseSensitive: false,
				natural: true,
			},
		],
		'sort-vars': [
			'warn',
			{ ignoreCase: true },
		],
		'space-before-blocks': 'warn',
		'space-before-function-paren': [
			'warn',
			{
				anonymous: 'never',
				named: 'never',
				asyncArrow: 'always',
			},
		],
		'space-in-parens': 'warn',
		'space-infix-ops': 'warn',
		'space-unary-ops': [
			'warn',
			{
				'words': true,
				'nonwords': true,
			},
		],
		'spaced-comment': 'warn',
		'strict': [
			'warn',
			'never',
		],
		'switch-colon-spacing': 'warn',
		'template-tag-spacing': 'warn',
		'wrap-iife': [
			'warn',
			'inside',
		],
		'wrap-regex': 'warn',
	},
}
