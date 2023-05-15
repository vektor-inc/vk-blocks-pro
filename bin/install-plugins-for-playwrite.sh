#!/usr/bin/env bash

set -ex

# -o 実行結果をファイルへ出力
# -s ファイル出力時の進捗状況を非表示にする(エラーも非表示)
# curl -s $WP_THEME -o theme.zip
curl -s https://downloads.wordpress.org/plugins/vk-all-in-one-expansion-unit.zip -o exunit.zip

ls

# -d 指定したディレクトリに展開
unzip exunit.zip -d /var/www/html/wp-content/plugins

ls /var/www/html/wp-content/plugins

# 展開したのでもとのzipファイルを削除 -f はエラーメッセージを表示しない
rm -f exunit.zip