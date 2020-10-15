window.addEventListener('load', ( event ) => {

	// //data-vkb-slider属性のNodeを取得
	let sliderNodeList = document.querySelectorAll('[data-vkb-slider]');
	// 配列に変換。
	sliderNodeList = Array.from( sliderNodeList );

	if(sliderNodeList){
		for(let index in sliderNodeList) {
			let sliderNode = sliderNodeList[index];
			let attributes = JSON.parse(sliderNode.getAttribute('data-vkb-slider'))

			// 変数名にindexを使う
			eval(`var swiper${index} = new Swiper ('.vk_slider_${attributes.clientId}', {
					// Optional parameters

					speed: ${attributes.speed},

					loop: ${attributes.loop},

					effect: '${attributes.effect}',

					// navigation arrows
					navigation: {
						nextEl: '.swiper-button-next',
						prevEl: '.swiper-button-prev',
					},

					// And if we need scrollbar
					scrollbar: {
					  el: '.swiper-scrollbar',
					},
			});`);

			if( attributes.autoPlay ){
				eval(`swiper${index}.autoplay.start();`);
				eval(`swiper${index}.autoplay.delay = ${attributes.autoPlayDelay};`);
				eval(`swiper${index}.autoplay.disableOnInteraction = false`);
			}

			if( attributes.pagination ){
				eval(`swiper${index}.pagination.init();`);
				// let pageNationElement = document.querySelector('.swiper-pagination');
				// console.log(pageNationElement)
				eval(`swiper${index}.pagination.el = '.swiper-pagination';`);
				// eval(`swiper${index}.pagination.el = ${pageNationElement};`);
				eval(`swiper${index}.pagination.clickable = true;`);
				eval(`swiper${index}.pagination.render();`);
			}
		}
	}

}, false);


