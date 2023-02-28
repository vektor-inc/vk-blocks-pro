# vk-blocks

This is a plugin that extends Gutenberg's blocks.
#### GitHub repository
Free version : https://github.com/vektor-inc/vk-blocks
Rro version : https://github.com/vektor-inc/vk-blocks-pro ( Private )

## 環境構築（Windows編）
- XAMPP 7.4 系をインストール
- Composer をインストール
- VS Code で Git Bash を使えるようにしておく

## 前提
- Docker
- @wordpress/env をグローバルインストール( ```npm install -g @wordpress/env``` )
- NodeJS、NPM

## 依存関係のインストール
```
npm install
npm install -g @wordpress/env
composer global require wp-cli/wp-cli-bundle
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
// CSS、JSの監視
npm run watch
```

## 翻訳

```
// .pot ファイル生成、.po ファイルから翻訳用JSONを生成
npm run translate
```

翻訳は PoEdit などを使って `.po` ファイルを開いて編集するが、
新たに翻訳箇所が追加された場合はメニューから「potファイルから更新」を選んで更新する

## PHPUnitテスト

```
composer install
npm run phpunit
```

---

## e2eテスト

```
npm run test:e2e
```

GUI無しの場合
```
npm run test:e2e-no-gui
```

wp-env の port を変更している場合

```
WP_BASE_URL='http://localhost:xxxx/' npm run test:e2e
```

単体で動かしたい場合
```
npm run test:e2e ./test/e2e-tests/specs/xxxx.test.js
```

wp-env の port を変更していて、単体でテストしたい場合
（spacerの例）
```
WP_BASE_URL='http://localhost:xxxx/' npm run test:e2e ./test/e2e-tests/specs/spacer.test.js    
```

---

## E2E Test （ Playwright ）

準備

```
npm install
wp-env start
```

### テストを作成

Playwriteは操作を自動的トラッキングしてコードを出力してくれます。
以下のようにテスト対象のURLを指定して叩くと、ブラウザが起動してトラッキングを開始します。

```
npx playwright codegen "テスト対象のURL"
```

例えばWordPressのログイン画面からの動作テストを作る場合は以下のようになります。
```
npx playwright codegen "http://localhost:8889/wp-login.php"
```

### テストの実行

全てのテストの実行

```
npx playwright test
```

ブラウザは chrome だけで良い場合
```
npx playwright test --project=chromium
```

操作のスクリーンショットが見たい場合 --trace on を追加
```
npx playwright test --trace on
```

```
npx playwright test --trace on --project=chromium
```

## レポートの確認
```
npx playwright show-report
```


---

## pre-push、pre-commit
プッシュ時にphpのformat、phpcsのチェック、
コミット時にlintが実行されます。
それぞれ、エラーがある場合コミットやプッシュができません。

---
## コミットプリフィックス

fix：バグ修正
hotfix：クリティカルなバグ修正
add：新規（ファイル）機能追加
update：機能修正（バグではない）
change：仕様変更
clean：整理（リファクタリング等）
disable：無効化（コメントアウト等）
remove：削除（ファイル）
upgrade：バージョンアップ
revert：変更取り消し

## develop branch
develop ブランチにマージされると自動でテストサーバー https://vk-block-test.vs4.nagoya/ にデプロイされます。

---

## CSS 命名規則

### プリフィックスの後は _ にする

```
[ prefix ]_[ ブロック名 ]
```

### 各div要素は _ で連結する。一つのdivのクラス名は現状キャメルケース

```
[ prefix ]_[ ブロック名 ]_[ divのクラス名 ]
```

※ 当初は下記のように必ずすべての階層を記載していたが、運用が難しかったので version 1.17 以降は途中の div のクラス名は省略可に変更

```
[ prefix ]_[ ブロック名 ]_[ divのクラス名 ]
[ prefix ]_[ ブロック名 ]_[ divのクラス名 ]_[ 子のdivのクラス名 ]_[ 孫のdivのクラス名 ]
```

### 属性の前はハイフンにする
```
[ prefix ]_[ ブロック名 ]-[ 属性名 ]-[ 属性値 ]
[ prefix ]_[ ブロック名 ]_[ divのクラス名 ]-[ 属性名 ]-[ 属性値 ]
```

ちなみに 線の あり/なし など
「属性値なしで -border とかだけでいいんちゃう？」
と思うケースがあるが、今後も属性値の拡張がありえない場合、たとえば
線でも あり/なし だけではなく 直線/点線/二重線 など拡張が想定される可能性がありそうな場合は
-border-solid としておき -border-dotted -border-wave とする事ができるようにしておく。
何がなんでも あり/なし 以外以外発生しないというケースの場合は -border-true あるいは例外的に -border など属性名だけでも可

### コアのブロックにも共通で使いそうなスタイルの場合

* 'is-style-' はコアがブロックの一番外側のタグに対してつけるものなので、もし使用するならブロックの一番外側のタグでのみ使用可
* VK Blocks でしか使わないスタイル名に対して追加するなら vk_[ ブロック名 ]-style-[ 属性名 ]

---

## ブレイクポイント

スマホ
`@media (max-width: 575.98px)`

タブレット
`@media (min-width: 576px) and (max-width: 991.98px)`

PC
`@media (min-width: 992px)`

イレギュラー : 管理画面側での指定はなく、CSSでブレイクポイントが一つの場合（モバイル/PC など）以下の設定がありえる
`@media (min-width: 768px)`

---
# テストデプロイフロー

VK Blocks の現在のデプロイフローは以下の通り
[ ★ ] の部分が手作業

