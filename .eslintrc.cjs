module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: 'airbnb-base',
	overrides: [
	],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	rules: {
		'arrow-parens': ['error', 'as-needed'],
		'max-len': ['error', { code: 120 }],
		'no-multiple-empty-lines': ['error', { max: 2 }],
		'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
		'no-tabs': ['error', { allowIndentationTabs: true }],
		'padded-blocks': ['error', { classes: 'always' }],
		'space-in-parens': ['error', 'always', { exceptions: ['{}'] }],
		indent: ['error', 'tab'],
		semi: ['error', 'never'],
		yoda: ['error', 'always'],
		'import/prefer-default-export': 0,
	},
}
