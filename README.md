# vk-blocks

This is a plugin that extends Gutenberg's blocks.

## 前提
- Docker
- WP-CLI（[インストール方法](https://github.com/vektor-inc/vk-blocks-pro/wiki/WP-CLI%E3%82%92%E3%83%AD%E3%83%BC%E3%82%AB%E3%83%AB%E3%81%AB%E3%82%A4%E3%83%B3%E3%82%B9%E3%83%88%E3%83%BC%E3%83%AB)）
- NodeJS、NPM

## 依存関係のインストール
```
npm install
npm install -g @wordpress/env
```

## 開発環境の立ち上げ
```
npm start
```

## ビルド & 翻訳
```
// 本番環境用
npm build

// 翻訳のみ
npm run translate

// 開発用（開発者ツールのconsoleでログが追いやすくなる）
npm run build:dev

// リリース用（石川専用：gulp dist して zip に圧縮してそのzipファイルをvwsのパッケージディレクトリに移動している）
bin/dist_kuru.sh
```

## Watch
```
// CSSの変更のみ監視
npm run watch
```

## 翻訳

```
// .pot ファイル生成、.po ファイルから翻訳用JSONを生成
npm run translate
```

翻訳は PoEdit などを使って `.po` ファイルを開いて編集するが、
新たに翻訳箇所が追加された場合はメニューから「potファイルから更新」を選んで更新する


## デプロイ
手順は[wiki](https://github.com/vektor-inc/vk-blocks-pro/wiki/%E3%83%87%E3%83%97%E3%83%AD%E3%82%A4)を参考に


## CSS 命名規則

### プリフィックスの後は - にする
```
[ prefix ]_[ ブロック名 ]
```

### 各div要素は _ で連結する。一つのdivのクラス名は現状キャメルケース
```
[ prefix ]_[ ブロック名 ]_[ divのクラス名 ]
[ prefix ]_[ ブロック名 ]_[ divのクラス名 ]_[ 子のdivのクラス名 ]
```

### 属性の前はハイフンにする
```
[ prefix ]_[ ブロック名 ]-[ 属性名 ]-[ 属性値 ]
[ prefix ]_[ ブロック名 ]_[ 子のdivのクラス名 ]-[ 属性名 ]-[ 属性値 ]
```

ちなみに 線の あり/なし など
「属性値なしで -border とかだけでいいんちゃう？」
と思うケースがあるが、今後も属性値の拡張がありえない場合、たとえば
線でも あり/なし だけではなく 直線/点線/二重線 など拡張が想定される可能性がありそうな場合は
-border-solid としておき -border-dotted -border-wave とする事ができるようにしておく。
何がなんでも あり/なし 以外以外発生しないというケースの場合は -border-true あるいは例外的に -border など属性名だけでも可

