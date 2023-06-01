import { test, expect } from '@playwright/test';

test('Common margin', async ({ page }) => {
	await page.goto('http://localhost:8889/wp-login.php');
	await page.getByLabel('Username or Email Address').click();
	await page.getByLabel('Username or Email Address').fill('admin');
	await page.getByLabel('Username or Email Address').press('Tab');
	await page.getByLabel('Password', { exact: true }).fill('password');
	await page.getByRole('button', { name: 'Log In' }).click();
	await page.goto('http://localhost:8889/wp-admin/post-new.php');

	// Check if the modal is visible
	const isModalVisible = await page.isVisible('.components-modal__frame');

	// If the modal is visible, click the close button
	if (isModalVisible) {
		await page.click('button[aria-label="Close"]');
	}

	await page.getByRole('button', { name: 'Toggle block inserter' }).click();
	await page.getByPlaceholder('Search').fill('breadcrumb');
	await page.getByRole('option', { name: 'Breadcrumb', exact: true }).click();
	await page.getByRole('button', { name: 'Margin the block' }).click();
	await page.getByRole('menuitem', { name: 'Top XL' }).click();

	// パンくず要素を取得
	const element = await page.$('div.wp-block-vk-blocks-breadcrumb');
	if (element !== null) {
		const classAttribute = await element.getAttribute('class');
		if (classAttribute !== null) {
			// パンくず要素に vk_block-margin-xl--margin-top クラスが付与されているか確認
			const hasClass = classAttribute.includes('vk_block-margin-xl--margin-top');
			expect(hasClass).toBeTruthy();
		} else {
			throw new Error('classAttribute is null');
		}
	} else {
		throw new Error('Element not found');
	}
});