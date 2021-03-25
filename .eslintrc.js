const defaultConfig = require('@wordpress/scripts/config/.eslintrc.js');
module.exports = {
	...defaultConfig,
	rules: {
		...defaultConfig.rules,
		'import/no-unresolved': 'off',
		'import/no-extraneous-dependencies': 'off',
		camelcase: 'off',
	},
};
