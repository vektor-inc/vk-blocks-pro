module.exports = {
	extends: ['plugin:@wordpress/eslint-plugin/recommended'],
	rules: {
		'import/no-unresolved': 'off',
		'import/no-extraneous-dependencies': 'off',
		camelcase: 'off',
		'@wordpress/no-unsafe-wp-apis': 'off',
		'@wordpress/i18n-translator-comments': 'off',
	},
};
