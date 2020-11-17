import {
	createNewPost,
	enablePageDialogAccept,
	publishPost,
} from '@wordpress/e2e-test-utils';
import * as helper from '../../helper';
import blocks from "../../blocksList";

describe( `All Blocks Test`, () => {

	beforeAll( async () => {
		await enablePageDialogAccept();
	} );
	beforeEach( async () => {
		await createNewPost();
	} );

	jest.setTimeout(100000);

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

			// await page.screenshot({path: `./tests/e2e/screenshot/toc.png`});

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
