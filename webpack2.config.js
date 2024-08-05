
// WordPress 6.5 以下の対策
const reactJSXRuntimePolyfill = {
	entry: {
		'react-jsx-runtime': {
			import: 'react/jsx-runtime',
		},
	},
	output: {
		path: __dirname + '/inc/vk-blocks/build/',
		filename: 'react-jsx-runtime.js',
		library: {
			name: 'ReactJSXRuntime',
			type: 'window',
		},
	},
	externals: {
		react: 'React',
	},
        // Other config...
};

module.exports = [ reactJSXRuntimePolyfill ];