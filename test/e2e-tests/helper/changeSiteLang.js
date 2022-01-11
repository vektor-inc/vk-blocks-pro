/**
 * WordPress dependencies
 */
 import {
    visitAdminPage,
    switchUserToAdmin,
    switchUserToTest
} from '@wordpress/e2e-test-utils';

/**
 * Visits general settings page and changes the language to the given vaule.
 *
 * @param {string} lang Value of the language to set.
 *
 * @return {string} Value of the previous language.
 */
export async function changeSiteLang( lang ) {
    await switchUserToAdmin();
    await visitAdminPage( 'options-general.php' );

    const oldLang = await page.$eval(
        '#WPLANG',
        ( element ) => element.options[ element.selectedIndex ].text
    );
    await page.select( '#WPLANG', lang );
    await Promise.all( [
        page.click( '#submit' ),
        //page.waitForNavigaion( { waitUntil: 'networkidle0' } ),
    ]);

    await switchUserToTest();

    return oldLang;
}