/**
 * WordPress dependencies
 */
 import {
	createNewPost,
	insertBlock,
	openDocumentSettingsSidebar,
	findSidebarPanelWithTitle,
	getEditedPostContent,
	getAllBlocks
} from '@wordpress/e2e-test-utils';

/**
 * Internal dependencies
 */
import { changeSiteLang } from '../helper/changeSiteLang';

describe( 'CustomCssExtension', () => {
	let oldLanguage;
	beforeEach( async () => {
		oldLanguage = await changeSiteLang( 'en' );
		await createNewPost();
	} );
	afterEach( async () => {
		await changeSiteLang( oldLanguage );
	});

	it( `CustomCssExtension Paragraph`, async () => {
		// ブロックを追加
		await insertBlock('Paragraph');
		// Open the sidebar.
		await openDocumentSettingsSidebar();
		// 設定パネルを開く
		const openButton = await findSidebarPanelWithTitle( 'Custom CSS' );
		await openButton.click();
		// Custom CSSコードエディタをクリックする
		await page.click( '[id$="vk-custom-css-code-mirror"]' );
		// cssを記述
		await page.keyboard.type( 'selector { \n background: #f5f5f5;' );

		const regexBefore = new RegExp(
			`<!-- wp:paragraph {\\"vkbCustomCss\\":\\"selector {\\\\n   background: #f5f5f5;\\\\n}\\",\\"className\\":\\"vk_custom_css"} -->
<p class=\\"vk_custom_css"></p>
<!-- /wp:paragraph -->`
		);
		expect(await getEditedPostContent()).toMatch(regexBefore);
	} )

	it( `CustomCssExtension Archives`, async () => {
		await insertBlock('Archives');
		await openDocumentSettingsSidebar();
		const openButton = await findSidebarPanelWithTitle( 'Custom CSS' );
		await openButton.click();
		await page.click( '[id$="vk-custom-css-code-mirror"]' );
		await page.keyboard.type( 'selector { \n background: #f5f5f5;' );
		const regexBefore = new RegExp(
			`<!-- wp:archives {\\"vkbCustomCss\\":\\"selector {\\\\n   background: #f5f5f5;\\\\n}\\",\\"className\\":\\"vk_custom_css\\"} /-->`
		);
		expect(await getEditedPostContent()).toMatch(regexBefore);
	} )

	it( `CustomCssExtension Alert`, async () => {
		await insertBlock('Alert');
		await openDocumentSettingsSidebar();
		const openButton = await findSidebarPanelWithTitle( 'Custom CSS' );
		await openButton.click();
		await page.click( '[id$="vk-custom-css-code-mirror"]' );
		await page.keyboard.type( 'selector { \n background: #f5f5f5;' );
		const regexBefore = new RegExp(
			`<!-- wp:vk-blocks/alert {\\"vkbCustomCss\\":\\"selector {\\\\n   background: #f5f5f5;\\\\n}\\",\\"className\\":\\"vk_custom_css\\"} -->
<div class=\\"wp-block-vk-blocks-alert alert alert-info vk_custom_css\\"><p></p></div>
<!-- /wp:vk-blocks/alert -->`
		);
		expect(await getEditedPostContent()).toMatch(regexBefore);
	} )

	it( `CustomCssExtension Breadcrumb`, async () => {
		await insertBlock('Breadcrumb');
		await openDocumentSettingsSidebar();
		const openButton = await findSidebarPanelWithTitle( 'Custom CSS' );
		await openButton.click();
		await page.click( '[id$="vk-custom-css-code-mirror"]' );
		await page.keyboard.type( 'selector { \n background: #f5f5f5;' );
		const regexBefore = new RegExp(
			`<!-- wp:vk-blocks/breadcrumb {\\"className\\":\\"vk_custom_css\\",\\"vkbCustomCss\\":\\"selector {\\\\n   background: #f5f5f5;\\\\n}\\"} /-->`
		);
		expect(await getEditedPostContent()).toMatch(regexBefore);
	} )

});
