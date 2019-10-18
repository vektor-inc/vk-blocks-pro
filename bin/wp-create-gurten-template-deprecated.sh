#!/usr/bin/env bash

set -ex;

#どのディレクトリから実行してもこのコマンドの絶対パスを取得。
SCRIPT_DIR=$(cd $(dirname $0); pwd)

#deprecatedディレクトリ作成
mkdir deprecated

cd deprecated/

#テンプレートファイルを作成したディレクトリにコピー
cp -r ${SCRIPT_DIR}/blocks/deprecated/ $PWD

#コピーしたディレクトリに移動
echo "Done"