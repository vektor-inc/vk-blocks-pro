// 目次リスト内のOBJ文字を除去
// https://github.com/vektor-inc/vk-blocks-pro/pull/2078
document.addEventListener('DOMContentLoaded', () => {
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

	const tocBlocks = document.querySelectorAll(
		'.wp-block-vk-blocks-table-of-contents-new'
	);
	tocBlocks.forEach((tocBlock) => {
		// カスタム属性があればそれを使う
		const customLevels = tocBlock.dataset.tocHeadingLevels
			? JSON.parse(tocBlock.dataset.tocHeadingLevels)
			: null;
		const useCustomLevels = tocBlock.dataset.useCustomLevels === 'true';

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

		// useCustomLevelsがfalseのときだけulを書き換える
		if (!useCustomLevels) {
			// 見出しを取得
			const headings = Array.from(
				document.querySelectorAll('[data-vk-toc-heading]')
			).filter((heading) => {
				const level = parseInt(heading.tagName.substring(1));
				return allowedLevels.includes(level);
			});

			// 見出しにIDがなければ付与
			headings.forEach((heading) => {
				if (!heading.id) {
					heading.id = `vk-htags-${Math.random().toString(36).substring(2, 11)}`;
				}
			});

			// 目次HTMLを生成
			let h2Count = 0,
				h3Count = 0,
				h4Count = 0,
				h5Count = 0,
				h6Count = 0;
			const tocHtml = headings
				.map((heading) => {
					const level = parseInt(heading.tagName.substring(1));
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
						<a href="#${heading.id}" class="${baseClass}_link">
							<span class="${baseClass}_link_preNumber">${number}. </span>
							${heading.textContent}
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
		}
	});
});
