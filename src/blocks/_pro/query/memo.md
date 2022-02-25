# queryブロックに関するメモ書き
https://github.com/WordPress/gutenberg/tree/trunk/packages/block-library/src/query
https://github.com/WordPress/gutenberg/labels/%5BBlock%5D%20Query%20Loop

## 前提
- 基本はコアのqueryブロックをフォーク
https://github.com/WordPress/gutenberg/tree/trunk/packages/block-library/src/query
コアの実装状況
https://github.com/WordPress/gutenberg/issues/24934

ナビゲーションブロックのblock.json `__experimentalLayout`はexperimentalなので削除

## __experimental要素
ブロックのパターンを選ぶ箇所で使用されている
- `__experimentalUseBlockPreview`
- `__experimentalBlockPatternSetup`
- `__experimentalBlockVariationPicker`
- `__experimentalGetMatchingVariation`
これは__experimentalが外れるまで待つかオリジナルで実装するか判断する必要がある。
複雑に絡み合っているので`__experimental`が外れるまで待ちたい

### `__experimentalUseBlockPreview as useBlockPreview`
関連URL
https://github.com/WordPress/gutenberg/pull/36431

### `__experimentalBlockPatternSetup as BlockPatternSetup`

### `__experimentalBlockVariationPicker`

### `__experimentalGetMatchingVariation`


# 構造を理解したほうが良い箇所(調べている箇所)
## PHP 
### Class WP_Block
https://developer.wordpress.org/reference/classes/wp_block/

## JS
### Context
値を継承する
https://ja.wordpress.org/team/handbook/block-editor/reference-guides/block-api/block-context/
providesContextで継承する値を指定する

### useInstanceId
queryIdは一意のIDを保存しようと試みているが再利用ブロックではIDが被ってしまっている
https://github.com/WordPress/gutenberg/pull/34750
これが解消されてからでないとバグを含んだ状態になりそう

### Hook
useDispatch
useMemo

→フック
use〇〇はHook

コンポーネントからロジックを分けることが出来る
use〇〇で自由に作れる

### BlockPatternSetup
クエリーブロックを配置した時に設定されるものコアのクエリーブロックの用にスライダーでパターンを選ぶことは出来ない(調査中)
