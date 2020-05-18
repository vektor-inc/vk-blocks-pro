# vk-blocks

This is a plugin that extends Gutenberg's blocks.

## How to Build

```
npm install --save-dev
npm run build
```
## Work

通常作業時は

```
gulp watch
```

か

```
npm run watch
```

で動かす。
ただし、翻訳作業をする時は事前に `npm run build` をした方が無難

## Translate Only

```
npm run build
```

翻訳は PoEdit などを使って po ファイルを開いて編集するが、
新たに翻訳箇所が追加された場合はメニューから「potファイルから更新」を選んで更新する

## CSS name rule

```
[ prefix ]_[ block name ]_[section name]
[ prefix ]_[ block name ]_[section name]_[sub section name]
[ prefix ]_[ block name ]-[Attribute name]-[Attribute property]
```

## リリースビルド（石川専用）

gulp dist して zip に圧縮してそのzipファイルをvwsのパッケージディレクトリに移動している

```
bin/dist_kuru.sh
```