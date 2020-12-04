const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );
module.exports = {
	...defaultConfig,
	entry: __dirname + '/src/blocks/bundle.js',
	output: {
		path: __dirname + '/inc/vk-blocks/build/',
		filename: 'block-build.js',
	},
	module: {
		...defaultConfig.module,
		rules: [
			...defaultConfig.module.rules,
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
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
	},
};
