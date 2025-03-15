import { test, expect } from '@wordpress/e2e-test-utils-playwright';

test.describe( 'Block', () => {
	test.beforeEach( async ( { admin, page } ) => {
		// パーマリンクを設定
		await admin.visitAdminPage( 'options-permalink.php' );
		await page.getByText( 'Post name' ).click();
		await page.getByRole( 'button', { name: 'Save Changes' } ).click();

        // 非推奨ブロックを有効化
        // await admin.visitAdminPage( 'options-general.php?page=vk_blocks_options' );
        // await page.getByRole('checkbox', { name: 'VKDeprecated Blocks' }).check();
        // await page.locator('div').filter({ hasText: /^Save setting$/ }).click();

		// それぞれのテストの前に新しい投稿を作成する
		await admin.createNewPost();
	} );

	test( 'should be created', async ( { editor, page } ) => {
		// ブロックを挿入する
		await editor.insertBlock( {
			name: 'vk-blocks/breadcrumb',
		} );
		await page.getByRole('button', { name: 'Margin the block' }).click();
		await page.getByRole('menuitem', { name: 'Top XL' }).click();

		await expect( editor.canvas.getByLabel('Block: Breadcrumb') ).toHaveClass(
			'block-editor-block-list__block wp-block is-selected vk_block-margin-xl--margin-top wp-block-vk-blocks-breadcrumb'
		);

	} );
} );
