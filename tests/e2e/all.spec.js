import {
	createNewPost,
	enablePageDialogAccept,
	publishPost,
	insertBlock,
	getAllBlocks,
	getAllBlockInserterItemTitles,
	openGlobalBlockInserter
} from '@wordpress/e2e-test-utils';
import * as helper from './helper';
const timeout =  5000;

// import { sortBy, uniq } from 'lodash';
// export async function getTitles() {
// 	const inserterItemTitles = await page.evaluate( () => {
// 		return Array.from(
// 			document.querySelectorAll(
// 				'.block-editor-block-types-list__item-title'
// 			)
// 		).map( ( inserterItem ) => {
// 			return inserterItem.innerText;
// 		} );
// 	} );
// 	console.log(inserterItemTitles);

// 	return sortBy( uniq( inserterItemTitles ) );
// }
// const blocksTitle = async () => { return getAllBlockInserterItemTitles(); }
// console.log(blocksTitle().then((block) => {
// 	console.log(block)
// }));

describe( `All Blocks Test`, () => {

	beforeAll( async () => {
		await enablePageDialogAccept();
	} );
	beforeEach( async () => {
		await createNewPost();
	} );

	jest.setTimeout(10000);

	it( 'Test Javascript Error', async () => {

		//グローバルブロックインサーターを開く
		await openGlobalBlockInserter();
		// VK Blocksを検索
		await page.type('input[placeholder="Search for a block"]', 'vk');
		// 全てのVK Blocksタイトルを取得
		const allBlockTitles = await getAllBlockInserterItemTitles();
		// 全VKブロックを、挿入。
		allBlockTitles.forEach( async ( blockTitle ) => {
			console.log(blockTitle)
			await insertBlock( blockTitle );
			await page.waitForSelector(`[data-title="${blockTitle}"]`);
		})

		// const insertedBlock = await getAllBlocks();
		// console.log(insertedBlock);

		// Check if block was inserted and no error.^
		// await helper.checkForBlockErrors( blockSlug );

		await page.screenshot({path: `./tests/e2e/screenshot/jserror.png`});

		// Take Screenshot for debug.
		// await page.screenshot({path: `./tests/e2e/screenshot/${name}.png`});
	});

	// it( 'Test PHP Error', async () => {
	// 	// Insert Block.
	// 	await insertBlock( "Alert" );

	// 	await publishPost();

	// 	const publishUrl = await page.evaluate( () => {
	// 		// Get publish URL.
	// 		const publishUrlTag = document.querySelector(".post-publish-panel__postpublish-header.is-opened").innerHTML;
	// 		const url = publishUrlTag.match(/http.+?"/g);
	// 		// remove "
	// 		return url[0].slice(0, -1);

	// 	})

	// 	await page.goto(publishUrl);

	// 	// Get texts in published post.
	// 	const contents = await page.evaluate(() => {
	// 		return document.querySelector(".entry-content").innerText;
	// 	});

	// 	// Check Error messages.
	// 	expect( contents.match(/Notice/) ).toBeNull();
	// 	expect( contents.match(/Warning/) ).toBeNull();
	// 	expect( contents.match(/Fatal/) ).toBeNull();

	// 	// For debugging.
	// 	await page.screenshot({path: `./tests/e2e/screenshot/phperror.png`});
	// });
} );

// const e2eTestForAll = ( ) => {

// 	let block = {};
// 	block.name = "core/image";
// 	block.title = "Image";




// console.log(helper.getVKBlocks());

// e2eTestForAll()

// console.log(getAllBlocks());

// const vkBlocksAll = getBlockTypes().filter( block => block.category === 'vk-blocks-cat' );

// console.log(vkBlocksAll);

// vkBlocksAll.forEach( vkBlock => {
// 	e2eTestForAll(vkBlock)
// } )
