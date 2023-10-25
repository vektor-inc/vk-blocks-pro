module.exports = ( api ) => {
	api.cache( true );

	return {
		presets: [
			['@babel/preset-env', {
			  "modules": "commonjs"
			}],
			'@wordpress/babel-preset-default'
		  ],
		plugins: [
			'@emotion/babel-plugin',
			'babel-plugin-inline-json-import'
		 ],
	};
};
