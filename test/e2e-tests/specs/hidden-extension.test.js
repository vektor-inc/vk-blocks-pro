/**
 * WordPress dependencies
 */
 import {
	createNewPost,
	insertBlock,
	openDocumentSettingsSidebar,
	findSidebarPanelWithTitle,
	clickBlockToolbarButton,
	clickMenuItem
} from '@wordpress/e2e-test-utils';

/**
 * Internal dependencies
 */
import { changeSiteLang } from '../helper/changeSiteLang';

describe( 'HiddenExtension', () => {
	let oldLanguage;
	beforeEach( async () => {
		oldLanguage = await changeSiteLang( 'en' );
		await createNewPost();
	} );
	afterEach( async () => {
		await changeSiteLang( oldLanguage );
	});
	it( 'HiddenExtension', async () => {
		/**
		 * 非表示設定テストブロック
		 */
		const testBlockTitleLists = [
			// コアブロック
			'Paragraph',
			// コアブロック dynamic block
			'Archives',
			// VK Blockブロック
			'Alert',
			// VK Blockブロック dynamic block
			'Breadcrumb',
		]

		for (let i = 0; i < testBlockTitleLists.length; i++) {

			// ブロックを追加
			await insertBlock(testBlockTitleLists[i]);

			// Open the sidebar.
			await openDocumentSettingsSidebar();

			// 非表示設定パネルを開く
			const openButton = await findSidebarPanelWithTitle( 'Hidden Settings' );
			await openButton.click();

			// 非表示設定 allをクリックする
			const hiddenAllButtonSelector = `//label[contains(text(), "Hidden ( Screen size : all )")]`;
			const [hiddenAllButton] = await page.$x(hiddenAllButtonSelector);
			await hiddenAllButton.click();

			// 非表示のクラス名が存在するかチェック
			expect(
				await page.$( '.vk_hidden' )
			).not.toBeNull();

			// 配置したブロックを削除
			await clickBlockToolbarButton( 'Options' );
			await clickMenuItem( `Remove ${testBlockTitleLists[i]}` );

		}
	} )

});
