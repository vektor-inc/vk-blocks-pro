import {
	createNewPost,
	enablePageDialogAccept,
	publishPost,
	openGlobalBlockInserter
} from '@wordpress/e2e-test-utils';
import * as helper from './helper';
const timeout =  5000;

describe( `All Blocks Test`, () => {

	beforeAll( async () => {
		await enablePageDialogAccept();
	} );
	beforeEach( async () => {
		await createNewPost();
	} );

	jest.setTimeout(20000);

	// 下の箇所がnull返ってくるので、チェック
	const blocks = [
		//Free
		{ label: "Alert", slug: "vk-blocks/alert" },
		// { label: "Ballon", slug: "vk-blocks/balloon" },
		// { label: "Border Box", slug: "vk-blocks/border-box" },
		// { label: "Button", slug: "vk-blocks/button", index: 1  },
		// { label: "Classic FAQ", slug: "vk-blocks/faq" },
		// { label: "New FAQ", slug: "vk-blocks/faq2" },
		// { label: "Flow", slug: "vk-blocks/flow" },
		// { label: "Heading", slug: "vk-blocks/heading", index: 1  },
		// { label: "PR Blocks", slug: "vk-blocks/pr-blocks" },
		// { label: "PR Content", slug: "vk-blocks/pr-content" },
		// { label: "Responsive Spacer", slug: "vk-blocks/spacer" },
		// { label: "Staff", slug: "vk-blocks/staff" },
		// // Pro
		// { label: "Animation", slug: "vk-blocks/animation" },
		// { label: "Card", slug: "vk-blocks/card", index: 1 },
		// { label: "Child page list", slug: "vk-blocks/child-page" },
		// { label: "Grid Column", slug: "vk-blocks/grid-column" },
		// { label: "Icon Card", slug: "vk-blocks/icon-card" },
		// { label: "Outer", slug: "vk-blocks/outer" },
		// { label: "Post list", slug: "vk-blocks/post-list" },
		// { label: "Slider", slug: "vk-blocks/slider" },
		// { label: "Step", slug: "vk-blocks/step" },
		// { label: "Table of Contents", slug: "vk-blocks/table-of-contents-new" },
		// { label: "Timeline", slug: "vk-blocks/timeline" },
	];


	blocks.forEach( ( block ) => {

		it( `Test Javascript: ${block.label}`, async () => {

			// Insert Block
			// 同名ブロックの誤挿入を避けるためのindexがあるかチェック
			if ( block.index ) {
				// indexがあれば、同名のindex番目のブロックを挿入
				await helper.insertBlockByIndex( block.label, block.index );
			} else {
				// indexがなければそのままブロックを挿入
				await helper.insertBlockByIndex( block.label );
			}

			// Check if block was inserted and no error.
			await helper.checkForBlockErrors( block.slug );

			// await page.screenshot({path: `./tests/e2e/screenshot/${block.label}.png`});
		});

		it( `Test PHP: ${block.label}`, async () => {

			// Insert Block
			// 同名ブロックの誤挿入を避けるためのindexがあるかチェック
			if ( block.index ) {
				// indexがあれば、同名のindex番目のブロックを挿入
				await helper.insertBlockByIndex( block.label, block.index );
			} else {
				// indexがなければそのままブロックを挿入
				await helper.insertBlockByIndex( block.label );
			}

			await helper.typeTitle( block.label );


			await publishPost();

			const publishUrl = await page.evaluate( () => {
				// Get publish URL.
				const publishUrlTag = document.querySelector(".post-publish-panel__postpublish-header.is-opened").innerHTML;
				const url = publishUrlTag.match(/http.+?"/g);
				// remove "
				return url[0].slice(0, -1);

			})

			await page.goto(publishUrl);

			// Get texts in published post.
			const contents = await page.evaluate(() => {
				return document.querySelector(".entry-content").innerText;
			});

			// Check Error messages.
			expect( contents.match(/Notice/) ).toBeNull();
			expect( contents.match(/Warning/) ).toBeNull();
			expect( contents.match(/Fatal/) ).toBeNull();
		});
	})
} );
