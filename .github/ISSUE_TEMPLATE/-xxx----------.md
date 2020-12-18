---
name: "[XXX] リファクタリング"
about: ブロックリファクタリング用のIssueテンプレートです。
title: "[XXX] リファクタリング"
labels: ''
assignees: ''

---

リファクタリング時に以下の項目を確認して下さい。

 - [ ] editの分離
 - [ ] saveの分離
 - [ ] importに書き換え、../ を @vkblocksからのパスに変更
 - [ ] block.jsonを作成、block.jsからindex.jsへ変更、index.phpの作成、[./src/blocks/index.js](https://github.com/vektor-inc/vk-blocks-pro/blob/feature/deprecated-test/src/blocks/index.js#L52) と [vk-blocks-functions.php](https://github.com/vektor-inc/vk-blocks-pro/blob/feature/deprecated-test/inc/vk-blocks/vk-blocks-functions.php#L173) に追記
 - [ ] example整理してschema.jsを削除
 - [ ] package.jsonで [lint:XXX](https://github.com/vektor-inc/vk-blocks-pro/blob/feature/deprecated-test/package.json#L19) の作成
 - [ ] [useBlockProps対応](https://github.com/vektor-inc/vk-blocks-pro/blob/feature/deprecated-test/src/blocks/alert/edit.js#L39)（Fragment削除）
- [ ]  components.jsの整理、for_に依存しない書き方に変更、ファイル名のリネーム
- [ ]  supportsの導入
- [ ]  save関数で返すコンポーネントの外側に必ず要素を持つ、save関数のclassを削除
 - [ ] [deprecated](https://github.com/vektor-inc/vk-blocks-pro/tree/feature/deprecated-test/src/blocks/alert/deprecated)の書き直し
 - [ ] [deprecatedのテスト](https://github.com/vektor-inc/vk-blocks-pro/tree/feature/deprecated-test/test/e2e-tests/fixtures/blocks)追加
    - [ ] 修正版テスト追加
    - [ ] 直前のバージョンのテスト追加