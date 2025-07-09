// 目次リスト内のOBJ文字を除去
// https://github.com/vektor-inc/vk-blocks-pro/pull/2078
document.addEventListener('DOMContentLoaded', () => {
	const tocBlock = document.querySelector('.vk_tableOfContents');
	const tocList = document.querySelector('.vk_tableOfContents_list');
	if (!tocList || !tocBlock) {
		return;
	}

	// 開/閉 切り替え (:before 疑似要素のアクセシビリティ問題に対応 #2087)
	const tabLabel = document.querySelector('#vk-tab-label');
	if (tabLabel) {
		const status = tabLabel.previousElementSibling; // チェックボックス
		const tabContent = tabLabel
			.closest('.tab')
			.querySelector('.tab_content-open, .tab_content-close');
		const initialStateOpen =
			tabContent.classList.contains('tab_content-open');

		if (initialStateOpen) {
			tabLabel.textContent = 'CLOSE';
			status.checked = true;
		} else {
			tabLabel.textContent = 'OPEN';
			status.checked = false;
		}

		// ボタンクリック時にテキストをトグル
		tabLabel.addEventListener('click', function () {
			if (status && status.type === 'checkbox') {
				setTimeout(() => {
					tabLabel.textContent = status.checked ? 'CLOSE' : 'OPEN';
				}, 0);
			}
		});
	}

	// 見出し情報を取得
	const headings = window.vkBlocksOptions?.contentHeadings || [];
	if (!headings.length) {
		return;
	}

	// 見出しレベルの設定を取得
	const allowedLevels = window.vkBlocksOptions?.tocHeadingLevels?.map((l) =>
		parseInt(l.replace('h', ''))
	) || [2, 3, 4, 5, 6];

	// 除外する見出しのIDを取得
	const excludedHeadings = tocBlock.dataset.excludedHeadings
		? JSON.parse(tocBlock.dataset.excludedHeadings)
		: [];

	// カウンター初期化
	const counters = {
		h2: 0,
		h3: 0,
		h4: 0,
		h5: 0,
		h6: 0,
	};

	// 目次HTML生成
	const tocHtml = headings
		.filter((heading) => {
			const level = parseInt(heading[0]);
			const headingId = (heading[1].match(/id="([^"]+)"/) || [])[1] || '';
			return (
				allowedLevels.includes(level) &&
				!excludedHeadings.includes(headingId)
			);
		})
		.map((heading) => {
			const level = parseInt(heading[0]);
			const headingId = (heading[1].match(/id="([^"]+)"/) || [])[1] || '';
			const headingText = heading[2];

			// カウンターを更新
			if (level === 2) {
				counters.h2++;
				counters.h3 = counters.h4 = counters.h5 = counters.h6 = 0;
			} else if (level === 3) {
				counters.h3++;
				counters.h4 = counters.h5 = counters.h6 = 0;
			} else if (level === 4) {
				counters.h4++;
				counters.h5 = counters.h6 = 0;
			} else if (level === 5) {
				counters.h5++;
				counters.h6 = 0;
			} else if (level === 6) {
				counters.h6++;
			}

			// 番号を生成
			let number;
			switch (level) {
				case 2:
					number = counters.h2;
					break;
				case 3:
					number = `${counters.h2}.${counters.h3}`;
					break;
				case 4:
					number = `${counters.h2}.${counters.h3 || 1}.${counters.h4}`;
					break;
				case 5:
					number = `${counters.h2}.${counters.h3 || 1}.${counters.h4 || 1}.${counters.h5}`;
					break;
				case 6:
					number = `${counters.h2}.${counters.h3 || 1}.${counters.h4 || 1}.${counters.h5 || 1}.${counters.h6}`;
					break;
			}

			return `
			<li class="vk_tableOfContents_list_item vk_tableOfContents_list_item-h-${level}">
				<a href="#${headingId}" class="vk_tableOfContents_list_item_link">
					<span class="vk_tableOfContents_list_item_link_preNumber">${number}. </span>
					${headingText}
				</a>
			</li>`;
		})
		.join('');

	// 目次を更新
	tocList.innerHTML = tocHtml;
});
