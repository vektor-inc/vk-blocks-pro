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

describe( 'Spacer', () => {
    let oldLanguage;
	beforeEach( async () => {
        oldLanguage = await changeSiteLang( 'ja' );
		await createNewPost();
	} );
    afterEach( async () => {
        await changeSiteLang( oldLanguage );
    });
    it( 'should insert block name in Japanese', async () => {
        //Using the slash command
        await page.keyboard.press( 'Enter' );
        await page.keyboard.type( '/レスポンシブスペーサー' );
        await page.waitForXPath(
            `//*[contains(@class, "components-autocomplete__result") and contains(@class, "is-selected") and contains(text(), 'レスポンシブスペーサー')]`
        );
        await page.keyboard.press( 'Enter' );
        expect( await getEditedPostContent() ).toMatchSnapshot();
    } )
});