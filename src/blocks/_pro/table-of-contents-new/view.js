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
});
