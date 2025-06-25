export const isAllowedBlock = (name, allowedBlocks) => {
	return allowedBlocks.includes(name);
};

// 見出しブロックの正確な位置を計算する関数
export const getHeadingPosition = (block, allBlocks) => {
	let position = 0;
	
	const calculatePosition = (blocks, currentPosition = 0) => {
		for (let i = 0; i < blocks.length; i++) {
			const currentBlock = blocks[i];
			
			// 見出しブロックの場合、位置を記録
			if (currentBlock.clientId === block.clientId) {
				position = currentPosition + i;
				return true; // 見つかった
			}
			
			// 入れ子ブロックを再帰的に処理
			if (currentBlock.innerBlocks && currentBlock.innerBlocks.length > 0) {
				const found = calculatePosition(currentBlock.innerBlocks, currentPosition + i);
				if (found) {
					return true;
				}
			}
		}
		return false;
	};
	
	calculatePosition(allBlocks);
	return position;
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
		skipLevelFiltering = false, // 除外設定UI用のオプション
		globalSettings = ['h2', 'h3', 'h4', 'h5', 'h6'], // グローバル設定を引数から取得
	} = options;
	const headings = [];

	const processBlock = (block) => {
		if (isAllowedBlock(block.name, headingBlocks)) {
			const level = block.attributes.level || 2;
			const headingId =
				block.name === 'vk-blocks/heading'
					? block.attributes.anchor || `vk-htags-${block.clientId}`
					: block.attributes.anchor || `vk-htags-${block.clientId}`;

			// 除外設定のチェック
			const isExcluded = excludedHeadings?.includes(headingId) || false;

			// レベル設定のチェック（skipLevelFilteringがtrueの場合はスキップ）
			let isAllowedLevel = true;
			if (!skipLevelFiltering) {
				const allowedLevels = useCustomLevels
					? customHeadingLevels || ['h2', 'h3', 'h4', 'h5', 'h6']
					: globalSettings;
				isAllowedLevel = allowedLevels.includes(`h${level}`);
			}

			if (!isExcluded && isAllowedLevel) {
				// 見出しの正確な位置を計算
				const position = getHeadingPosition(block, blocks);
				
				headings.push({
					clientId: block.clientId,
					position: position,
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
	
	// 位置に基づいてソート
	headings.sort((a, b) => a.position - b.position);
	
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
