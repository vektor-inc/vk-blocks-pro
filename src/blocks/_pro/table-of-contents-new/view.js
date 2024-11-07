// 目次リスト内のOBJ文字を除去
// https://github.com/vektor-inc/vk-blocks-pro/pull/2078
document.addEventListener('DOMContentLoaded', () => {
	document.querySelectorAll('.vk_tableOfContents_list li').forEach((item) => {
		item.innerHTML = item.innerHTML.replace(/\uFFFC/g, ''); // U+FFFCはOBJのUnicodeです
	});

	// 開/閉 切り替え (:before 疑似要素のアクセシビリティ問題に対応 #2087)
	document.querySelectorAll('#vk-tab-label').forEach((item) => {
		const status = item.previousElementSibling; // チェックボックス
		
		// 初期状態の設定: チェックボックスの状態に基づいてテキストを設定
		item.textContent = status.checked ? 'CLOSE' : 'OPEN';

		item.addEventListener('click', function () {
			// チェックボックスの状態に応じてテキストを切り替え
			setTimeout(() => {
				item.textContent = status.checked ? 'CLOSE' : 'OPEN';
			}, 0);
		});
	});
});
