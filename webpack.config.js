let defaultConfig = require( '@wordpress/scripts/config/webpack.config' );
defaultConfig.module.rules.splice(0, 1) // JSをトランスパイルするルールを削除。下の独自ルールでPOTファイルを上書きして空にしてしまう。
const path = require( 'path' );

let entries = {
  'blocks/index': __dirname + '/src/blocks/index.js',
  'admin/index': __dirname + '/src/admin/index.js',
};

module.exports = {
	...defaultConfig,
	entry: entries,
	output: {
		path: __dirname + '/inc/vk-blocks/build/',
		filename: '[name]-build.js',
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
				exclude: /(node_modules)/,
				use: {
					loader: 'babel-loader',
					options: {
						cacheDirectory: false, // キャッシュをOFF。理由：vk-blocks-js.pot を消した時に変更箇所以外の文字列が抽出されなくなる。
						babelrc: false, // babelrcを反映させない
						configFile: false, // babel.config.jsonを反映させない
						presets: [ "@wordpress/default" ],
						plugins: [
							[
								"@wordpress/babel-plugin-makepot",
								{
									"output": "inc/vk-blocks/languages/vk-blocks-js.pot"
								}
							]
						],
					}
				}
			}
		]
	}
};
