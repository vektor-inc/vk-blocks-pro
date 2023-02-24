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
	visitAdminPage,
	clickButton,
	pressKeyWithModifier
} from '@wordpress/e2e-test-utils';

describe( 'Options', () => {
	beforeAll( async () => {
		await visitAdminPage( 'options-general.php', 'page=vk_blocks_options' );
	} );

	it( 'Test License Key Space', async () => {
		// license入力フォームにフォーカス
		await page.click( '#vk-blocks-pro-license-key[type="text"]' );
		//全選択
		await pressKeyWithModifier( 'primary', 'a' );
		// スペース付きの文字列を入力
		await page.keyboard.type( ' test-license-key　' );
		// フォーカスを外す
		await page.$eval('#vk-blocks-pro-license-key', el => el.blur())
		// test-license-keyがあるか確認
		await expect(await page.$eval('#vk-blocks-pro-license-key', el => el.value)).toBe('test-license-key')
	} )

	it( 'Test License key', async () => {
		// license入力フォームにフォーカス
		await page.focus( `#vk-blocks-pro-license-key` );
		//全選択
		await pressKeyWithModifier( 'primary', 'a' );
		// 文字列を入力
		await page.type( `#vk-blocks-pro-license-key`, 'test-license-key' );
		// 保存ボタンを押す
		await clickButton('Save setting');
		// 保存処理を待つ
		await new Promise( ( resolve ) => setTimeout( resolve, 3000 ) );
		// リロードする
		await page.reload();
		// 保存した値があるか確認
		await expect(await page.$eval('#vk-blocks-pro-license-key', el => el.value)).toBe('test-license-key')
	} )

	it( 'Test Balloon Width Setting', async () => {
		// balloon_border_widthにフォーカス
		await page.click( '#balloon-border-width-selector' );
		// 2pxに変更
		await page.select('select[name="vk_blocks_options[balloon_border_width]"]', '2');
		await clickButton('Save setting');
		await new Promise( ( resolve ) => setTimeout( resolve, 3000 ) );
		await page.reload();
		// 保存した値があるか確認
		await expect(await page.$eval('#balloon-border-width-selector', el => el.value)).toBe('2')
	} )

	it( 'Test Balloon Setting', async () => {
		// 画像をアップロード
		await clickButton('Select');
		await page.waitForSelector('.media-frame');
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

		await clickButton('Save setting');
		await new Promise( ( resolve ) => setTimeout( resolve, 3000 ) );
		await page.reload();
		//テスト実行時のURLを取得するために現在時刻を取得
		var now = new Date();
		var year = now.getFullYear();
		// WordPressのメディアは２桁のため0を足し後ろ2文字を取得
		var month = ("0" + (now.getMonth() + 1)).slice(-2);
		//ホームのURLを取得する
		var url = page.url();
		var homeUrl = url.substring(0, url.indexOf("/wp-admin"));
		await expect(await page.$eval(`#balloonIconList_iconFrame_src_1`, el => el.src)).toBe(`${homeUrl}/wp-content/uploads/${year}/${month}/${ filename }.png`)

		// icon_title_1にフォーカス
		await page.focus( `#icon_title_1` );
		await pressKeyWithModifier( 'primary', 'a' );
		await page.type( `#icon_title_1`, 'test-name' );
		await clickButton('Save setting');
		await new Promise( ( resolve ) => setTimeout( resolve, 3000 ) );
		await page.reload();
		await expect(await page.$eval(`#icon_title_1`, el => el.value)).toBe('test-name')
	} )

	it( 'Test Common Margin Setting', async () => {
		await page.click( 'input[name="vk_blocks_options[margin_size][sm][pc]"][type="number"]' );
		await pressKeyWithModifier( 'primary', 'a' );
		await page.keyboard.type( '1' );
		await clickButton('Save setting');
		await new Promise( ( resolve ) => setTimeout( resolve, 3000 ) );
		await page.reload();
		await expect(await page.$eval(`input[name="vk_blocks_options[margin_size][sm][pc]"]`, el => el.value)).toBe('1')
	} )

	it( 'Test Load Separate Setting', async () => {
		await page.click( 'input[name="vk_blocks_options[load_separate_option]"]' );
		await clickButton('Save setting');
		await new Promise( ( resolve ) => setTimeout( resolve, 3000 ) );
		await page.reload();
		await expect(await page.$eval(`input[name="vk_blocks_options[load_separate_option]"]`, el => el.value)).toBe('1')
	} )

	it( 'FAQ Block Setting', async () => {
		await page.select('select[name="vk_blocks_options[new_faq_accordion]', 'open');
		await clickButton('Save setting');
		await new Promise( ( resolve ) => setTimeout( resolve, 3000 ) );
		await page.reload();
		await expect(await page.$eval('select[name="vk_blocks_options[new_faq_accordion]', el => el.value)).toBe('open')
	} )

	it( 'Custom Format Setting', async () => {
		await page.focus( `#vk_blocks_custom_format_0_title` );
		await pressKeyWithModifier( 'primary', 'a' );
		await page.type( `#vk_blocks_custom_format_0_title`, 'Test Custom Format' );
		await clickButton('Save setting');
		await new Promise( ( resolve ) => setTimeout( resolve, 3000 ) );
		await page.reload();
		await expect(await page.$eval(`input[name="vk_blocks_options[custom_format_lists][0][title]"]`, el => el.value)).toBe('Test Custom Format')
	} )

});
