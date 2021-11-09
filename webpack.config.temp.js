const defaultConfig = require('@wordpress/scripts/config/webpack.config');
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
	...defaultConfig,
	output: {
		...defaultConfig.output,
		filename: 'block-build.js',
	},
	resolve: {
		...defaultConfig.resolve,
		alias: {
			...defaultConfig.resolve.alias,
			'@vkblocks': path.resolve(__dirname, 'src'),
		},
	}
};