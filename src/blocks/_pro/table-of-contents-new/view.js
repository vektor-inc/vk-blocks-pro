// 目次リスト内のOBJ文字を除去
// https://github.com/vektor-inc/vk-blocks-pro/pull/2078
document.addEventListener('DOMContentLoaded', () => {
	document.querySelectorAll('.vk_tableOfContents_list li').forEach((item) => {
		item.innerHTML = item.innerHTML.replace(/\uFFFC/g, ''); // U+FFFCはOBJのUnicodeです
	});

	// 開/閉 切り替え
	const openButton = document.getElementById('vk-tab-label');
	openButton.addEventListener('click', function () {
		const openButton = document.getElementById('vk-tab-label');
		const statusText = openButton.textContent.trim();
		if ('OPEN' === statusText) {
			openButton.textContent = 'CLOSE';
		} else {
			openButton.textContent = 'OPEN';
		}
	});
});
