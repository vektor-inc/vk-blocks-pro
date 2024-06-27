module.exports = ( api ) => {
	api.cache( true );

	return {
		presets: [
			['@babel/preset-env'],
			'@wordpress/babel-preset-default'
		  ],
		plugins: [
			'@emotion/babel-plugin',
			'babel-plugin-inline-json-import',
			"@babel/plugin-transform-async-to-generator",
    		"@babel/plugin-transform-regenerator"
		 ],
	};
};
