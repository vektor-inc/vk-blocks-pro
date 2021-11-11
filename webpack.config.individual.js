const defaultConfig = require('@wordpress/scripts/config/webpack.config');
const path = require('path');

// 書き出し先のファイルを消してしまう処理をトルツメ
defaultConfig.plugins.shift();

// ↓ CleanWebpackPlugin が 先頭じゃなくなったとき用
// for (let i = 0; i < defaultConfig.plugins.length; i++) {
// 	const pluginInstance = defaultConfig.plugins[i];
// 	if ('CleanWebpackPlugin' === pluginInstance.constructor.name) {
// 		defaultConfig.plugins.splice(i, i);
// 	}
// }

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