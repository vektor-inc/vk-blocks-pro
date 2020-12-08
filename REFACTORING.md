# VK Blocks リファクタリング項目

## 全体
- extensionsに移動。
- ブロックの登録方法を変更：[ブロックの登録| Gutenberg](https://github.com/WordPress/gutenberg/blob/master/packages/block-library/src/index.js)


- block.json追加
- ファイル分割（コアと同じに）
    - index.js
    - edit.js
    - save.js
    - deprecated.js
    - transforms.js
    - utils.js
    - style.scss
    - index.php
    - [参考：codeブロック| Gutenberg](https://github.com/WordPress/gutenberg/tree/master/packages/block-library/src/code) 
 - importの書き方に変更
 - フロントエンドで読み込むファイル名は、vk-ブロック名で統一。
 - svgの読み込み統一
 - save関数
    - リターンするコンポーネントの外側に必ずdivを持つ
    - save関数のClassを削除
- deprecatedの書き方統一
    - バージョンで区切る。
    - attributesはマージする
- lintとformatを導入
- テスト追加