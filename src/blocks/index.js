/**
 * WordPress dependencies
 */
import '@wordpress/core-data';
import '@wordpress/notices';
import '@wordpress/block-editor';
import {
	registerBlockType,
} from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import * as alert from './alert';

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
	const { settings, name } = block;
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
