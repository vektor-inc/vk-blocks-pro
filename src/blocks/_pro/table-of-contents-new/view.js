document.addEventListener('DOMContentLoaded', () => {

	// 目次リスト内のOBJ文字を除去
	document.querySelectorAll('.vk_tableOfContents_list li').forEach(item => {
		item.innerHTML = item.innerHTML.replace(/\uFFFC/g, ''); // U+FFFCはOBJのUnicodeです
	});

});
