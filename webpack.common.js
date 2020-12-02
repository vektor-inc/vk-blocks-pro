const wplib = [
	'blocks',
	'components',
	'date',
	'editor',
	'element',
	'i18n',
	'utils',
	'data',
	'icons',
	'block-editor'
];

module.exports = {
	entry: './src/blocks/bundle.js',
	output: {
		filename: './inc/vk-blocks/build/block-build.js',
		library: ['wp', '[name]'],
    	libraryTarget: 'window',
	},
	// add every value to externals by Array.reduce().
	externals: wplib.reduce((externals, lib) => {
		externals[`@wordpress/${ lib }`] = {
		  window: ['wp', lib],
		};
		return externals;
	}, {}),
	module: {
		rules: [
			{
				test: /\.svg$/,
				use: [
					{
						loader: 'babel-loader',
					},
					{
						loader: 'svg-react-loader',
						options: {
							jsx: true, // true outputs JSX tags
						},
					},
				],
			},
			{
				test: /\.(jpg|png)$/,
				loader: 'url-loader',
			},
			{
				test: /\.css/,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: { url: false },
					},
				],
			},
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [ '@babel/preset-react ' ],
						// presets: [ '@babel/preset-env' ],
						plugins: [
							'@babel/plugin-syntax-jsx',
							'@babel/plugin-transform-react-jsx',
							[
								// JSをスキャンして、potを作成/アップデート
								'@wordpress/babel-plugin-makepot',
								{
									output: `./inc/vk-blocks/build/languages/vk-blocks.pot`,
								},
							],
						],
					},
				},
			},
		],
	},
};
