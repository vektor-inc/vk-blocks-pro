document.addEventListener('DOMContentLoaded', () => {
	const tocBlocks = document.querySelectorAll('.wp-block-vk-blocks-table-of-contents-new');

	// 目次の番号付け用のカウンター
	const createCounter = () => {
		let h2Count = 0;
		let h3Count = 0;
		let h4Count = 0;
		let h5Count = 0;
		let h6Count = 0;

		return {
			increment: (level) => {
				if (level === 2) {
					h2Count++;
					h3Count = 0;
					h4Count = 0;
					h5Count = 0;
					h6Count = 0;
					return h2Count;
				} else if (level === 3) {
					h3Count++;
					h4Count = 0;
					h5Count = 0;
					h6Count = 0;
					return `${h2Count}.${h3Count}`;
				} else if (level === 4) {
					h4Count++;
					h5Count = 0;
					h6Count = 0;
					return `${h2Count}.${h3Count || 1}.${h4Count}`;
				} else if (level === 5) {
					h5Count++;
					h6Count = 0;
					return `${h2Count}.${h3Count || 1}.${h4Count || 1}.${h5Count}`;
				} else if (level === 6) {
					h6Count++;
					return `${h2Count}.${h3Count || 1}.${h4Count || 1}.${h5Count || 1}.${h6Count}`;
				}
			}
		};
	};

	// 目次のHTMLを生成
	tocBlocks.forEach((tocBlock) => {
		// ブロックのカスタム設定を取得
		const useCustomLevels = tocBlock.dataset.useCustomLevels === 'true';
		const customLevels = useCustomLevels && tocBlock.dataset.customLevels
			? tocBlock.dataset.customLevels.split(',')
			: [];

		// 許可された見出しレベルを決定
		let allowedLevels;
		if (useCustomLevels && customLevels.length > 0) {
			allowedLevels = customLevels.map(level => parseInt(level.replace('h', '')));
		} else {
			allowedLevels = window.vkBlocksTocSettings?.allowedHeadingLevels || [2, 3, 4, 5, 6];
		}

		// 見出しの取得
		let headings = Array.from(document.querySelectorAll('h2, h3, h4, h5, h6'))
			.filter((heading) => {
				const level = parseInt(heading.tagName.substring(1));
				// IDがある見出しのみを対象とする（the_contentを通した見出しのみ）
				return heading.id && 
					heading.id.startsWith('vk-htags-') && // the_contentで付与されたIDのみ
					allowedLevels.includes(level) && 
					!heading.hasAttribute('data-exclude-from-toc');
			})
			.map(heading => ({
				level: parseInt(heading.tagName.substring(1)),
				text: heading.textContent,
				id: heading.id
			}));

		const filteredHeadings = headings.filter(heading => allowedLevels.includes(heading.level));

		// 目次のHTMLを生成
		const counter = createCounter();
		const tocHtml = filteredHeadings.map((heading) => {
			const number = counter.increment(heading.level);
			const baseClass = 'vk_tableOfContents_list_item';

			return `
				<li class="${baseClass} ${baseClass}-h-${heading.level}">
					<a href="#${heading.id}" class="${baseClass}_link">
						<span class="${baseClass}_link_preNumber">${number}. </span>
						${heading.text}
					</a>
				</li>
			`;
		}).join('');

		const tocList = tocBlock.querySelector('.vk_tableOfContents_list');
		if (tocList) {
			tocList.innerHTML = tocHtml;
		}
	});

	// 目次リスト内のOBJ文字を除去
	// https://github.com/vektor-inc/vk-blocks-pro/pull/2078
	document.querySelectorAll('.vk_tableOfContents_list li').forEach((item) => {
		item.innerHTML = item.innerHTML.replace(/\uFFFC/g, ''); // U+FFFCはOBJのUnicodeです
	});

	// 開/閉 切り替え (:before 疑似要素のアクセシビリティ問題に対応 #2087)
	document.querySelectorAll('#vk-tab-label').forEach((item) => {
		const status = item.previousElementSibling; // チェックボックス
		const tabContent = item
			.closest('.tab')
			.querySelector('.tab_content-open, .tab_content-close');
		const initialStateOpen =
			tabContent.classList.contains('tab_content-open');

		// 初期状態に基づいてボタンのテキストとチェックボックスの状態を設定
		if (initialStateOpen) {
			item.textContent = 'CLOSE';
			status.checked = true;
		} else {
			item.textContent = 'OPEN';
			status.checked = false;
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
});
