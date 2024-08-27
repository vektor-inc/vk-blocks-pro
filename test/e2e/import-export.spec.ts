/**
 * External dependencies
 */
import path from 'path';
import { test, expect } from '@wordpress/e2e-test-utils-playwright';


test( 'import option', async ( {  admin, page } ) => {
	await admin.visitAdminPage( 'options-general.php?page=vk_blocks_options' );


	const originalEntries = await page.locator( '.balloonIconList li' ).count();

	// Select the file to upload.
	const testReusableBlockFile = path.join(
		__dirname,
		'import-export.json'
	);
	await page.setInputFiles( 'input[type="file"]', testReusableBlockFile );

	// Submit the form.
	await page.click( 'role=button[name="Import"i]' );

	// Submit the form.
	await page.click( 'role=button[name="Import"i]' );

	await expect( page.locator( '.balloonIconList li' ) ).toHaveCount(
		originalEntries + 1
	);
} );
