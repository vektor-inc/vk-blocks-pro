const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );
module.exports = {
	...defaultConfig,
	entry: './src/blocks/bundle.js',
	output: {
		filename: './inc/vk-blocks/build/block-build.js',
	}
};
