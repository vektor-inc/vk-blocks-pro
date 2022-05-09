/**
 * WordPress dependencies
 */
import { createBlock } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import { name } from './block.json';

const transforms = {
	from: [
		{
			type: 'block',
			isMultiBlock: false,
			blocks: ['core/paragraph'],
			transform: ({ content }) => {
				const div = document.createElement('div');
				div.innerHTML = content;
				const text = div.innerText || '';
				const link = div.querySelector('a');
				const url = link?.getAttribute('href');
				const target = link?.getAttribute('target') ? true : false;
				return createBlock(name, {
					content: text,
					buttonUrl: url,
					buttonTarget: target,
				});
			},
		},
	],
};

export default transforms;
