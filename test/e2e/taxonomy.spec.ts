import { test, expect } from '@playwright/test';

test('Taxonomy Block Test', async ({ page }) => {
	// login
	await page.goto('http://localhost:8889/wp-login.php');
	await page.getByLabel('Username or Email Address').click();
	await page.getByLabel('Username or Email Address').fill('admin');
	await page.getByLabel('Username or Email Address').press('Tab');
	await page.getByLabel('Password', { exact: true }).fill('password');
	await page.getByLabel('Password', { exact: true }).press('Enter');

	// Install ExUnit /////////////////////////////////////////////////

	await page.getByRole('link', { name: 'Plugins', exact: true }).click();
	await page.locator('#wpbody-content').getByRole('link', { name: 'Add New' }).click();
	await page.getByPlaceholder('Search plugins...').fill('vk all in one expansion unit');
	await page.getByPlaceholder('Search plugins...').press('Enter');
	// ExUnit が表示されるまでちょい待機
	await page.waitForTimeout(1000);

	// Wait for display ExUnit Button 
	// ( At this point it is unknown whether it is the install button or the activate button )
	await page.waitForSelector('.plugin-card-vk-all-in-one-expansion-unit .plugin-action-buttons a.button');

	// Get button text
	const buttonText = await page.$eval('.plugin-card-vk-all-in-one-expansion-unit .plugin-action-buttons a.button', el => el.innerText);

	if (buttonText === 'Install Now') {
		// インストールボタンが存在する場合
		const installButton = await page.$('a[class="install-now button"][data-slug="vk-all-in-one-expansion-unit"]');
		if (installButton !== null) {
			console.log(buttonText);
			// インストールボタンが表示されるまで待機
			await page.waitForSelector('a[class="install-now button"][data-slug="vk-all-in-one-expansion-unit"]');

			// クリックしてインストール
			await installButton.click();

			// Activateボタンが表示されるまで待機
			await page.waitForSelector('a[class="button activate-now button-primary"][data-slug="vk-all-in-one-expansion-unit"]');
		}
	}

	// Activateボタンをクリックして有効化処理を実行
	await page.getByRole('link', { name: 'Activate VK All in One Expansion Unit' }).click();

	// Activateボタンが消えるまで待機
	await page.waitForSelector('a[class="button activate-now button-primary"][data-slug="vk-all-in-one-expansion-unit"]', { state: 'hidden' });

	// Add Event Post Type /////////////////////////////////////////////////

	await page.goto('http://localhost:8889/wp-admin/edit.php?post_type=post_type_manage');
	await page.locator('#wpbody-content').getByRole('link', { name: 'Add New' }).click();
	await page.getByLabel('Add title').fill('Event');
	await page.locator('#veu_post_type_id').fill('event');
	await page.getByText('title', { exact: true }).click();
	await page.getByText('editor', { exact: true }).click();
	await page.locator('[id="veu_taxonomy\\[1\\]\\[slug\\]"]').fill('event-cat');
	await page.locator('[id="veu_taxonomy\\[1\\]\\[label\\]"]').fill('Event Category');
	await page.getByRole('button', { name: 'Publish', exact: true }).click();
	// 「Update」ボタンが表示されるまで待つ
	await page.waitForSelector('#publish[value="Update"]');

	// Set permalink
	await page.goto('http://localhost:8889/wp-admin/options-permalink.php');
	await page.getByLabel('Post name').check();
	await page.getByRole('button', { name: 'Save Changes' }).click();

	// Add event category /////////////////////////////////////////////////
	await page.goto('http://localhost:8889/wp-admin/edit-tags.php?taxonomy=event-cat&post_type=event');
	await page.getByRole('textbox', { name: 'Name' }).fill('event-category');
	await page.getByRole('button', { name: 'Add New Category' }).click();

	// Add Event Post /////////////////////////////////////////////////
	await page.goto('http://localhost:8889/wp-admin/post-new.php?post_type=event');
	await page.getByRole('textbox', { name: 'Add title' }).fill('Event Post');
	await page.getByRole('button', { name: 'Add default block' }).click();
	await page.getByRole('document', { name: 'Empty block; start writing or type forward slash to choose a block' }).fill('/taxono');
	await page.getByRole('document', { name: 'Paragraph block' }).fill('/taxonomy');
	await page.getByRole('document', { name: 'Paragraph block' }).press('Enter');
	await page.getByRole('region', { name: 'Editor settings' }).getByRole('button', { name: 'Event' }).click();
	await page.getByLabel('event-category').check();
	await page.getByRole('button', { name: 'Publish', exact: true }).click();
	await page.getByRole('region', { name: 'Editor publish' }).getByRole('button', { name: 'Publish', exact: true }).click();

	// 一旦再読み込み（しないとタクソノミーブロックで event-category が選択肢にでてこないため）
	await page.getByRole('button', { name: 'Dismiss this notice' }).getByRole('link', { name: 'View Post' }).click();
	await page.getByRole('link', { name: ' Edit Post' }).click();

	// タクソノミーブロックで event-cat を指定
	await page.getByRole('document', { name: 'Block: Taxonomy' }).getByRole('listitem').click();
	await page.getByRole('combobox', { name: 'Taxonomy' }).selectOption('event-cat');
	await page.getByRole('button', { name: 'Update' }).click();
	await page.getByLabel('Display as dropdown').check();
	await page.getByRole('button', { name: 'Update' }).click();
	// タクソノミーブロックが配置された投稿を表示
	await page.getByRole('link', { name: 'View Post', exact: true }).click();

	// Select event-cat in taxonomy block
	await page.selectOption('.vk_taxonomy__input-wrap--select', { value: 'event-category' });

	// チェック
	// Event Category ページが表示されてるはず
	// h1タグのテキストを取得する
	const h1Text = await page.$eval('h1', el => el.textContent);

	// expect関数を使用して、h1タグのテキストが「event-category」を含むことを確認する
	expect(h1Text).toContain('event-category');

	// Check post category /////////////////////////////////////////////////

	// await page.goto('http://localhost:8889/wp-admin/post-new.php');
	// await page.getByRole('textbox', { name: 'Add title' }).fill('Test Post');
	// await page.getByRole('button', { name: 'Add default block' }).click();
	// await page.getByRole('document', { name: 'Empty block; start writing or type forward slash to choose a block' }).fill('/taxonomy');
	// await page.getByRole('option', { name: 'Taxonomy' }).click();
	// await page.getByLabel('Display as dropdown').check();

	// await page.getByRole('region', { name: 'Editor settings' }).getByRole('button', { name: 'Post' }).click();
	// // await page.getByLabel('Add New Tag').click();

	// // Set tag to post
	// await page.getByLabel('Add New Tag').fill('test-tag');
	// await page.getByLabel('Add New Tag').press('Enter');

	// // await page.goto('http://localhost:8889/wp-admin/post.php?post=10&action=edit');

	// await page.getByRole('button', { name: 'Publish', exact: true }).click();
	// await page.getByRole('region', { name: 'Editor publish' }).getByRole('button', { name: 'Publish', exact: true }).click();
	// // Display Post ----------------------------------------------
	// await page.getByRole('button', { name: 'Dismiss this notice' }).getByRole('link', { name: 'View Post' }).click();
	// // Select category in taxonomy block
	// await page.selectOption('.vk_taxonomy__input-wrap--select', { value: 'uncategorized' });
	// // expect関数を使用して、h1タグのテキストが「event-category」を含むことを確認する
	// expect(h1Text).toContain('Uncategorized');

	// // Chack Post tag /////////////////////////////////////////////////

	// await page.getByRole('link', { name: 'Test Post' }).click();
	// await page.getByRole('link', { name: ' Edit Post' }).click();

	// // Display Post ----------------------------------------------
	// await page.getByRole('document', { name: 'Block: Taxonomy' }).locator('div').nth(1).click();
	// // 対象を「post_tag」に変更
	// await page.getByRole('combobox', { name: 'Taxonomy' }).selectOption('post_tag');
	// await page.getByRole('button', { name: 'Update' }).click();
	// await page.getByRole('link', { name: 'View Post', exact: true }).click();
	// // Select category in taxonomy block
	// await page.selectOption('.vk_taxonomy__input-wrap--select', { value: 'test-tag' });
	// // expect関数を使用して、h1タグのテキストが「event-category」を含むことを確認する
	// expect(h1Text).toContain('test-tag');

	//////////////////////////////////////////////////////////////////////////////////////////////

	// Delete all event
	await page.goto('http://localhost:8889/wp-admin/edit.php?post_type=event');
	await page.locator('#cb-select-all-1').check();
	await page.locator('#bulk-action-selector-top').selectOption('trash');
	await page.locator('#doaction').click();
	await page.goto('http://localhost:8889/wp-admin/edit.php?post_status=trash&post_type=event');
	await page.locator('#post-query-submit + #delete_all').filter({ hasText: 'Empty Trash' }).click();

	// Delete Event Category
	await page.goto('http://localhost:8889/wp-admin/edit-tags.php?taxonomy=event-cat&post_type=event');
	await page.getByRole('link', { name: '“event-category” (Edit)' }).click();
	page.once('dialog', dialog => {
		console.log(`Dialog message: ${dialog.message()}`);
		dialog.dismiss().catch(() => { });
	});
	await page.getByRole('link', { name: 'Delete' }).click();

	// Delete all post_type_manage
	await page.goto('http://localhost:8889/wp-admin/edit.php?post_type=post_type_manage');
	await page.locator('#cb-select-all-1').check();
	await page.locator('#bulk-action-selector-top').selectOption('trash');
	await page.locator('#doaction').click();
	await page.goto('http://localhost:8889/wp-admin/edit.php?post_status=trash&post_type=post_type_manage');
	await page.locator('#post-query-submit + #delete_all').filter({ hasText: 'Empty Trash' }).click();

	// Delete ExUnit
	await page.getByRole('link', { name: 'Plugins', exact: true }).click();
	await page.getByRole('link', { name: 'Deactivate VK All in One Expansion Unit' }).click();
	// ※ 正常に ExUnit の削除が完了しない...が、まぁ今の所問題はないので保留。
	// ローカルでテストを繰り返す場合は http://localhost:8889/wp-admin/plugins.php で手動で削除する必要がある。
	page.once('dialog', dialog => {
		console.log(`Dialog message: ${dialog.message()}`);
		dialog.dismiss().catch(() => { });
	});
	await page.getByRole('link', { name: 'Delete VK All in One Expansion Unit' }).click();
});