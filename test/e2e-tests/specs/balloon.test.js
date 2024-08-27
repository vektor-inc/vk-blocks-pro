/**
 * External dependencies
 */
import path from 'path';
import fs from 'fs';
import os from 'os';
import { v4 as uuid } from 'uuid';

/**
 * WordPress dependencies
 */
 import {
	createNewPost,
	insertBlock,
	clickButton,
	getEditedPostContent
} from '@wordpress/e2e-test-utils';

/**
 * Internal dependencies
 */
import { changeSiteLang } from '../helper/changeSiteLang';

describe( 'Balloon', () => {
	// insertBlockは言語がenでないと動かなかったのでenする
  let oldLanguage;
	beforeEach( async () => {
    oldLanguage = await changeSiteLang( 'en' );
		await createNewPost();
	} );
	afterEach( async () => {
			await changeSiteLang( oldLanguage );
	});

	// 吹き出しブロック
	it('insertBlock Balloon', async () => {
		// ブロックを挿入する
		await insertBlock('Ballon');
		await clickButton('Select image');
		await page.waitForSelector('.media-frame');

		/**
		 * 画像をアップロード
		 * https://github.com/WordPress/gutenberg/blob/d71862993a8172999924e7895529df69a92dca48/packages/e2e-tests/specs/editor/blocks/image.test.js#L23-L39
		 */
		const inputElement = await page.waitForSelector(
			`.media-frame input[type="file"]`
		);
		const testImagePath = path.join(
			__dirname,
			'..',
			'assets',
			'10x10_e2e_test_image_z9T8jK.png'
		);
		const filename = uuid();
		const tmpFileName = path.join(os.tmpdir(), filename + '.png');
		fs.copyFileSync(testImagePath, tmpFileName);
		await inputElement.uploadFile(tmpFileName);
		await page.click('.media-frame-toolbar button.media-button');

		// アイコン名をタイプ
		await page.click('.vk_balloon_icon_name');
		await page.keyboard.type('Icon Name');

		// 吹き出しコンテンツをタイプ
		await page.click('.vk_balloon_content .wp-block-paragraph');
		await page.keyboard.type('VK Balloon Content');

		// アイコンをクリックしてサイドバーパネルをBalloonに変更
		await page.click('.vk_balloon_icon_name');

		// サイドバーを開く
		const settingsButtonSelector = `//button[@aria-label='Settings']`;
		const [settingsButton] = await page.$x(settingsButtonSelector);
		await settingsButton.click();

		//PositionをRightに変更
		await clickButton('Right');

		//TypeをThinkingに変更
		await clickButton('Thinking');

		//Image StyleをRoundedに変更
		await clickButton('Rounded');

		//Borderを追加
		const borderButtonSelector = `//label[contains(text(), "Add border to balloon")]`;
		const [borderButton] = await page.$x(borderButtonSelector);
		await borderButton.click();

		//Border colorの最初の色をクリック
		const colorButtonSelector = `//button[contains(@aria-label, 'Color: ')]`;
		const [colorButton] = await page.$x(colorButtonSelector);
		await colorButton.click();
	
		//Border colorをカスタムカラーに変更
		const backgroundColorButtonSelector = `//button[@aria-label='Custom color picker']`;
		const [backgroundColorButton] = await page.$x(backgroundColorButtonSelector);
		await backgroundColorButton.click();

		const detailedColorButtonSelector = `//button[@aria-label='Show detailed inputs']`;
		const [detailedColorButton] = await page.$x(detailedColorButtonSelector);
		await detailedColorButton.click();

		await page.click('.components-popover__content .components-input-control .components-input-control__input');
		await page.$eval('.components-popover__content .components-input-control .components-input-control__input', element => element.value = '');
		await page.keyboard.type('0782f6');

		//テスト実行時のURLを取得するために現在時刻を取得
		var now = new Date();
		var year = now.getFullYear();
		// WordPressのメディアは２桁のため0を足し後ろ2文字を取得
		var month = ("0" + (now.getMonth() + 1)).slice(-2);

		//ホームのURLを取得する
		var url = page.url();
		var homeUrl = url.substring(0, url.indexOf("/wp-admin"));

		// filenameは設定する画像のファイル名
		const regexBefore = new RegExp(
			`<!-- wp:vk-blocks/balloon {\\"balloonType\\":\\"type-think\\",\\"balloonBorder\\":true,\\"balloonBorderColor\\":\\"#0782f6\\",\\"balloonAlign\\":\\"position-right\\",\\"IconImage\\":\\"${homeUrl}/wp-content/uploads/${year}/${month}/${ filename }.png\\",\\"balloonImageType\\":\\"rounded\\"} -->
<div class=\\"wp-block-vk-blocks-balloon vk_balloon vk_balloon-position-right vk_balloon-type-think vk_balloon-animation-none\\"><div class=\\"vk_balloon_icon\\"><figure><img class=\\"vk_balloon_icon_image vk_balloon_icon_image-type-rounded  has-text-color\\" style=\\"border-color:#0782f6\\" src=\\"${homeUrl}/wp-content/uploads/${year}/${month}/${ filename }.png\\" alt=\\"\\"/><figcaption class=\\"vk_balloon_icon_name\\">Icon Name</figcaption></figure></div><div class=\\"vk_balloon_content_outer\\"><div class=\\"vk_balloon_content  vk_balloon_content-border-true has-text-color\\" style=\\"border-color:#0782f6\\"><span class=\\"vk_balloon_content_before  has-text-color\\"></span><span class=\\"vk_balloon_content_after  has-text-color\\" style=\\"border-color:transparent #0782f6 transparent transparent\\"></span><!-- wp:paragraph -->
<p>VK Balloon Content</p>
<!-- /wp:paragraph --></div></div></div>
<!-- /wp:vk-blocks/balloon -->`
		);

		expect(await getEditedPostContent()).toMatch(regexBefore);
	});

});
