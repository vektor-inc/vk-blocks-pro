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
			status.checked = true; // チェックボックスをチェック状態に
			item.closest('.tab').classList.add('is-open'); // 開いた状態のクラスを追加
		} else {
			item.textContent = 'OPEN';
			status.checked = false; // チェックボックスを非チェック状態に
			item.closest('.tab').classList.add('is-close'); // 閉じた状態のクラスを追加
		}

		// ボタンクリック時にクラスをトグル
		item.addEventListener('click', function () {
			if (status && status.type === 'checkbox') {
				setTimeout(() => {
					item.textContent = status.checked ? 'CLOSE' : 'OPEN';
					item.closest('.tab').classList.toggle(
						'is-open',
						status.checked
					);
					item.closest('.tab').classList.toggle(
						'is-close',
						!status.checked
					);
				}, 0);
			}
		});
	});
});
