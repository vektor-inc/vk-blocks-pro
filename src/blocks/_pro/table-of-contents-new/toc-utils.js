import ReactDOMServer from 'react-dom/server';
const { useSelect, select } = wp.data;

export const isAllowedBlock = (name, allowedBlocks) => {
	return allowedBlocks.find((blockName) => blockName === name);
};

export const transformToOneDimensionalArray = (multiDimensionalarray) => {
	return multiDimensionalarray.reduce((accumulator, currentValue) => {
		return accumulator.concat(currentValue);
	}, []);
};

export const asyncGetBlocksByName = (blockName) =>
	useSelect((select) => {
		const { getBlocks } = select('core/block-editor');
		return getBlocks().filter((block) => block.name == blockName);
	}, []);

export const getBlocksByName = (blockName) => {
	const { getBlocks } = select('core/block-editor');
	return getBlocks().filter((block) => block.name == blockName);
};

export const getAllHeadings = (headingList) => {
	const { getBlocks } = select('core/block-editor');
	return getBlocks().map((block) => {
		if (1 <= block.innerBlocks.length) {
			return block.innerBlocks.filter(
				(block) => headingList.indexOf(block.name) != -1
			);
		} else if (headingList.indexOf(block.name) != -1) {
			return block;
		}
	});
};

export const removeUnnecessaryElements = (headingsRaw) => {
	const oneDimensionArrayStoredHeading = transformToOneDimensionalArray(
		headingsRaw
	);
	return oneDimensionArrayStoredHeading.filter(
		(heading) => heading != undefined
	);
};

export const returnHtml = (source, attributes, className) => {
	const { style } = attributes;
	if (!className) {
		className = 'vk_tableOfContents';
	} else {
		className = className + ' vk_tableOfContents';
	}

	if (style) {
		className = className + ' vk_tableOfContents-style-' + style;
	}

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
	if (source) {
		returnHtmlContent = source.map((data) => {
			const baseClass = 'vk_tableOfContents_list_item';

			const level = data.attributes.level;
			let preNumber = '';

			if (level === 2) {
				h2Count++;
				preNumber = h2Count;

				// Reset
				h3Count = 0;
				h4Count = 0;
				h5Count = 0;
				h6Count = 0;
			}

			if (level === 3) {
				h3Count++;
				preNumber = h2Count + countSeparater + h3Count;

				// Reset
				h4Count = 0;
				h5Count = 0;
				h6Count = 0;
			}

			if (level === 4) {
				h4Count++;
				preNumber =
					h2Count +
					countSeparater +
					fixZero(h3Count) +
					countSeparater +
					h4Count;

				// Reset
				h5Count = 0;
				h6Count = 0;
			}

			if (level === 5) {
				h5Count++;
				preNumber =
					h2Count +
					countSeparater +
					fixZero(h3Count) +
					countSeparater +
					fixZero(h4Count) +
					countSeparater +
					h5Count;

				// Reset
				h6Count = 0;
			}

			if (level === 6) {
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

			let content = data.attributes.content
				? data.attributes.content
				: data.attributes.title;

			// この条件分岐がないと見出し配置して文字列が undefinedの時にreplace対象がなくてエディタがクラッシュする
			if (content) {
				content = content.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, '');
			}

			return (
				<li
					key={data.clientId}
					className={`${baseClass} ${baseClass}-h-${level}`}
				>
					<a
						href={`#${data.attributes.anchor}`}
						className={`${baseClass}_link`}
					>
						<span className={`${baseClass}_link_preNumber`}>
							{preNumber}
						</span>
						{content}
					</a>
				</li>
			);
		});
	}
	return ReactDOMServer.renderToString(returnHtmlContent);
};
