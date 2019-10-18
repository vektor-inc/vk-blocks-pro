wp-create-gurten-template.sh
=======================
Guternbergブロックのテンプレートを生成するシェルスクリプトです。

## 使い方
`$ bash wp-create-gurten-template.sh <slug>`

## 何をしているか
作りたいブロックのslugを引数に、コマンドを実行すると、
以下のタスクを実行します。

1. `src/`にテンプレートを生成。
2. `src/bundle.js`にimport文を追加。
3. `vk-blocks-functions.php`のregister_block_typeに`<slug>`を追加。


### オプション
任意のブロックのディレクトリに移動して、src/直下で`wp-create-gurten-template-deprecated.sh`を実行すると、
deprecated用のテンプレートを生成します。