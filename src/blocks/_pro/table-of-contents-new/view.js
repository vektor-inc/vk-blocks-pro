// 目次リスト内のOBJ文字を除去
// https://github.com/vektor-inc/vk-blocks-pro/pull/2078
document.addEventListener('DOMContentLoaded', () => {
	document.querySelectorAll('.vk_tableOfContents_list li').forEach((item) => {
		item.innerHTML = item.innerHTML.replace(/\uFFFC/g, ''); // U+FFFCはOBJのUnicodeです
	});

	// 各目次ブロックごとに独立した開/閉 切り替え処理 (:before 疑似要素のアクセシビリティ問題に対応 #2087)
	document
		.querySelectorAll('.wp-block-vk-blocks-table-of-contents-new')
		.forEach((tocBlock) => {
			const item = tocBlock.querySelector(
				'.vk_tableOfContents_openCloseBtn'
			);
			if (!item) {
				return;
			}

			const status = item.previousElementSibling; // チェックボックス
			const tabContent = item
				.closest('.tab')
				.querySelector('.tab_content-open, .tab_content-close');
			const initialStateOpen =
				tabContent && tabContent.classList.contains('tab_content-open');

			// 初期状態に基づいてボタンのテキストとチェックボックスの状態を設定
			if (initialStateOpen) {
				item.textContent = 'CLOSE';
				if (status) {
					status.checked = true;
				}
			} else {
				item.textContent = 'OPEN';
				if (status) {
					status.checked = false;
				}
			}

			// ボタンクリック時にテキストをトグル
			item.addEventListener('click', function () {
				if (status && status.type === 'checkbox') {
					setTimeout(() => {
						item.textContent = status.checked ? 'CLOSE' : 'OPEN';
					}, 0);
				}
			});
		});

	const tocBlocks = document.querySelectorAll(
		'.wp-block-vk-blocks-table-of-contents-new'
	);
	tocBlocks.forEach((tocBlock) => {
		// カスタム属性があればそれを使う
		const useCustomLevels = tocBlock.dataset.useCustomLevels === 'true';
		const customLevels = tocBlock.dataset.tocHeadingLevels
			? JSON.parse(tocBlock.dataset.tocHeadingLevels)
			: null;
		const excludedHeadings = tocBlock.dataset.excludedHeadings
			? JSON.parse(tocBlock.dataset.excludedHeadings)
			: [];

		let allowedLevels;
		if (customLevels && customLevels.length > 0) {
			allowedLevels = customLevels.map((l) =>
				parseInt(l.replace('h', ''))
			);
		} else {
			// グローバル設定を参照
			allowedLevels = window.vkBlocksTocSettings
				?.allowedHeadingLevels || [2, 3, 4, 5, 6];
		}

		// カスタム設定の場合はPHP側で抽出された見出しを使用、グローバル設定の場合はdata-vk-toc-heading属性を持つ見出しを使用
		let allHeadings;
		if (useCustomLevels && window.vkBlocksOptions?.contentHeadings) {
			// カスタム設定の場合：PHP側で抽出された見出しを使用
			allHeadings = window.vkBlocksOptions.contentHeadings.map(
				(match) => {
					const level = parseInt(match[1]);
					const attributes = match[2];
					const content = match[3];

					// 属性からIDを抽出
					const idMatch = attributes.match(/id=["']([^"']+)["']/);
					const id = idMatch ? idMatch[1] : '';

					return {
						level,
						id,
						content,
						tagName: `H${level}`,
						textContent: content.replace(/<[^>]*>/g, ''), // HTMLタグを除去
					};
				}
			);
		} else {
			// グローバル設定の場合：data-vk-toc-heading属性を持つ見出しを取得（PHP側でthe_content内の見出しに付与済み）
			allHeadings = Array.from(
				document.querySelectorAll('[data-vk-toc-heading]')
			);
		}

		const headings = allHeadings.filter((heading) => {
			// PHP側から取得した見出しとDOM要素の見出しで構造が異なるため、統一する
			const level =
				heading.level || parseInt(heading.tagName.substring(1));
			// DOM要素かどうかを判定してIDを取得
			const headingId =
				heading.id ||
				(heading.getAttribute ? heading.getAttribute('id') : '') ||
				'';
			const isAllowed = allowedLevels.includes(level);
			const isExcluded = excludedHeadings.includes(headingId);
			return isAllowed && !isExcluded;
		});

		// 目次HTMLを生成
		let h2Count = 0,
			h3Count = 0,
			h4Count = 0,
			h5Count = 0,
			h6Count = 0;
		const tocHtml = headings
			.map((heading) => {
				const level =
					heading.level || parseInt(heading.tagName.substring(1));
				// DOM要素かどうかを判定してIDを取得
				const headingId =
					heading.id ||
					(heading.getAttribute ? heading.getAttribute('id') : '') ||
					'';
				const headingText = heading.textContent || '';

				let number;
				if (level === 2) {
					h2Count++;
					h3Count = 0;
					h4Count = 0;
					h5Count = 0;
					h6Count = 0;
					number = h2Count;
				} else if (level === 3) {
					h3Count++;
					h4Count = 0;
					h5Count = 0;
					h6Count = 0;
					number = `${h2Count}.${h3Count}`;
				} else if (level === 4) {
					h4Count++;
					h5Count = 0;
					h6Count = 0;
					number = `${h2Count}.${h3Count || 1}.${h4Count}`;
				} else if (level === 5) {
					h5Count++;
					h6Count = 0;
					number = `${h2Count}.${h3Count || 1}.${h4Count || 1}.${h5Count}`;
				} else if (level === 6) {
					h6Count++;
					number = `${h2Count}.${h3Count || 1}.${h4Count || 1}.${h5Count || 1}.${h6Count}`;
				}
				const baseClass = 'vk_tableOfContents_list_item';
				return `
				<li class="${baseClass} ${baseClass}-h-${level}">
					<a href="#${headingId}" class="${baseClass}_link">
						<span class="${baseClass}_link_preNumber">${number}. </span>
						${headingText}
					</a>
				</li>
			`;
			})
			.join('');

		// ulを書き換え
		const tocList = tocBlock.querySelector('.vk_tableOfContents_list');
		if (tocList) {
			tocList.innerHTML = tocHtml;
		}
	});
});
