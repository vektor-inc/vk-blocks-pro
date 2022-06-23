/**
 * WordPress dependencies
 */
 import {
	visitAdminPage,
	clickButton
} from '@wordpress/e2e-test-utils';

describe( 'Options', () => {
	it( 'Test VK Blocks Options', async () => {
		await visitAdminPage( 'options-general.php', 'page=vk_blocks_options' );
		// license入力フォームにフォーカス
		await page.click( '#vk-blocks-pro-license-key[type="text"]' );
		// 文字列を入力
		await page.keyboard.type( 'test-license-key' );
		// 保存ボタンを押す
		await clickButton('Save setting');
		// 保存処理を待つ
		await new Promise( ( resolve ) => setTimeout( resolve, 3000 ) );
		// リロードする
		await page.reload();
		// 保存した値があるか確認
		await expect(await page.$eval('#vk-blocks-pro-license-key', el => el.value)).toBe('test-license-key')
		// license入力フォームにフォーカス
		await page.click( '#vk-blocks-pro-license-key[type="text"]' );
		// 保存した値を削除して保存
		await page.$eval('#vk-blocks-pro-license-key', el => el.value = '');
		// 保存ボタンを押す
		await clickButton('Save setting');
		// 保存処理を待つ
		await new Promise( ( resolve ) => setTimeout( resolve, 3000 ) );
		// 次のテスト
	} )
});
