#!/usr/bin/env bash

# このファイルは .github/workflows の deploy-free.yml から実行される

# -e コマンドは何かコケたら直ちに終了する
set -e

# バージョン名が引数で取得できなかったら、先に進めないように echo して終了する
#
# $#にbashに渡された引数の個数が入る。
# -lt は < と同じ
# 下のif文は、引数の個数が1以下（入ってこなかったら）ならexitする。
if [ $# -lt 1 ]; then
	echo "usage: $0 <version>"
	exit 1
fi

# $1には、このスクリプトに渡された第一引数（tagのバージョン名）がはいる。
# tagのバージョンを変数に代入（後で git で tag 付けしてプッシュする時に使用）
version=$1

# Pro版のブロックslugを配列に追加（後で使用する）
pro_block_array=($(ls src/blocks/_pro/))

# Cloneした無料版のディレクトリに移動
cd ./temp/plugins/vk-blocks
# コピー先の トップディレクトリ を一旦削除
rm -rf editor-css/* inc/* lib/* options-css/* src/* test/*

# プロ版のディレクトリに移動
cd ../../../
# 指定したファイルを除外して、Pro版を無料版（vk-blocks-copy-target）へコピー&上書き
# -a : archive -rlptgoDとイコール
# -r : 指定ディレクトリ配下をすべて対象
# -v : コピーファイルの転送情報を出力
# -c : チェックサムで差分を確認
rsync -arvc --exclude-from='.freeignore' . ./temp/plugins/vk-blocks

# 無料版のディレクトリに移動
cd ./temp/plugins/vk-blocks
# プラグイン名を通常版へリネーム（vk-blocks.php の 3行目の /Pro/ を // に変更 ）
sed -i 3s/' Pro'// vk-blocks.php
# Pro版の配列をループしてPro版のブロックをphpから削除
for pro_block in ${pro_block_array[@]}; do
# ★ 本当はPro版のブロックを配列から削除しないといけない。昔は改行なかったが、今は改行はいってるので、この処理が正常に動いてないので要修正。だがし、しかし動作上問題はない。
sed -i s/\,\ \'${pro_block}\'//g inc/vk-blocks/vk-blocks-functions.php
done

# Pro版のブロックをbundle.jsから削除
# import vkblocksPro from './bundle-pro'; -> const vkblocksPro = []; に置換
sed -i "s/import vkblocksPro from '\.\/bundle-pro'/const vkblocksPro = \[\]/g" src/blocks/bundle.js
# 各種 composer ライブラリインストール

# ブロックをビルド
npm install
composer install
npx gulp text-domain-free
npm run lint
composer format
composer lint
npm run build:free
npx wp-env start
npm run phpunit:free

# 無料版のmasterブランチにpush
git add .
git commit -m "Update from vk-blocks-pro"
git push -f origin master
# 無料版のレポジトリでタグを切ってpush
# 無料版の方でも下のGitHubActionが動いて、WordPress公式レポジトリにアップロードされる。
# https://github.com/vektor-inc/vk-blocks/blob/master/.github/workflows/wp-plugin-deploy.yml
git tag ${version}
git push origin ${version}
