document.defaultView.addEventListener('load', function () {
	//vk_animationクラスのNodeを取得
	let animationNodeList = document.querySelectorAll('.vk_animation');
	// 配列に変換。
	animationNodeList = Array.from(animationNodeList);

	if (animationNodeList) {
		for (const index in animationNodeList) {
			const animationNode = animationNodeList[index];

			// 取得した要素が表示された時に、activeクラスを追加
			// eslint-disable-next-line no-undef
			const observe = new IntersectionObserver((entries) => {
				if (entries[0].isIntersecting) {
					animationNode.classList.add('vk_animation-active');
				} else if (
					!animationNode.classList.contains('vk_animation-once')
				) {
					// 非表示で繰り返し
					animationNode.classList.remove('vk_animation-active');
				}
			});
			observe.observe(animationNode);
		}
	}
});
