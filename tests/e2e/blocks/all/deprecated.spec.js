import {
	createNewPost,
	enablePageDialogAccept,
} from '@wordpress/e2e-test-utils';
import * as helper from '../../helper';
import blocks from "../../blocksList";

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
