module.exports = {
	rootDir: '../',
	// @vkblocks エイリアスを jestで使う
	moduleNameMapper: {
		"^@vkblocks/(.+)": "<rootDir>/src/$1"
	},
	preset: '@wordpress/jest-preset-default',
	transform : {
		"^.+\\.js$": "babel-jest",
		".+\\.(svg|css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$": "jest-transform-stub"
	}
};
