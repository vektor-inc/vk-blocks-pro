module.exports = {
	transform : {
		"^.+\\.js$": "babel-jest",
		".+\\.(svg|css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$": "jest-transform-stub"
	}
};
