module.exports = {
	root: true,
	extends: ['plugin:@wordpress/eslint-plugin/recommended'],
	rules: {
		'import/no-unresolved': 'off',
		'import/no-extraneous-dependencies': 'off',
		camelcase: 'off',
		'@wordpress/no-unsafe-wp-apis': 'off',
		'@wordpress/i18n-translator-comments': 'off',
		'react-hooks/exhaustive-deps': 'off',
		'no-shadow': 'off',
		'jsdoc/no-undefined-types': 'off',
		'react-hooks/rules-of-hooks': 'off',
	},
};
