const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );
const path = require('path');

module.exports = {
	...defaultConfig,
    entry: __dirname + '/src/blocks/spacer/editor.js',
	output: {
		path: __dirname + '/inc/vk-blocks/build/spacer/',
		filename: 'index.js',
	},
    resolve: {
		...defaultConfig.resolve,
		alias: {
			...defaultConfig.resolve.alias,
			'@vkblocks': path.resolve( __dirname, 'src' ),
		},
	},
}