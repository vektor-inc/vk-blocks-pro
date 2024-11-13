import { test, expect } from '@wordpress/e2e-test-utils-playwright';

test.describe( 'Block', () => {
	test.beforeEach( async ( { admin, page } ) => {
		// パーマリンクを設定
		await admin.visitAdminPage( 'options-permalink.php' );
		await page.getByText( 'Post name' ).click();
		await page.getByRole( 'button', { name: 'Save Changes' } ).click();

        // 非推奨ブロックを有効化
        await admin.visitAdminPage( 'options-general.php?page=vk_blocks_options' );
        await page.getByRole('checkbox', { name: 'VKDeprecated Blocks' }).check();
        await page.locator('div').filter({ hasText: /^Save setting$/ }).click();

		// それぞれのテストの前に新しい投稿を作成する
		await admin.createNewPost();
	} );

	test( 'should be created', async ( { editor, page } ) => {
		// ブロックを挿入する
		await editor.insertBlock( {
			name: 'vk-blocks/heading',
		} );

		// 文字を変更
        await page.getByLabel('Input title…').click();
        await page.getByLabel('Input title…').fill('aaaa');

		// マージン変更
		await page.locator('#inspector-input-control-0').click();
		await page.locator('#inspector-input-control-0').fill('1');
		await page.locator('#inspector-input-control-1').click();
		await page.locator('#inspector-input-control-1').fill('1');

		// 見出し文字
		await page.getByRole('spinbutton', { name: 'Text size (rem)' }).click();
        await page.getByRole('spinbutton', { name: 'Text size (rem)' }).fill('2');
        await page.locator('#components-circular-option-picker-0-2').click();


		// サブテキスト
		await page.getByLabel('Display', { exact: true }).check();
		await page.getByLabel('Input sub text…').click();
		await page.getByLabel('Input sub text…').fill('bbbb');
		await page.locator('#inspector-input-control-3').click();
		await page.locator('#inspector-input-control-3').fill('2');
        await page.locator('#components-circular-option-picker-2-22').click();

        // 見出しに変換
        await page.getByLabel('Heading(not recommended)', { exact: true }).click();
        await page.getByRole('menuitem', { name: 'Heading' }).click();

		// 変換内容
		await expect( page.locator( '.wp-block-heading' ) ).toHaveClass(
			'block-editor-rich-text__editable block-editor-block-list__block wp-block is-multi-selected wp-elements-0 has-accent-1-color has-text-color wp-block-heading rich-text'
		);
		await expect( page.locator( '.wp-block-heading' ) ).toHaveCSS(
			'margin-bottom',
			'16px'
		);
		await expect( page.locator( 'p.has-text-color' ) ).toHaveCSS(
			'font-size',
			'32px'
		);
		await expect( page.locator( '.wp-block-heading' ) ).toHaveClass(
			'block-editor-rich-text__editable block-editor-block-list__block wp-block is-multi-selected wp-elements-0 has-accent-1-color has-text-color wp-block-heading rich-text'
		);
		await expect( page.locator( '.wp-block-heading' ) ).toHaveCSS(
			'margin-bottom',
			'16px'
		);
		await expect( page.locator( 'p.has-text-color' ) ).toHaveCSS(
			'font-size',
			'32px'
		);

	} );
} );