module.exports = {
	rootDir: '../',
	moduleNameMapper: {
		"^@vkblocks/(.+)": "<rootDir>/src/$1"
	},
	preset: '@wordpress/jest-preset-default',
	transform : {
		"^.+\\.js$": "babel-jest",
		".+\\.(svg|css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$": "jest-transform-stub"
	},
	transformIgnorePatterns: [
		"/node_modules/(?!uuid|lib0)/.+\\.js$"
	],
	setupFilesAfterEnv: ["<rootDir>/jest.setup.js"]
};
