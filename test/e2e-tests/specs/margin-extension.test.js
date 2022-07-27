/**
 * WordPress dependencies
 */
 import {
	createNewPost,
	searchForBlock,
	openListView,
	clickMenuItem,
	clickBlockToolbarButton,
} from '@wordpress/e2e-test-utils';

/**
* Internal dependencies
*/
import { changeSiteLang } from '../helper/changeSiteLang';

// https://github.com/WordPress/gutenberg/blob/7d880708c6281c185256b8e7d3dffe178da33d09/packages/e2e-tests/specs/performance/post-editor.test.js#L34
jest.setTimeout( 1000000 );

async function getListViewBlocks( blockLabel ) {
	return page.$x(
		`//table[contains(@aria-label,'Block navigation structure')]//a[.//span[text()='${ blockLabel }']]`
	);
}

describe( 'MarginExtension', () => {
	let oldLanguage;
	beforeEach( async () => {
		jest.setTimeout(600000);
		oldLanguage = await changeSiteLang( 'en' );
		await createNewPost();
	} );
	afterEach( async () => {
		await changeSiteLang( oldLanguage );
	});
	it( 'MarginExtension', async () => {
			// 共通余白を選択をしやすくするためにトップツールバーをオンにする
			const optionsButtonSelector = `//button[@aria-label='Options']`;
			const [optionsButton] = await page.$x(optionsButtonSelector);
			await optionsButton.click();
			await page.keyboard.press( 'Enter' );

			/**
			 * 共通余白が設定できるブロック一覧
			 *
			 * ブロック名の変更や追加した場合はこの一覧を更新する必要ある
			 *
			 * 子ブロックに共通余白を追加する場合、親ブロックを配置していないと子ブロックの共通余白を追加することが出来ないため配置するブロックと余白を追加したいブロックの配列を用意している
			 */

			// 配列サンプル
			// const testBlockTitleLists = [
			// 	// ['配置したいブロック','共通余白を設定するブロック','editor-block-list-item-に続くクラス名']
			// 	['Paragraph', 'Paragraph', 'paragraph'],
			// 	[ "Ballon", "Ballon", "vk-blocks-balloon" ],
			// 	[ "New FAQ", "New FAQ", "vk-blocks-faq2" ],
			// 	['Heading', 'Heading', 'vk-blocks-heading'],
			// 	['Image', 'Image', 'image'],
			// 	['Heading', 'Heading', 'heading'],
			// ]

			const testBlockTitleLists = [
					[ "Alert", "Alert", "vk-blocks-alert" ],
					[ "Ballon", "Ballon", "vk-blocks-balloon" ],
					[ "Border Box", "Border Box", "vk-blocks-border-box" ],
					[ "Button", "Button", "vk-blocks-button" ],
					[ "Classic FAQ", "Classic FAQ", "vk-blocks-faq" ],
					[ "New FAQ", "New FAQ", "vk-blocks-faq2" ],
					[ "Flow", "Flow", "vk-blocks-flow" ],
					[ "Heading", "Heading", "vk-blocks-heading" ],
					[ "Icon", "Icon", "vk-blocks-icon" ],
					[ "Icon Outer", "Icon Outer", "vk-blocks-icon-outer" ],
					[ "Page Content", "Page Content", "vk-blocks-page-content" ],
					// [ "PR Blocks (not recommended)", "PR Blocks (not recommended)", "vk-blocks-pr-blocks" ],// ブロック名が長く省略されブロックの削除ができないため
					[ "PR Content", "PR Content", "vk-blocks-pr-content" ],
					[ "Responsive Spacer", "Responsive Spacer", "vk-blocks-spacer" ],
					[ "Staff", "Staff", "vk-blocks-staff" ],
					[ "Accordion", "Accordion", "vk-blocks-accordion" ],
					[ "Animation", "Animation", "vk-blocks-animation" ],
					[ "Breadcrumb", "Breadcrumb", "vk-blocks-breadcrumb" ],
					[ "Button Outer", "Button Outer", "vk-blocks-button-outer" ],
					[ "Card", "Card", "vk-blocks-card" ],
					[ "Child page list", "Child page list", "vk-blocks-child-page" ],
					[ "Grid Column", "Grid Column", "vk-blocks-grid-column" ],
					[ "Grid Column Card", "Grid Column Card", "vk-blocks-gridcolcard" ],
					[ "Icon Card", "Icon Card", "vk-blocks-icon-card" ],
					[ "Outer", "Outer", "vk-blocks-outer" ],
					[ "Post list", "Post list", "vk-blocks-post-list" ],
					[ "Selected Post List", "Selected Post List", "vk-blocks-select-post-list" ],
					[ "Step", "Step", "vk-blocks-step" ],
					[ "Slider", "Slider", "vk-blocks-slider" ],
					[ "Table of Contents", "Table of Contents", "vk-blocks-table-of-contents-new" ],
					[ "Timeline", "Timeline", "vk-blocks-timeline" ],
					[ "Paragraph", "Paragraph", "paragraph" ],
					[ "Image", "Image", "image" ],
					[ "Heading", "Heading", "heading" ],
					[ "Gallery", "Gallery", "gallery" ],
					[ "List", "List", "list" ],
					[ "Quote", "Quote", "quote" ],
					[ "Buttons", "Buttons", "buttons" ],
					[ "Code", "Code", "code" ],
					[ "Columns", "Columns", "columns" ],
					[ "Cover", "Cover", "cover" ],
					[ "Embed", "Embed", "embed" ],
					[ "File", "File", "file" ],
					[ "Group", "Group", "group" ],
					[ "Media & Text", "Media & Text", "media-text" ],
					[ "Preformatted", "Preformatted", "preformatted" ],
					[ "Pullquote", "Pullquote", "pullquote" ],
					[ "Separator", "Separator", "separator" ],
					[ "Spacer", "Spacer", "spacer" ],
					[ "Table", "Table", "table" ],
					// [ "Text Columns (deprecated)", "Text Columns (deprecated)", "text-columns" ], // ブロックが存在しないのでコメントアウト
					[ "Verse", "Verse", "verse" ],
					[ "Video", "Video", "video" ],
					[ "Navigation", "Navigation", "navigation" ],
					[ "Query Loop", "Query Loop", "query" ],
					// 子ブロック
					[ "New FAQ", "FAQ Answer", "vk-blocks-faq2" ],
					[ "New FAQ", "FAQ Question", "vk-blocks-faq2" ],
					[ "Accordion", "Accordion Target", "vk-blocks-accordion" ],
					[ "Accordion", "Accordion Trigger", "vk-blocks-accordion" ],
					[ "Grid Column", "Grid Column Item", "vk-blocks-grid-column" ],
					[ "Grid Column Card", "Grid Column Card Item", "vk-blocks-gridcolcard" ],
					[ "Step", "Step Item", "vk-blocks-step" ],
					[ "Timeline", "Timeline Item", "vk-blocks-timeline" ],
			]

			for (let i = 0; i < testBlockTitleLists.length; i++) {

				// ブロックを追加
				await searchForBlock( testBlockTitleLists[i][0] );
				const insertButton = await page.waitForXPath(
					`//button[contains(@class, "editor-block-list-item-${ testBlockTitleLists[i][2] }")]`
				);
				await insertButton.click();

				// List viewをクリック
				await openListView();

				const navExpander = await page.waitForXPath(
					`//a[.//span[text()='${testBlockTitleLists[i][0]}']]/span[contains(@class, 'block-editor-list-view__expander')]`
				);
				await navExpander.click();

				// 共通余白を設定したいブロックをクリック
				const targetBlock = (
					await getListViewBlocks( `${ testBlockTitleLists[i][1] }` )
				)[ 0 ];
				await targetBlock.click();

				// 共通余白のドロップダウンをクリック
				await clickBlockToolbarButton( 'Margin the block' );

				//共通余白 Top lgを選択
				await page.keyboard.press( 'Enter' );

				//共通余白 下をクリック
				await clickBlockToolbarButton( 'Margin the block' );
				for (let i = 0; i < 4; i++) {
					await page.keyboard.press( 'Tab' );
				}
				await page.keyboard.press( 'Enter' );

				// 共通余白のクラス名が存在するかチェック
				expect(
					await page.$( '.vk_block-margin-lg--margin-top' )
				).not.toBeNull();
				expect(
					await page.$( '.vk_block-margin-0--margin-bottom' )
				).not.toBeNull();

				// List viewをクリック
				await openListView();

				// 削除したいブロックをクリック
				const deleteBlock = (
					await getListViewBlocks( `${ testBlockTitleLists[i][0] }` )
				)[ 0 ];
				await deleteBlock.click();

				// 配置したブロックを削除
				await clickBlockToolbarButton( 'Options' );
				await clickMenuItem( `Remove ${testBlockTitleLists[i][0]}` );

			}
	} )

	/**
	 * 以下のブロックは上記のテストではブロックの配置が単純ではないため対応出来ていない
	 *
	 * Buttons > Button
	 * Columns, Columns > Column
	 * Navigation > Custom Link, Submenu
	 * Query Loop > Post Template, Pagination
	 * Grid Column Card Item Body
	 * Grid Column Card Item Footer
	 * Grid Column Card Item header
	 */

});

