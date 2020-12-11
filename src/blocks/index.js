/**
 * WordPress dependencies
 */
import '@wordpress/core-data';
import '@wordpress/notices';
// import '@wordpress/block-editor';
import {
	registerBlockType,
} from '@wordpress/blocks';
import compareVersions from 'compare-versions';

/**
 * Internal dependencies
 */
import * as alert from './alert';
import * as balloon from './balloon';

/**
 * Function to register an individual block.
 *
 * @param {Object} block The block to be registered.
 *
 */
const registerBlock = ( block ) => {
	if ( ! block ) {
		return;
	}

	let { metadata, settings, name } = block;

	//WP5.5未満の場合
	if ( compareVersions( window.wpVersion, "5.5" ) < 0 ){
		//nameを削除
		delete metadata.name;
		//カテゴリ等を追加
		settings = {
			...settings,
			...metadata
		}

	}
	registerBlockType( name, settings );
};

/**
 * Function to get all the core blocks in an array.
 *
 * @example
 * ```js
 * import { __experimentalGetCoreBlocks } from '@wordpress/block-library';
 *
 * const coreBlocks = __experimentalGetCoreBlocks();
 * ```
 */
export const __getVKBlocks = () => [
	// Common blocks are grouped at the top to prioritize their display
	// in various contexts — like the inserter and auto-complete components.
	alert,
	balloon
];

/**
 * Function to register core blocks provided by the block editor.
 *
 * @param {Array} blocks An optional array of the core blocks being registered.
 *
 * @example
 * ```js
 * import { registerCoreBlocks } from '@wordpress/block-library';
 *
 * registerCoreBlocks();
 * ```
 */
export const registerVKBlocks = (
	blocks = __getVKBlocks()
) => {
	blocks.forEach( registerBlock );
};
