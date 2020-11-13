import {
	createNewPost,
	enablePageDialogAccept,
} from '@wordpress/e2e-test-utils';
import * as helper from '../../helper';
const timeout =  5000;

describe( `All Deprecated Blocks Test`, () => {

	//全テストの前に実行
	beforeAll( async () => {
		await enablePageDialogAccept();
	} );

	//各テストの前に実行
	beforeEach( async () => {
		//新規投稿
		await createNewPost();
		//投稿一覧に移動
		await helper.movePostsListPage()
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

		it( `Deprecatedテスト: ${block.label}`, async () => {

			//投稿一覧で、ブロック名で保存されている投稿検索
			await helper.searchPost(block.label);

			//編集画面を開くボタンを取得
			const editButton = (
				await page.$x( `//strong//a[contains(text(), '${ block.label }')]` )
			 )[0];

			//編集画面を開く
			await editButton.click();

			//編集画面ロードされるのを待つ
			await page.waitForSelector('#editor');

			//ブロックのエラーが無いか確認
			await helper.checkForBlockErrors( block.slug );

		});
	})
} );
