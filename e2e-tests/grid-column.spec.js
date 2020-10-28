import {
	clickBlockToolbarButton,
	clickButton,
	createNewPost,
	enablePageDialogAccept,
	getEditedPostContent,
	insertBlock,
	ensureSidebarOpened
} from '@wordpress/e2e-test-utils';
import * as helper from './helper';


describe( 'Grid Column Item', () => {
	beforeAll( async () => {
		await enablePageDialogAccept();
	} );
	beforeEach( async () => {
		await createNewPost();
	} );

	it( 'ブロック追加テスト（ 追加される + エラーが発生しない)', async () => {
		await insertBlock( 'Grid Column' );
		await helper.checkForBlockErrors("vk-blocks/grid-column-item");
	} );

	it( 'ブロック修正テスト（ エラーが発生しない)', async () => {
		await insertBlock( 'Grid Column' );
		await page.type('textarea.block-editor-default-block-appender__content', 'We are Vektor,Inc.');
		await helper.checkForBlockErrors("vk-blocks/grid-column-item");
	} );

	it( '非表示設定をテスト', async　() => {
		await insertBlock( 'Grid Column' );
		//グリッドカラムアイテムに文字を入力。
		await page.type('textarea.block-editor-default-block-appender__content', 'We are Vektor,Inc.');
		//グリッドカラムアイテム選択
		await helper.selectChildBlockByName( 'vk-blocks/grid-column-item' );

		// await ensureSidebarOpened();
		await page.screenshot({path: './example.png'});

		// //サイドバーの非表示設定の全画面を選択
		// helpers.openSettingsPanel( 'Hidden Settings' );
		// helpers.turnOnEditorSetting( 'Hidden ( Screen size : all )' );
		// //ページ保存して再編集
		// helpers.savePage();
		// helpers.viewPage();
		// helpers.editPage();
		// //グリッドカラムアイテム選択
		// helpers.selectBlock( 'Grid Column' );
		// helpers.selectBlock( 'Grid Column Item' );
		// helpers.openSettingsPanel( 'Hidden Settings' );
		// //サイドバーの非表示設定の全画面がチェックされているか確認
		// cy.get( '.components-form-toggle.is-checked' ).should( 'exist' )
		// helpers.checkForBlockErrors( 'vk-blocks/grid-column-item' );
	} );

	// it( 'カスタムクラスを追加して確認', () => {
	// 	cy.get( '[data-type="vk-blocks/grid-column-item"]' ).first().click();
	// 	helpers.addCustomBlockClass( 'my-custom-class', 'grid-column-item' );

	// 	helpers.checkForBlockErrors( 'vk-blocks/grid-column-item' );

	// 	cy.get( '.wp-block-vk-blocks-grid-column-item' )
	// 		.should( 'have.class', 'my-custom-class' );
	// } );

	// it( 'Background color should be applied', async () => {
	// 	await insertBlock( 'Wrapper Block' );
	// 	await selectBlockByName( 'e2e-tests-example/wrapper-block' );

	// 	// Change background color
	// 	await openSidebarPanelWithTitle( 'Background Color' );
	// 	await selectOption( 'Background Color', 'orange' );

	// 	expect( await getEditedPostContent() ).toMatchSnapshot();
	// } );

	// it( 'Margin bottom should be applied', async () => {
	// 	await insertBlock( 'Wrapper Block' );
	// 	await selectBlockByName( 'e2e-tests-example/wrapper-block' );

	// 	// Apply margin bottom
	// 	await openSidebarPanelWithTitle( 'Margin bottom' );
	// 	await clickElementByText( 'label', 'Add margin bottom' );

	// 	expect( await getEditedPostContent() ).toMatchSnapshot();
	// } );

	// it( 'Alignment should be set', async () => {
	// 	await insertBlock( 'Wrapper Block' );
	// 	await selectBlockByName( 'e2e-tests-example/wrapper-block' );

	// 	// Change alignment
	// 	await clickBlockToolbarButton( 'Change wrapper block alignment' );
	// 	await clickButton( 'Align Text Center' );

	// 	expect( await getEditedPostContent() ).toMatchSnapshot();
	// } );
} );
