/**
 * WordPress dependencies
 */
import { createBlock } from '@wordpress/blocks';
import { __unstableCreateElement as createElement } from '@wordpress/rich-text'; // eslint-disable-line @wordpress/no-unsafe-wp-apis

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
			isMatch: (attributes) => {
				const element = createElement(document, attributes.content);
				const text = element.innerText || '';
				const links = element.querySelectorAll('a');
				return text.length <= 30 && links.length <= 1;
			},
		},
	],
};

export default transforms;
