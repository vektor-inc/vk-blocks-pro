module.exports = ( api ) => {
	api.cache( true );

	return {
		presets: [ '@wordpress/default' ],
		plugins: [
			'@emotion/babel-plugin',
			'babel-plugin-inline-json-import'
		 ],
	};
};
