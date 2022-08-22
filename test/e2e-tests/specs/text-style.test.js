/**
 * WordPress dependencies
 */
 import {
	visitAdminPage,
	clickButton,
	pressKeyWithModifier,
	createNewPost,
	clickBlockAppender,
	clickBlockToolbarButton,
	getEditedPostContent
} from '@wordpress/e2e-test-utils';

describe( 'VK Text Style', () => {
	beforeAll( async () => {
		await visitAdminPage( 'options-general.php', 'page=vk_blocks_options' );
	} );

	it( 'VK Text Style', async () => {
		/**
		 * よく使う書式設定の値を保存する
		 */
		// Text Style 1をアクティベート
		await page.focus( `#vk_blocks_text_style_0_title` );
		//全選択
		await pressKeyWithModifier( 'primary', 'a' );
		// 文字列を入力
		await page.type( `#vk_blocks_text_style_0_title`, 'Test Text Style' );
		// 保存ボタンを押す
		await clickButton('Save setting');
		// 保存処理を待つ
		await new Promise( ( resolve ) => setTimeout( resolve, 3000 ) );

		/**
		 * 新しく投稿を作る
		 */
		await createNewPost();

		await clickBlockAppender();

		// Add text and select to color.
		await page.keyboard.type( '1' );
		await pressKeyWithModifier( 'primary', 'a' );
		await clickBlockToolbarButton( 'More' );

		const button = await page.waitForXPath(
			`//button[text()='Test Text Style']`
		);
		// Clicks may fail if the button is out of view. Assure it is before click.
		await button.evaluate( ( element ) => element.scrollIntoView() );
		await button.click();

		expect( await getEditedPostContent() ).toMatchSnapshot();

	} )

});
