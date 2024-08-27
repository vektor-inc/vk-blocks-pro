import { test, expect } from '@wordpress/e2e-test-utils-playwright';

test('Taxonomy Block Test', async ({ editor, page }) => {
	// login
	await page.goto('http://localhost:8889/wp-login.php');
	await page.getByLabel('Username or Email Address').click();
	await page.getByLabel('Username or Email Address').fill('admin');
	await page.getByLabel('Username or Email Address').press('Tab');
	await page.getByLabel('Password', { exact: true }).fill('password');
	await page.getByLabel('Password', { exact: true }).press('Enter');

	// Install ExUnit /////////////////////////////////////////////////
	await page.goto('http://localhost:8889/wp-admin/');
	// Check if the modal is visible
	const isPTM = await page.isVisible('#menu-posts-post_type_manage');

	// If the modal is visible, click the close button
	if (!isPTM) {
		console.log('ExUnit is not active');
		await page.goto('http://localhost:8889/wp-admin/plugins.php');
		await page.locator('#wpbody-content').getByRole('link', { name: 'Add New' }).click();
		await page.getByPlaceholder('Search plugins...').fill('vk all in one expansion unit');
		await page.getByPlaceholder('Search plugins...').press('Enter');
		// ExUnit が表示されるまでちょい待機
		await page.waitForTimeout(1000);

		// Wait for display ExUnit Button 
		// ( At this point it is unknown whether it is the install button or the activate button )
		await page.waitForSelector('.plugin-card-vk-all-in-one-expansion-unit .plugin-action-buttons .button');

		// Get button text
		const buttonText = await page.$eval('.plugin-card-vk-all-in-one-expansion-unit .plugin-action-buttons .button', el => el.textContent);

		if (buttonText === 'Install Now') {
			console.log(buttonText);
			// インストールボタンが存在する場合
			// インストールボタンが表示されるまで待機
				await page.waitForSelector('a[class="install-now button"][data-slug="vk-all-in-one-expansion-unit"]');
			const installButton = await page.$('a[class="install-now button"][data-slug="vk-all-in-one-expansion-unit"]');
			if (installButton !== null) {


				// インストールボタンが表示されるまで待機
				await page.waitForSelector('a[class="install-now button"][data-slug="vk-all-in-one-expansion-unit"]');

				// クリックしてインストール
				await installButton.click();

				// Activateボタンが表示されるまで待機
				await page.waitForSelector('a[class="button activate-now button-primary"][data-slug="vk-all-in-one-expansion-unit"]');
			}
		} else if (buttonText === 'Update Now') {
			console.log(buttonText);
			const updateButton = await page.$('a[class*="update-now button"][data-slug="vk-all-in-one-expansion-unit"]');
			if (updateButton !== null) {
				await updateButton.click();
				// アップデート完了まで待機
				await page.waitForSelector('a[class*="button activate-now"][data-slug="vk-all-in-one-expansion-unit"]');
			}
		}

				// Check if the button is disabled
				const isDisabled = await page.$eval('.plugin-card-vk-all-in-one-expansion-unit .plugin-action-buttons .button', (button) => button.disabled);

				// If the button is not disabled, click it
				// すでに ExUnit が有効化されていない場合のみ有効化処理を実行
				if (!isDisabled) {
					await page.goto('http://localhost:8889/wp-admin/plugins.php');
					// Activateボタンをクリックして有効化処理を実行
					await page.getByLabel('Activate VK All in One Expansion Unit').click();
		
					// Activateボタンが消えるまで待機
					await page.waitForSelector('a[class*="button activate-now"][data-slug="vk-all-in-one-expansion-unit"]', { state: 'hidden' });
				}
	} else {
		console.log('ExUnit is active');
	}

	// Add Event Post Type /////////////////////////////////////////////////

	await page.goto('http://localhost:8889/wp-admin/edit.php?post_type=post_type_manage');
	await page.locator('#wpbody-content').getByRole('link', { name: 'Add New Post' }).click();
	await page.getByLabel('Add title').fill('Event');
	await page.locator('#veu_post_type_id').fill('event');
	await page.getByText('title', { exact: true }).click();
	await page.getByText('editor', { exact: true }).click();
	await page.locator('[id="veu_taxonomy\\[1\\]\\[slug\\]"]').fill('event-cat');
	await page.locator('[id="veu_taxonomy\\[1\\]\\[label\\]"]').fill('Event Category');
	await page.getByRole('button', { name: 'Publish', exact: true }).click();
	// 「Update」ボタンが表示されるまで待つ
	// await page.waitForSelector('#publish[value="Update"]');

	// Set permalink
	await page.goto('http://localhost:8889/wp-admin/options-permalink.php');
	await page.getByLabel('Post name').check();
	await page.getByRole('button', { name: 'Save Changes' }).click();

	// Add event category /////////////////////////////////////////////////
	await page.goto('http://localhost:8889/wp-admin/edit-tags.php?taxonomy=event-cat&post_type=event');
	await page.getByRole('textbox', { name: 'Name' }).fill('event-term');
	await page.getByRole('button', { name: 'Add New Category' }).click();

	// Add Event Post /////////////////////////////////////////////////
	await page.goto('http://localhost:8889/wp-admin/post-new.php?post_type=event');

	await page.waitForTimeout(2000);
	// Check if the modal is visible
	const isModalVisible = await page.isVisible('.components-modal__frame');

	// If the modal is visible, click the close button
	if (isModalVisible) {
		await page.click('button[aria-label="Close"]');
	}

	await page.getByRole('textbox', { name: 'Add title' }).fill('Event Post');

	// ブロックを挿入する
	await editor.insertBlock( {
		name: 'vk-blocks/taxonomy',
	} );

	// サイドパネル（投稿タイプ）を開く
	await page.getByRole('tab', { name: 'Event' }).click();

	// サイドパネルが閉じている場合があるので、すべてのパネルを取得して、対象のパネルが閉じていたら開く
	// Get all buttons with the specified classes
	const EventMetaPanels = await page.$$('.components-button.components-panel__body-toggle');

	for (const button of EventMetaPanels) {
		// Get the button text
		const buttonText = await button.textContent();

		// Check if the button text is "Event Category"
		if (buttonText === 'Event Category') {
			// Get the value of the 'aria-expanded' attribute
			const isExpanded = await button.getAttribute('aria-expanded');

			// If the panel is not expanded, click the button
			if (isExpanded === 'false') {
				await button.click();
			}
		}
	}

	await page.getByLabel('event-term').check();
	await page.getByRole('button', { name: 'Publish', exact: true }).click();
	await page.getByRole('region', { name: 'Editor publish' }).getByRole('button', { name: 'Publish', exact: true }).click();

	// 一旦再読み込み（しないとタクソノミーブロックで event-category が選択肢にでてこないため）
	await page.getByRole('button', { name: 'Dismiss this notice' }).getByRole('link', { name: 'View Post' }).click();
	await page.getByRole('menuitem', { name: ' Edit Post' }).click();

	// タクソノミーブロックで event-cat を指定
	await page.getByRole('document', { name: 'Block: Taxonomy' }).getByRole('listitem').click();
	await page.getByRole('combobox', { name: 'Taxonomy' }).selectOption('event-cat');
	await page.getByRole('button', { name: 'Update' }).click();
	await page.getByLabel('Display as dropdown').check();
	await page.getByRole('button', { name: 'Update' }).click();
	// タクソノミーブロックが配置された投稿を表示
	// await page.getByRole('link', { name: 'View Post', exact: true }).click(); // <- 複数 Vew Post があるとエラーになる
	// View Post 表記のリンクが複数ある（管理バーがアクティブの場合）とエラーになるため .components-snackbar__action の View Post をクリックする
	// 一旦 .components-snackbar__action のリンクをすべて取得して...
	const links = await page.$$('.components-snackbar__action');
	// テキストが View Post のリンクを探してクリックする
	for (let link of links) {
		const value = await link.evaluate(node => node.textContent);
		if (value === 'View Post') {
			await link.click();
			break;
		}
	}

	// Select event-cat in taxonomy block
	await page.selectOption('.vk_taxonomy__input-wrap--select', { value: 'event-term' });

	// チェック
	// Event Category ページが表示されてるはず
	// h1タグのテキストを取得する
	await page.waitForSelector('h1.alignwide.wp-block-query-title');
	let h1Text = await page.$eval('h1.alignwide.wp-block-query-title', el => el.textContent);
	// expect関数を使用して、h1タグのテキストが「event-category」を含むことを確認する
	expect(h1Text).toContain('event-term');

	// Check post category /////////////////////////////////////////////////

	await page.goto('http://localhost:8889/wp-admin/post-new.php');
	await page.getByRole('textbox', { name: 'Add title' }).fill('Test Post');
	// ブロックを挿入する
	await editor.insertBlock( {
		name: 'vk-blocks/taxonomy',
	} );
	await page.getByRole('tab', { name: 'Block' }).click();
	 await page.getByLabel('Editor settings').getByLabel('Taxonomy').selectOption('category');
	await page.getByLabel('Display as dropdown').check();

	// サイドパネル（投稿タイプ）を開く
	await page.getByRole('tab', { name: 'Post' }).click();

	// await page.getByLabel('Add New Tag').click();


	// サイドパネルが閉じている場合があるので、操作したいパネルが閉じていたら開く処理が必要

	// まずはサイドパネルは後からバタバタでてきたりするので、パネルがでてくるまで待つ
	// とりあえず２秒待つ（本当は適当に待つだけじゃなくてちゃんと対象のサイドパネルを指定するべき...）
	await page.waitForTimeout(1500);

	// Get all metabox
	const PostMetaPanels = await page.$$('.components-button.components-panel__body-toggle');

	// await page.waitForSelector('text=*Tags*');

	for (const button of PostMetaPanels) {
		// Get the button text
		const buttonText = await button.textContent();
		if (buttonText === 'Tags') {
			// Get the value of the 'aria-expanded' attribute
			const isExpanded = await button.getAttribute('aria-expanded');

			// If the panel is not expanded, click the button
			if (isExpanded === 'false') {
				await button.click();
			}
			// Set tag to post
			await page.getByLabel('Add New Tag').fill('test-tag');
			await page.getByLabel('Add New Tag').press('Enter');
			await page.waitForTimeout(1000);
		}
	}

	// await page.goto('http://localhost:8889/wp-admin/post.php?post=10&action=edit');

	await page.getByRole('button', { name: 'Publish', exact: true }).click();
	await page.getByRole('region', { name: 'Editor publish' }).getByRole('button', { name: 'Publish', exact: true }).click();
	// Display Post ----------------------------------------------
	await page.getByRole('button', { name: 'Dismiss this notice' }).getByRole('link', { name: 'View Post' }).click();
	// Select category in taxonomy block
	await page.selectOption('.vk_taxonomy__input-wrap--select', { value: 'uncategorized' });
	// チェック
	// h1タグのテキストを取得する
	await page.waitForSelector('h1.alignwide.wp-block-query-title');
	h1Text = await page.$eval('h1.alignwide.wp-block-query-title', el => el.textContent);
	// expect関数を使用して、h1タグのテキストが「Uncategorized」を含むことを確認する
	expect(h1Text).toContain('Uncategorized');

	// Chack Post tag /////////////////////////////////////////////////

	await page.getByRole('link', { name: 'Test Post' }).first().click();
	await page.getByRole('menuitem', { name: ' Edit Post' }).click();

	// Display Post ----------------------------------------------
	await page.getByRole('document', { name: 'Block: Taxonomy' }).locator('div').nth(1).click();
	// 対象を「post_tag」に変更
	await page.getByRole('combobox', { name: 'Taxonomy' }).selectOption('post_tag');
	await page.getByRole('button', { name: 'Update' }).click();
	await page.getByRole('button', { name: 'Dismiss this notice' }).getByRole('link', { name: 'View Post' }).click();
	// Select category in taxonomy block
	await page.selectOption('.vk_taxonomy__input-wrap--select', { value: 'test-tag' });
	// チェック
	// h1タグのテキストを取得する
	await page.waitForSelector('h1.alignwide.wp-block-query-title');
	h1Text = await page.$eval('h1.alignwide.wp-block-query-title', el => el.textContent);
	// expect関数を使用して、h1タグのテキストが「test-tag」を含むことを確認する
	expect(h1Text).toContain('test-tag');

	//////////////////////////////////////////////////////////////////////////////////////////////

	// Delete Test post
	await page.goto('http://localhost:8889/wp-admin/edit.php?post_type=post');
	await page.locator('#cb-select-all-1').check();
	await page.locator('#bulk-action-selector-top').selectOption('trash');
	await page.locator('#doaction').click();
	await page.goto('http://localhost:8889/wp-admin/edit.php?post_status=trash&post_type=post');
	await page.locator('#post-query-submit + #delete_all').filter({ hasText: 'Empty Trash' }).click();

	// Delete all event
	await page.goto('http://localhost:8889/wp-admin/edit.php?post_type=event');
	await page.locator('#cb-select-all-1').check();
	await page.locator('#bulk-action-selector-top').selectOption('trash');
	await page.locator('#doaction').click();
	await page.goto('http://localhost:8889/wp-admin/edit.php?post_status=trash&post_type=event');
	await page.locator('#post-query-submit + #delete_all').filter({ hasText: 'Empty Trash' }).click();

	// Delete Event Category
	await page.goto('http://localhost:8889/wp-admin/edit-tags.php?taxonomy=event-cat&post_type=event');
	await page.getByRole('link', { name: '“event-term” (Edit)' }).click();
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

	// Check Plugin ExUnit is Active
	const isExUnitActive = await page.isVisible('#wp-admin-bar-veu_adminlink');

	// If ExUnit Active
	if (isExUnitActive) {
		await page.getByRole('link', { name: 'Plugins', exact: true }).click();
		await page.getByRole('link', { name: 'Deactivate VK All in One Expansion Unit' }).click();
		// ※ 正常に ExUnit の削除が完了しない...が、まぁ今の所問題はないので保留。
		// ローカルでテストを繰り返す場合は http://localhost:8889/wp-admin/plugins.php で手動で削除する必要がある。
		page.once('dialog', dialog => {
			console.log(`Dialog message: ${dialog.message()}`);
			dialog.dismiss().catch(() => { });
		});
		await page.getByRole('link', { name: 'Delete VK All in One Expansion Unit' }).click();
	}
});