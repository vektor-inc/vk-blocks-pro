/**
 * WordPress dependencies
 */
 import {
	pressKeyWithModifier,
	createNewPost,
	clickBlockAppender,
	clickBlockToolbarButton,
	getEditedPostContent,
	activateTheme,
	installTheme,
} from '@wordpress/e2e-test-utils';

/**
 * Internal dependencies
 */
 import { changeSiteLang } from '../helper/changeSiteLang';

describe( 'Lightning Highlighter', () => {
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

	it( 'Lightning Highlighter', async () => {
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
			`//button[text()='Highlighter']`
		);
		// Clicks may fail if the button is out of view. Assure it is before click.
		await button.evaluate( ( element ) => element.scrollIntoView() );
		await button.click();

		const option = await page.waitForSelector(
			'[aria-label="Color: Black"]'
		);

		await option.click();

		expect( await getEditedPostContent() ).toMatchSnapshot();

	} )

});
