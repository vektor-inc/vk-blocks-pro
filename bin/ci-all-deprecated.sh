#!/usr/bin/env bash
set -e

# 依存モジュールをインストール
npm ci

# WordPress立ち上げ
npx wp-env start

# テストファイルを移動
mv tests/ ../tests/

# ここで、タグのループを回す
GIT_TAGS=(`git tag`)

# 遡ってテストするバージョン
TEST_VERSIONS=3

for ((i = 0; i < $TEST_VERSIONS; i++))
do
# バージョン ${{ matrix.block-version }} のブロックをチェックアウト
git pull --tags
git checkout -f refs/tags/${GIT_TAGS[$i]}
npm run build

# テストファイルを定位置に戻す
cp ../tests/ ./tests/

# ブロックを挿入
npx wp-scripts test-e2e tests/e2e/blocks/all/block-is-not-broken.spec.js

# 最新版のブロックにチェックアウト
git checkout -f master
npm run build

# Deprecated テストを実行
npx wp-scripts test-e2e tests/e2e/blocks/all/deprecated.spec.js
done

