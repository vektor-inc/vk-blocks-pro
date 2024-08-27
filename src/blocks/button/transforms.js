/**
 * WordPress dependencies
 */
import { createBlock } from '@wordpress/blocks';

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
				return createBlock('vk-blocks/button', {
					content: text,
					buttonUrl: url,
					buttonTarget: target,
				});
			},
			isMatch: (attributes) => {
				const div = document.createElement('div');
				div.innerHTML = attributes.content;
				const text = div.innerText || '';
				const links = div.querySelectorAll('a');
				return text.length <= 30 && links.length <= 1;
			},
		},
	],
};

export default transforms;
