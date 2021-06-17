/**
 * WordPress dependencies
 */
import '@wordpress/core-data';
import '@wordpress/notices';
// import '@wordpress/block-editor';
import {
	registerBlockType,
	unstable__bootstrapServerSideBlockDefinitions, // eslint-disable-line camelcase
} from '@wordpress/blocks';
import vkblocksPro from './bundle-pro';

/**
 * Blocks
 */
import * as alert from './alert';
import * as balloon from './balloon';
import * as borderBox from './border-box';
import * as button from './button';
import * as faq from './faq';
import * as faq2 from './faq2';
import * as faq2a from './faq2-a';
import * as faq2q from './faq2-q';
import * as flow from './flow';
import * as heading from './heading';
import * as pageContent from './page-content';
import * as prBlocks from './pr-blocks';
import * as prContent from './pr-content';
import * as spacer from './spacer';
import * as staff from './staff';

/**
 * Extensions
 */
import '@vkblocks/extensions/core/heading/style';
import '@vkblocks/extensions/core/group/style';
import '@vkblocks/extensions/core/list/style';
import '@vkblocks/extensions/core/image/style';
import '@vkblocks/extensions/core/table/style';
import '@vkblocks/extensions/common/hidden-extension';
import '@vkblocks/extensions/common/highlighter';
import '@vkblocks/extensions/common/inline-font-size';
import '@vkblocks/extensions/common/nowrap';
import '@vkblocks/extensions/common/responsive-br';

const vkBlocks = [
	alert,
	balloon,
	borderBox,
	button,
	faq,
	faq2,
	faq2a,
	faq2q,
	flow,
	heading,
	pageContent,
	prBlocks,
	prContent,
	spacer,
	staff,
];

/**
 * Function to get all the VK Blocks in an array.
 */
export const __getVKBlocks = () => vkBlocks.concat(vkblocksPro);

/**
 * Function to register an individual block.
 *
 * @param {Object} block The block to be registered.
 *
 */
const registerBlock = (block) => {
	if (!block) {
		return;
	}

	const { metadata, settings, name } = block;

	unstable__bootstrapServerSideBlockDefinitions({ [name]: metadata }); // eslint-disable-line camelcase
	registerBlockType(name, settings);
};

/**
 * Function to register VK Blocks.
 *
 * @param {*} blocks
 */
export const registerVKBlocks = (blocks = __getVKBlocks()) => {
	blocks.forEach(registerBlock);
};
