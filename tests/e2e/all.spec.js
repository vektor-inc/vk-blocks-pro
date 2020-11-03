import {
	createNewPost,
	enablePageDialogAccept,
	publishPost,
	insertBlock
} from '@wordpress/e2e-test-utils';
import { select } from '@wordpress/data';
import * as helper from './helper';
const timeout =  5000;

const e2eTestForAll = ( block ) => {

	describe( `All Blocks Test : ${block.name}`, () => {

		beforeAll( async () => {
			await enablePageDialogAccept();
		} );
		beforeEach( async () => {
			await createNewPost();
		} );

		it( 'Test Javascript Error', async () => {

			// Insert Block.
			await insertBlock( block.title );

			// Check if block was inserted and no error.
			await helper.checkForBlockErrors( name );

			// Take Screenshot for debug.
			// await page.screenshot({path: `./tests/e2e/screenshot/${name}.png`});
		}, timeout );

		it( 'Test PHP Error', async () => {
			// Insert Block.
			await insertBlock( block.title );

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

			// For debugging.
			// await page.screenshot({path: `./tests/e2e/screenshot/${name}1.png`});
		}, timeout );
	} );
}

const vkBlocksAll = select('core/blocks').getBlockTypes().filter( block.category === 'vk-blocks-cat' );

vkBlocksAll.forEach( vkBlock => {
	e2eTestForAll(vkBlock)
} )
