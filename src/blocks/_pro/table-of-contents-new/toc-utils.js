export const isAllowedBlock = (name, allowedBlocks) => {
	return allowedBlocks.includes(name);
};

export const getAllHeadings = (
	blocks,
	headingBlocks,
	hasInnerBlocks,
	options
) => {
	const {
		useCustomLevels,
		customHeadingLevels,
		excludedHeadings = [],
	} = options;
	const headings = [];

	// グローバル設定を取得
	const globalSettings = window.vkBlocksOptions?.toc_heading_levels || [
		'h2',
		'h3',
		'h4',
		'h5',
		'h6',
	];

	const processBlock = (block) => {
		if (isAllowedBlock(block.name, headingBlocks)) {
			const level = block.attributes.level || 2;
			const headingId =
				block.name === 'vk-blocks/heading'
					? block.attributes.anchor || `vk-htags-${block.clientId}`
					: block.attributes.anchor || `vk-htags-${block.clientId}`;

			// 除外設定のチェック
			const isExcluded = excludedHeadings?.includes(headingId) || false;

			// レベル設定のチェック
			const allowedLevels = useCustomLevels
				? customHeadingLevels || ['h2', 'h3', 'h4', 'h5', 'h6']
				: globalSettings;
			const isAllowedLevel = allowedLevels.includes(`h${level}`);

			if (!isExcluded && isAllowedLevel) {
				headings.push({
					clientId: block.clientId,
					attributes: {
						...block.attributes,
						anchor: headingId,
					},
				});
			}
		}

		if (isAllowedBlock(block.name, hasInnerBlocks) && block.innerBlocks) {
			block.innerBlocks.forEach(processBlock);
		}
	};

	blocks.forEach(processBlock);
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
			.join('');
	}

	return returnHtmlContent || '';
};

// 再帰的にブロックを取得する関数
export const getAllBlocksRecursively = (blocks) => {
	let allBlocks = [];
	blocks.forEach((block) => {
		allBlocks.push(block);
		if (block.innerBlocks && block.innerBlocks.length > 0) {
			allBlocks = allBlocks.concat(
				getAllBlocksRecursively(block.innerBlocks)
			);
		}
	});
	return allBlocks;
};

// すべての見出しブロックを取得する関数
export const getAllHeadingBlocks = (blocks) => {
	const allBlocks = getAllBlocksRecursively(blocks);
	return allBlocks.filter(
		(block) =>
			block.name === 'vk-blocks/heading' || block.name === 'core/heading'
	);
};
