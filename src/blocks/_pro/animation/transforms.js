/**
 * WordPress dependencies
 */
import { createBlock } from '@wordpress/blocks';

const transforms = {
	from: [
		{
			type: 'block',
			isMultiBlock: true,
			blocks: ['*'],
			__experimentalConvert(blocks) {
				// Clone the Blocks to be Grouped
				// Failing to create new block references causes the original blocks
				// to be replaced in the switchToBlockType call thereby meaning they
				// are removed both from their original location and within the
				// new group block.
				const groupInnerBlocks = blocks.map((block) => {
					return createBlock(
						block.name,
						block.attributes,
						block.innerBlocks
					);
				});

				return createBlock('vk-blocks/animation', {}, groupInnerBlocks);
			},
		},
	],
	to: [
		{
			type: 'block',
			blocks: ['*'],
			transform: (attributes, innerBlocks) => innerBlocks,
		},
	],
};

export default transforms;
