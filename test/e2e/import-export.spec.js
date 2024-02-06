/**
 * External dependencies
 */
import path from 'path';

/**
 * WordPress dependencies
 */
import { test, expect } from '@playwright/test';

test( 'import option', async ( { page } ) => {
  await page.goto('http://localhost:8889/wp-login.php');
  await page.getByLabel('Username or Email Address').click();
  await page.getByLabel('Username or Email Address').fill('admin');
  await page.getByLabel('Username or Email Address').press('Tab');
  await page.getByLabel('Password', { exact: true }).fill('password');
  await page.getByRole('button', { name: 'Log In' }).click();
  await page.goto('http://localhost:8889/wp-admin/');
  await page.waitForTimeout(1000);

	await page.goto('http://localhost:8889/wp-admin/options-general.php?page=vk_blocks_options');

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
