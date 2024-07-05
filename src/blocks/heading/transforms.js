import { createBlock } from '@wordpress/blocks';

const transforms = {
	from: [
		{
			type: 'block',
			blocks: ['core/heading'],
			transform: (attributes) => {
				const { content } = attributes;

				const transformAttributes = {
					title: content,
				};

				return createBlock('vk-blocks/heading', transformAttributes);
			},
		},
	],
	to: [
		{
			type: 'block',
			blocks: ['core/heading'],
			transform: (attributes) => {
				const {
					title,
					level,
					anchor,
					align,
					outerMarginBottom,
					titleMarginBottom,
					titleColor,
					titleSize,
					subTextFlag,
					subText,
					subTextColor,
					subTextSize,
				} = attributes;

				let headingMarginBottom;
				if (subTextFlag === 'on' && !!titleMarginBottom) {
					headingMarginBottom = titleMarginBottom + 'rem';
				} else if (subTextFlag === 'off' && !!outerMarginBottom) {
					headingMarginBottom = outerMarginBottom + 'rem';
				}

				let headingFontSize;
				if (!!titleSize) {
					headingFontSize = titleSize + 'rem';
				}

				let paragraphMarginBottom;
				if (subTextFlag === 'on' && !!outerMarginBottom) {
					paragraphMarginBottom = outerMarginBottom + 'rem';
				}

				let paragraphFontSize;
				if (!!subTextSize) {
					paragraphFontSize = subTextSize + 'rem';
				}

				const transformHeadingAttributes = {
					...attributes,
					content: title,
					level,
					anchor,
					textAlign: align,
					textColor: titleColor,
					style: {
						spacing: {
							margin: {
								bottom: headingMarginBottom,
							},
						},
						typography: {
							fontSize: headingFontSize,
						},
					},
				};

				const transformParagraphAttributes = {
					...attributes,
					content: subText,
					align,
					textColor: subTextColor,
					style: {
						spacing: {
							margin: {
								bottom: paragraphMarginBottom,
							},
						},
						typography: {
							fontSize: paragraphFontSize,
						},
					},
				};

				const blockContent = [];

				blockContent.push(
					createBlock('core/heading', transformHeadingAttributes)
				);
				if (subTextFlag === 'on') {
					blockContent.push(
						createBlock(
							'core/paragraph',
							transformParagraphAttributes
						)
					);
				}
				return blockContent;
			},
		},
	],
};

export default transforms;
