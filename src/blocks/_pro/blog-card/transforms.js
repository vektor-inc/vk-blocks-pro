/**
 * WordPress dependencies
 */
import { createBlock } from '@wordpress/blocks';

const transforms = {
	from: [
		{
			type: 'block',
			isMultiBlock: false,
			blocks: ['core/embed'],
			transform: (attributes) => {
				return createBlock('vk-blocks/blog-card', attributes);
			},
		},
	],
	to: [
		{
			type: 'block',
			blocks: ['core/embed'],
			transform: (attributes) => {
				return createBlock('core/embed', attributes);
			},
		},
	],
};

export default transforms;
