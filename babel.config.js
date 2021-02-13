module.exports = ( api ) => {
	api.cache( true );

	return {
		presets: [ '@wordpress/babel-preset-default' ],
		plugins: [
			'@emotion/babel-plugin',
			'babel-plugin-inline-json-import',
			[
				"@wordpress/babel-plugin-makepot",
				{
					"output": "inc/vk-blocks/languages/vk-blocks-js.pot"
				}
			]
		 ],
	};
};
