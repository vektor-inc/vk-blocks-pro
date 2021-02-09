const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );
const path = require( 'path' );

module.exports = {
	...defaultConfig,
	entry: __dirname + '/src/blocks/index.js',
	output: {
		path: __dirname + '/inc/vk-blocks/build/',
		filename: 'block-build.js',
	},
	resolve: {
		...defaultConfig.resolve,
		alias: {
			...defaultConfig.resolve.alias,
			'@vkblocks': path.resolve( __dirname, 'src' ),
		},
	},
	module: {
		...defaultConfig.module,
		rules: [
			...defaultConfig.module.rules,
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [ '@babel/preset-env' ],
						plugins: [
							'@babel/plugin-transform-react-jsx',
							[
								// JSをスキャンして、potを作成/アップデート
								'@wordpress/babel-plugin-makepot',
								{
									output: __dirname + `/inc/vk-blocks/languages/vk-blocks.pot`,
								},
							],
						],
					},
				},
			},
		],
	}
};
