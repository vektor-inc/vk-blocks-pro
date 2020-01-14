const merge = require("webpack-merge"); // webpack-merge
const common = require("./webpack.common"); // 汎用設定をインポート

module.exports = merge(common, {
  mode: "production"
});
