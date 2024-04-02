document.defaultView.addEventListener('load', function () {
	//vk_fixed-displayクラスのNodeを取得
	let fixedDisplayNodeList = document.querySelectorAll('.vk_fixed-display');
	// 配列に変換。
	fixedDisplayNodeList = Array.from(fixedDisplayNodeList);

	if (fixedDisplayNodeList) {
		for (const index in fixedDisplayNodeList) {
			const fixedDisplayNode = fixedDisplayNodeList[index];

			// 取得した要素が表示された時に、activeクラスを追加
			// eslint-disable-next-line no-undef
			const observe = new IntersectionObserver((entries) => {
				if (entries[0].isIntersecting) {
					fixedDisplayNode.classList.add('vk_fixed-display-active');
				} else if (
					!fixedDisplayNode.classList.contains(
						'vk_fixed-display-once'
					)
				) {
					// 非表示で繰り返し
					fixedDisplayNode.classList.remove(
						'vk_fixed-display-active'
					);
				}
			});
			observe.observe(fixedDisplayNode);
		}
	}
});
