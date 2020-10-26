/**
 * Include our constants
 */
import * as helpers from '../../../../../.dev/tests/cypress/helpers'

describe( 'Block: Grid Column Item', () => {
	beforeEach( () => {
		// cy.get( '[data-type="core/paragraph"]' ).type( '/grid' );
		cy.contains("Start writing or type / to choose a block").type( '/grid' );
		cy.contains("Grid Column").click();
		// helpers.addBlockToPost( 'vk-blocks/grid-column', true );
	} );

	t( 'プラグインがインストールされているかチェック', () => {
		// 挿入されたか確認
		helpers.goTo( '/wp-admin/plugins.php' );
	} );

	it( 'ブロック新規挿入時に壊れないかチェック', () => {
		// 挿入されたか確認
		cy.get( '[data-type="vk-blocks/grid-column-item"]' ).should( 'exist' );
		helpers.checkForBlockErrors( 'vk-blocks/grid-column-item' );
	} );

	it( 'ブロック修正時に壊れないかテスト', () => {
		//グリッドカラムアイテムに「title」と入力。
		cy.get( '[data-type="vk-blocks/grid-column-item"] .wp-block-vk-blocks-grid-column-item' ).type( 'title' );
		helpers.checkForBlockErrors( 'vk-blocks/grid-column-item' );
	} );

	it( '非表示設定をテスト', () => {
		//グリッドカラムアイテムに「title」と入力。
		cy.get( '[data-type="vk-blocks/grid-column-item"] .wp-block-vk-blocks-grid-column-item' ).type( 'title' );
		//グリッドカラムアイテム選択
		helpers.selectBlock( 'Grid Column Item' );
		//サイドバーの非表示設定の全画面を選択
		helpers.openSettingsPanel( 'Hidden Settings' );
		helpers.turnOnEditorSetting( 'Hidden ( Screen size : all )' );
		//ページ保存して再編集
		helpers.savePage();
		helpers.viewPage();
		helpers.editPage();
		//グリッドカラムアイテム選択
		helpers.selectBlock( 'Grid Column' );
		helpers.selectBlock( 'Grid Column Item' );
		helpers.openSettingsPanel( 'Hidden Settings' );
		//サイドバーの非表示設定の全画面がチェックされているか確認
		cy.get( '.components-form-toggle.is-checked' ).should( 'exist' )
		helpers.checkForBlockErrors( 'vk-blocks/grid-column-item' );
	} );

	it( 'カスタムクラスを追加して確認', () => {
		cy.get( '[data-type="vk-blocks/grid-column-item"]' ).first().click();
		helpers.addCustomBlockClass( 'my-custom-class', 'grid-column-item' );

		helpers.checkForBlockErrors( 'vk-blocks/grid-column-item' );

		cy.get( '.wp-block-vk-blocks-grid-column-item' )
			.should( 'have.class', 'my-custom-class' );
	} );
} );
