#!/usr/bin/env bash

set -e

# $#にbashに渡された引数の個数が入る。
# -lt は < と同じ
#下のif文は、引数の個数が1以下ならexitする。
if [ $# -lt 1 ]; then
	echo "usage: $0 <version>"
	exit 1
fi

# $1には、このスクリプトに渡された第一引数がはいる。
# tagのバージョンを変数に代入
version=$1

cd inc/vk-blocks/
ls
pwd
# Cloneした無料版のディレクトリに移動
cd ./vk-blocks/
# src/を削除
rm -rf src/*
# Pro版のディレクトリに移動
cd ../
# 指定したファイルを除外して、Pro版を無料版へコピー&上書き
rsync --exclude 'inc/vk-blocks/build/block-build.css' --exclude 'bin/' --exclude 'tests/' --exclude 'inc/vk-blocks-pro-config.php' --exclude 'src/blocks/_pro/' --exclude 'src/blocks/bundle-pro.js' --exclude 'vk-blocks/' --exclude '.git/' --exclude '.gitignore' --exclude 'inc/vk-blocks-pro/' --exclude 'inc/vk-blocks/build/*.css' --exclude 'inc/vk-blocks/build/*.js' --exclude 'editor-css/*.css' --exclude 'editor-css/*.css.map' -arvc ./* ./vk-blocks/
# 無料版のディレクトリに移動
cd ./vk-blocks/
# push先のブランチを切る
git checkout -b add/vk-blocks-free
# Pro版ブロックは読み込まないようjsから削除
sed -i /_pro/d src/blocks/index.js
# プラグイン名を通常版へリネーム
sed -i 3s/Pro// vk-blocks.php
 # Pro版のブロックslugを配列に追加（後で使用する）
cd ../
pro_block_array=($(ls src/blocks/_pro/))
# 無料版のディレクトリに移動
cd ./vk-blocks/
# Pro版のブロックをphpから削除
for pro_block in ${pro_block_array[@]}; do
sed -i s/\,\ \'${pro_block}\'//g inc/vk-blocks/vk-blocks-functions.php
done
# Pro版のブロックをbundle.jsから削除
sed -i "s/import vkblocksPro from '\.\/bundle-pro'/const vkblocksPro = \[\]/g" src/blocks/bundle.js

# 権限の問題でwebpackから生成できないようなので仮ファル作成
cd inc/vk-blocks/
ls
cd languages/
ls
cd ../../../
ls
touch inc/vk-blocks/languages/vk-blocks-js.pot
# ブロックをビルド
npm install
npm run build:free

# 仮ファル削除
rm -f inc/vk-blocks/languages/vk-blocks-js.pot

# 無料版のmasterブランチにpush
git add .
git commit -m"Update from vk-blocks-pro"
git push -f origin master
# 無料版のレポジトリでタグを切ってpush
# 無料版の方でも下のGitHubActionが動いて、WordPress公式レポジトリにアップロードされる。
# https://github.com/vektor-inc/vk-blocks/blob/master/.github/workflows/wp-plugin-deploy.yml
git tag ${version}
git push origin ${version}
