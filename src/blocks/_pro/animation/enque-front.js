window.addEventListener('load', ( event ) => {

	//vk_animationクラスのNodeを取得
	let animationElms = document.querySelectorAll('.vk_animation');
	// 配列に変換。
	animationElms = Array.from( animationElms );

	if(animationElms){
		for(let index in animationElms) {
			let animationElm = animationElms[index];

			// 取得した要素が表示された時に、activeクラスを追加
			let observe = new IntersectionObserver((entries) => {
				if(entries[0].isIntersecting){
					animationElm.classList.add('vk_animation-active');
				}else{
					animationElm.classList.remove('vk_animation-active');
				}
			})
			observe.observe(animationElm);
		}
	}

}, false);


