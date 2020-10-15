window.addEventListener('load', ( event ) => {

	//vk_animationクラスのNodeを取得
	let animationNodeList = document.querySelectorAll('.vk_animation');
	// 配列に変換。
	animationNodeList = Array.from( animationNodeList );

	if(animationNodeList){
		for(let index in animationNodeList) {
			let animationNode = animationNodeList[index];

			// 取得した要素が表示された時に、activeクラスを追加
			let observe = new IntersectionObserver((entries) => {
				if(entries[0].isIntersecting){
					animationNode.classList.add('vk_animation-active');
				}else{
					animationNode.classList.remove('vk_animation-active');
				}
			})
			observe.observe(animationNode);
		}
	}

}, false);


