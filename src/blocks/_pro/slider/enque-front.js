window.addEventListener('load', ( event ) => {

	// //data-vkb-slider属性のNodeを取得
	let sliderNodeList = document.querySelectorAll('[data-vkb-slider]');
	// 配列に変換。
	sliderNodeList = Array.from( sliderNodeList );

	if(sliderNodeList){
		for(let index in sliderNodeList) {
			let sliderNode = sliderNodeList[index];
			let attributes = JSON.parse(sliderNode.getAttribute('data-vkb-slider'))

			let autoPlayScripts;
			if(attributes.autoPlay){
				autoPlayScripts = `autoplay: {
					delay: ${attributes.autoPlayDelay},
					disableOnInteraction: false,
				},`
			}else{
				autoPlayScripts = ''
			}

			let paginationScripts;
			if(attributes.pagination){
				paginationScripts = `
				// If we need pagination
				pagination: {
				  el: '.swiper-pagination',
				  clickable : true,
				},`;
			}else{
				paginationScripts = ''
			}

			let speedScripts;
			if(attributes.speed){
				speedScripts = `speed: ${attributes.speed},`
			}else{
				speedScripts = ''
			}

			new Swiper ('.vk_slider_' + attributes.clientId, {

				speedScripts,

				// Optional parameters
				loop: attributes.loop,

				effect: attributes.effect,

				paginationScripts,

				// navigation arrows
				navigation: {
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev',
				},

				// And if we need scrollbar
				scrollbar: {
				  el: '.swiper-scrollbar',
				},

				autoPlayScripts,
			})
		}
	}

}, false);


