#!/bin/bash
rm -rf dist
npx gulp text-domain
npx gulp dist
# zip圧縮
windowszip dist/vk-blocks-pro
# vws のリポジトリ内にファイルをコピー
# mv dist/vk-blocks-pro.zip ../../themes/lightning-pro-child-vws/updates/packages/
# vws のリポジトリに移動
# cd ../../../../../../vws/app/public/wp-content/themes/lightning-pro-child-vws/
# master ブランチに切り替え
# git checkout master
