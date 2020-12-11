# VK Blocks リファクタリング項目
## 各ブロック
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

## 各コンポーネント
 - save関数
    - リターンするコンポーネントの外側に必ずdivを持つ
    - save関数のClassを削除
- deprecatedの書き方統一
    - バージョンで区切る。
    - attributesはマージする

## 読み込み方
- importの書き方に変更
- 自社製 component や utils を読み込むときは、@vkblocks/xx を使う。
- ブロックの登録を一括で行う
- svgの読み込み統一

## 命名規則
 - フロントエンドで読み込むファイル名は、vk-ブロック名で統一。

## その他
- lintとformatを導入
- テスト追加
- depModuleの書き方調査
    - depModule廃止: depModule を '@wordpress/block-editor' に置き換え。
    - 理由： VK Blocks のrequire バージョンを 5.3 に引き上げるため。