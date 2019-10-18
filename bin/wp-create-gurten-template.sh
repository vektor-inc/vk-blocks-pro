#!/usr/bin/env bash

set -ex;

# 実行時に指定された引数の数、つまり変数 $# の値が 3 でなければエラー終了。
if [ $# -ne 1 ]; then
  echo '実行するには1個の引数が必要です。'
  exit 1
fi

#テンプレートをsrc直下に移動。リネーム。
cp -r blocks/ ../src/$1/

#コピーしたディレクトリに移動
cd ../src/$1/

#slugを引数に置き換え
array=`find . -name "*.js"`;
for file in $array; do
  sed -i".bak" -e "s/\your-block-slug/$1/g" $file;
done

bak_array=`find . -name "*.bak"`;
for file in $bak_array; do
  rm $file;
done

#bundle.jsにimport文を追加
LF=$(printf '\\\012_')
LF=${LF%_}
sed -i -e "2s/^/import '.\/$1\/block.js';${LF}/" ../bundle.js
pwd
rm ../bundle.js-e

pwd

#vk-blocks-functions.phpのブロック登録にslugを追加

cd ../../inc/vk-blocks/

array=`find . -name "vk-blocks-functions.php"`;
for file in $array; do
  sed -i".bak" -e "s/);\/\/REPLACE-FLAG/,'$1');\/\/REPLACE-FLAG/g" $file;
done

bak_array=`find . -name "*.bak"`;
for file in $bak_array; do
  rm $file;
done

echo "Done"