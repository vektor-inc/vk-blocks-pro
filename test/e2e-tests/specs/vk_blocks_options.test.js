/**
 * WordPress dependencies
 */
import {
	visitAdminPage
} from '@wordpress/e2e-test-utils';

describe( 'License Key', () => {
	it( 'Test License Key', async () => {
		await visitAdminPage( 'options-general.php', 'page=vk_blocks_options' );
		// license入力フォームにフォーカス
		await page.click( '#vk-blocks-pro-license-key[type="text"]' );
		// スペース付きの文字列を入力
		await page.keyboard.type( ' test-license-key　' );
		// フォーカスを外す
		await page.$eval('#vk-blocks-pro-license-key', el => el.blur())
		// test-license-keyがあるか確認
		await expect(await page.$eval('#vk-blocks-pro-license-key', el => el.value)).toBe('test-license-key')
	} )
});
