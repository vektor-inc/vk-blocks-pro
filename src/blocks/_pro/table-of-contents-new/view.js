// 目次リスト内のOBJ文字を除去
// https://github.com/vektor-inc/vk-blocks-pro/pull/2078
document.addEventListener('DOMContentLoaded', () => {
	document.querySelectorAll('.vk_tableOfContents_list li').forEach((item) => {
		item.innerHTML = item.innerHTML.replace(/\uFFFC/g, ''); // U+FFFCはOBJのUnicodeです
	});

	// 開/閉 切り替え (:before 疑似要素のアクセシビリティ問題に対応 #2087)
	const openButton = document.getElementById('vk-tab-label');
	openButton.addEventListener('click', function () {
		// 直前にあるチェックボックスで判断する
		var status = openButton.previousElementSibling;
		if( status && status.type === 'checkbox'){
			if( status.checked ){
				openButton.textContent = 'CLOSE';
			}
			else{
				openButton.textContent = 'OPEN';
			}	
		}    
	});
});
