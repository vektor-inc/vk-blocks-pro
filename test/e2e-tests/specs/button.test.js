/**
 * WordPress dependencies
 */
 import {
    createNewPost,
    getEditedPostContent
} from '@wordpress/e2e-test-utils';

/**
 * Internal dependencies
 */
import { changeSiteLang } from '../helper/changeSiteLang';

describe( 'Button', () => {
    let oldLanguage;
	beforeEach( async () => {
        oldLanguage = await changeSiteLang( 'ja' );
		await createNewPost();
	} );
    it( 'VK Button Block ( single )', async () => {
        //Using the slash command
		await page.keyboard.press( 'Enter' );
        await page.keyboard.type( '/ボタン' );
		// await page.waitForXPath(
        //     `//*[contains(@class, "components-autocomplete__result") and contains(@class, "is-selected") and contains(text(), 'ボタン')]`
        // );
		await page.click( 'button.components-button[id$="vk-blocks/button"]' );
		await page.keyboard.type( 'VK ボタン' );
		// id入力フォームに一旦フォーカス
		await page.click( '.is-sidebar-opened .components-panel__body.is-opened .components-text-control__input[type="text"]' );
		// idを削除
		await page.$eval( '.is-sidebar-opened .components-panel__body.is-opened .components-text-control__input[type="text"]', element => element.value = '');
		// idを手入力
		await page.keyboard.type( 'test-button' );
        expect( await getEditedPostContent() ).toMatchSnapshot();
    } )
});