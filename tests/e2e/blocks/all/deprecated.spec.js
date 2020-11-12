import {
	createNewPost,
	enablePageDialogAccept,
} from '@wordpress/e2e-test-utils';
import * as helper from '../../helper';
const timeout =  5000;

describe( `All Deprecated Blocks Test`, () => {

	beforeAll( async () => {
		await enablePageDialogAccept();
	} );
	beforeEach( async () => {
		await createNewPost();
		await helper.movePostsListPage()
		// await page.screenshot({path: `./tests/e2e/screenshot/beforeeach.png`});
	} );

	jest.setTimeout(20000);

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

		it( `Test Deprecated Javascript: ${block.label}`, async () => {

			// await page.screenshot({path: `./tests/e2e/screenshot/beforeeach.png`});

			// 投稿一覧で、ブロック名で保存されている投稿検索
			await helper.searchPost(block.label);

			// 編集画面を開く
			const editButton = (
				await page.$x( `//strong//a[contains(text(), '${ block.label }')]` )
			 )[0];

			await editButton.click();

			// 編集画面ロードされるのを待つ
			await page.waitForSelector('#editor');

			// Check if block was inserted and no error.
			await helper.checkForBlockErrors( block.slug );

		});
	})
} );
