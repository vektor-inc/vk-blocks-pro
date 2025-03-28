module.exports = {
    rootDir: '../',
    moduleNameMapper: {
        "^@vkblocks/(.+)": "<rootDir>/src/$1",
        "\\.svg$": "<rootDir>/test/__mocks__/svgMock.js"
    },
    preset: '@wordpress/jest-preset-default',
    transform: {
        "^.+\\.(js|jsx|mjs|cjs|ts|tsx)$": "babel-jest",
        ".+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$": "jest-transform-stub"
    },
    transformIgnorePatterns: [
        // ここでは `swiper` と `uuid` をトランスパイルから除外するモジュールのリストから除外しています。
        // 注意: この正規表現は `/node_modules/` 内のモジュール名が `swiper` もしくは `uuid` であるものをトランスパイルの対象に含めるようにしています。
        // 他のモジュールをトランスパイルから除外したい場合は、このリストを適宜更新してください。
        "/node_modules/(?!swiper|uuid)/.+\\.js$"
    ],
    setupFilesAfterEnv: ["<rootDir>/jest.setup.js"]
};
