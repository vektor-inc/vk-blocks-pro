import { select } from '@wordpress/data';

export const isAllowedBlock = (name, allowedBlocks) => {
	return allowedBlocks.find((blockName) => blockName === name);
};

export const getHeadings = (headingBlocks) => {
	const { getBlocks } = select('core/block-editor');
	return getBlocks().filter((block) =>
		isAllowedBlock(block.name, headingBlocks)
	);
};

export const getInnerHeadings = (headingBlocks, hasInnerBlocks) => {
	const { getBlocks } = select('core/block-editor');
	const headings = [];

	getBlocks().forEach(function (block) {
		if (isAllowedBlock(block.name, hasInnerBlocks)) {
			block.innerBlocks.forEach(function (innerBlock) {
				if (isAllowedBlock(innerBlock.name, headingBlocks)) {
					headings.push(innerBlock);
				}
			});
		}
	});

	return headings;
};

export const returnHtml = (sources) => {
	const countSeparater = '.';
	let h2Count = 0;
	let h3Count = 0;
	let h4Count = 0;
	let h5Count = 0;
	let h6Count = 0;
	const fixZero = (count) => {
		if (count === 0) {
			return 1;
		}
		return count;
	};

	let returnHtmlContent = '';
	if (sources) {
		returnHtmlContent = sources
			.map((source) => {
				const baseClass = 'vk_tableOfContents_list_item';
				const data = source.block;
				const level = data.attributes.level;

				let preNumber = '';

				if (level === 2) {
					h2Count++;
					preNumber = h2Count;
					h3Count = 0;
					h4Count = 0;
					h5Count = 0;
					h6Count = 0;
				} else if (level === 3) {
					h3Count++;
					preNumber = h2Count + countSeparater + h3Count;
					h4Count = 0;
					h5Count = 0;
					h6Count = 0;
				} else if (level === 4) {
					h4Count++;
					preNumber =
						h2Count +
						countSeparater +
						fixZero(h3Count) +
						countSeparater +
						h4Count;
					h5Count = 0;
					h6Count = 0;
				} else if (level === 5) {
					h5Count++;
					preNumber =
						h2Count +
						countSeparater +
						fixZero(h3Count) +
						countSeparater +
						fixZero(h4Count) +
						countSeparater +
						h5Count;
					h6Count = 0;
				} else if (level === 6) {
					h6Count++;
					preNumber =
						h2Count +
						countSeparater +
						fixZero(h3Count) +
						countSeparater +
						fixZero(h4Count) +
						countSeparater +
						fixZero(h5Count) +
						countSeparater +
						h6Count;
				}

				preNumber = preNumber + '. ';

				const content =
					data.attributes.content || data.attributes.title;

				// タグ除去メソッド
				const removeHtmlTags = (text) =>
					text.replace(/(<|\[)("[^"]*"|'[^']*'|[^'">])*(>|\])/g, '');

				let displayContent = '';
				if (typeof content === 'string') {
					displayContent = removeHtmlTags(content);
				} else if (
					typeof content === 'object' &&
					typeof content.text === 'string'
				) {
					displayContent = removeHtmlTags(content.text);
				}

				return `
				<li class="${baseClass} ${baseClass}-h-${level}">
					<a href="#${data.attributes.anchor}" class="${baseClass}_link">
						<span class="${baseClass}_link_preNumber">${preNumber}</span>
						${displayContent}
					</a>
				</li>
			`;
			})
			.join(''); // Arrayを結合して、1つのHTML文字列に変換
	}

	return returnHtmlContent || '';
};
