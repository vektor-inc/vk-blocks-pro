import { createBlock } from '@wordpress/blocks';

const transforms = {
	to: [
		{
			type: 'block',
			blocks: ['vk-blocks/faq2'],
			transform: (attributes, innerBlocks) => {
				const questionInner = [
					createBlock('core/paragraph', {
						content: attributes.heading,
					}),
				];
				const questionBlock = createBlock(
					'vk-blocks/faq2-q',
					{},
					questionInner
				);
				const answerBlock = createBlock(
					'vk-blocks/faq2-a',
					{},
					innerBlocks
				);
				return createBlock('vk-blocks/faq2', {}, [
					questionBlock,
					answerBlock,
				]);
			},
		},
	],
};

export default transforms;