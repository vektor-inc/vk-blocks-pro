const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );
module.exports = {
	...defaultConfig,
	entry: __dirname + '/src/blocks/bundle.js',
	output: {
		path: __dirname + '/inc/vk-blocks/build/',
		filename: 'block-build.js',
	}
};
