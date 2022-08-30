/**
 * WordPress dependencies
 */
 import {
	createNewPost,
	insertBlock,
	openDocumentSettingsSidebar,
	activateTheme,
	installTheme,
} from '@wordpress/e2e-test-utils';

/**
 * Internal dependencies
 */
import { changeSiteLang } from '../helper/changeSiteLang';

describe( 'List', () => {
  let oldLanguage;
	beforeAll( async () => {
		await installTheme( 'lightning' );
		await activateTheme( 'lightning' );
	} );
	beforeEach( async () => {
		oldLanguage = await changeSiteLang( 'en' );
		await createNewPost();
	} );
	afterEach( async () => {
		await changeSiteLang( oldLanguage );
	});
	afterAll( async () => {
		await activateTheme( 'twentytwentytwo' );
	} );

	// Listブロック
	it('insertBlock List', async () => {

		// ブロックを挿入する
		await insertBlock('List');

		// サイドバーを開く
		await openDocumentSettingsSidebar();

		// List Icon Colorパネルを開く
		const panelSelector = `//div[contains(@class, "edit-post-sidebar")]//button[contains(@class, "components-panel__body-toggle") and contains(text(),"List Icon Color")]`;
		const [panelButton] = await page.$x(panelSelector);
		await panelButton.click();

		//Border colorの最初の色をクリック
		const colorButtonSelector = `//button[contains(@aria-label, 'Color: ')]`;
		const [colorButton] = await page.$x(colorButtonSelector);
		await colorButton.click();

		// Advancedパネルを開く
		const panelAdvancedSelector = `//div[contains(@class, "edit-post-sidebar")]//button[contains(@class, "components-panel__body-toggle") and contains(text(),"Advanced")]`;
		const [panelAdvancedButton] = await page.$x(panelAdvancedSelector);
		await panelAdvancedButton.click();

		// vk-has-black-colorクラスがあるか確認
		expect(
			await page.$( '.vk-has-black-color' )
			).not.toBeNull();

	});

});