現状以下のような課題があるので、更に抜本的な見直しが必要
* master で pre_ ナシの本タグでプッシュする人為的ミスが起こりうる
* e2eが自動で走っていない
* まだ手作業部分が多い
* GitHubリリースされたデータがそのまま配信されるわけじゃない
* リリースnoteなどが自動で作成したい

---

## プロ版テスト＆デプロイフロー

### 作業コミット

* .huskey で lint チェック

### vk-blocks-pro/develop に プッシュ / プルリクエスト

#### ci-test-lint-deprecated.yml

* lint チェック
* deprecated チェック
* （ e2eテスト（ 調整中 ） ）

### vk-blocks-pro/develop にプッシュ&マージ
#### develop-test.yml

* PHPUnit テスト
* 確認用サーバーにデプロイ

### テストサーバーで目視確認

編集画面を開くと Deprecated が走ってしまうので、まずは表側を確認する

1. [ ★ ] 公開画面目視確認（表示崩れがないか）
2. [ ★ ] 編集画面目視確認（Deprecatedなど発生していないか）

### vk-blocks-pro/develop バージョン変更・翻訳

* 翻訳の変更が必要な場合は翻訳
* バージョン番号を変更してコミット
* master へプルリクエスト

### プレリリース : vk-blocks-pro/master にマージしてタグ付け

1. [ ★ ] vk-blocks-pro/master マージ
1. [ ★ ] vk-blocks-pro/master をローカルでプル
1. [ ★ ] タグ付け
  `git tag pre_*.*.*.0` からの `git push origin pre_*.*.*.0`
  ※ プラグイン内のバージョン番号は数字だけだが、ここで処理工程の都合上
 pre_ をつける

（→ 無料版のデプロイフローも自動実行される）

#### プル忘れてタグ付けした場合

タグを消して付け直せば良い

`git tag -d pre_*.*.*.*` でタグ削除
`git push origin :pre_*.*.*.*` でリモートタグ削除

#### release-github-and-deploy-test-sv.yml

* build -> composer install -> dist
* zip 化して GitHub リリース作成
* VK Block Pro 単体動作確認サイトに送信
  -> Fatal Error があれば通知メールが届く
* Lightning G3 Pro Unit 動作確認サイトに送信
  -> Fatal Error があれば通知メールが届く
* [ ★ ] GitHub のリリースの zip ファイルをダウンロード
* [ ★ ] デモサイトなどにアップして確認

#### ここで問題が見つかった場合

修正して再度プルリクになるが、ここでの不具合修正はもともと「決定済みの期待する動作」の修正なので、プラグインに記載のバージョン変更の必要はない。
但し、予定外の変更を加える場合は内容に応じて変更＆変更箇所を readme.txt に記載する必要がある

### 本番リリース : vk-blocks-pro/master にタグ付け

1. [ ★ ] タグ付け
  `git tag *.*.*.0` からの `git push origin *.*.*.0`

#### release-vws.yml

`*.*.*.*` のタグで実行される

1. build -> composer install -> dist
2. VWS 配信サーバーにデプロイ
3. [ ★ ] デモサイトなどで管理画面からのアップデート確認

---

## 無料版デプロイフロー

### vk-blocks-pro/master タグ付け `pre_*.*.*.*`

vk-blocks-pro のリポジトリで `pre_*.*.*.*` のタグで実行される

#### vk-blocks-pro/.github/workflows/deploy-free.yml

* Pro版ディレクトリ内に無料版をGitHubからクローン
* vk-blocks-pro/bin/deploy-free.sh 実行
  この時タグ情報も deploy-free.sh に送る

##### vk-blocks-pro/bin/deploy-free.sh

* クローンした無料版のディレクトリ名変更
* 無料版のディレクトリに移動
* 無料版 src/ を一旦削除
* Pro版ディレクトリに移動
* Pro版関連のファイルを除外して無料版ディレクトリに複製
* 無料版ディレクトリに移動
* vk-blocks.php のプラグイン名を書き換え（ VK Block Pro から VK Blocks へ ）
* Pro版のブロックのPHPファイル読み込みを削除（inc/vk-blocks/vk-blocks-functions.php）
* Pro版のjs読み込みを削除（src/blocks/bundle.js）
* 無料版の composer install --no-dev
* 無料版をビルド
* 無料版をコミットしてプッシュ
* 無料版のタグ付けをしてプッシュ

#### vk-blocks/.github/workflows/release-github-and-deploy-test-sv.yml

##### job : PHPUnitテスト

* composer install -> PHPUnit

##### job :デプロイ

* VK Block 単体動作確認サイトに送信
  -> Fatal Error があれば通知メールが届く
* Lightning G3 無料版 動作確認サイトに送信
  -> Fatal Error があれば通知メールが届く
* [ ★ ] GitHub のリリースの zip を落とし デモサイトなどにアップして確認

### .org にテストデプロイ

readme.txt の stable のバージョンを上げずに一旦リリースする

1. vk-blocks/master でタグ付け `*.*.*.*`
1. vk-blocks/.github/workflows/wp-plugin-deploy.yml で .org に配信される
1. [ ★ ] プラグインベータテスターを使ってアップデートして確認

#### 本リリース

1. [ ★ ] バージョン番号の末尾の数字を上げる （ `*.*.*.0` -> `*.*.*.1` ）
1. [ ★ ] readme.txt の stable のバージョンを上げてコミット
1. [ ★ ] vk-blocks/master でタグ付け `*.*.*.1`
1. vk-blocks/.github/workflows/wp-plugin-deploy.yml で .org に配信される
1. [ ★ ] デモサイトなどでアップデートして確認
