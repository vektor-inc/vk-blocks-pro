import { createBlock } from '@wordpress/blocks';

const transforms = {
	from: [
		{
			type: 'block',
			blocks: [ 'core/heading' ],
			transform: ( attributes ) => {
				const { content } = attributes;

				const transformAttributes = {
					title: content,
				};

				return createBlock( 'vk-blocks/heading', transformAttributes );
			},
		},
	],
};

export default transforms;
