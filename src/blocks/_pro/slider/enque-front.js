document.defaultView.addEventListener('load', function () {
	// //data-vkb-slider属性のNodeを取得
	let sliderNodeList = document.querySelectorAll('[data-vkb-slider]');
	// 配列に変換。
	sliderNodeList = Array.from(sliderNodeList);

	if (sliderNodeList) {
		for (const index in sliderNodeList) {
			const sliderNode = sliderNodeList[index];
			const attributes = JSON.parse(
				sliderNode.getAttribute('data-vkb-slider')
			);

			//自動再生がONかOFFによって条件分岐
			if (attributes.autoPlay) {
				// 変数名にindexを使う
				// eslint-disable-next-line no-eval
				eval(`var swiper${index} = new Swiper ('.vk_slider_${
					attributes.clientId
				}', {
				// Optional parameters
				pagination: {
					el: '.swiper-pagination',
					clickable : true,
				},

				autoplay: {
					delay: ${attributes.autoPlayDelay},
					disableOnInteraction: false,
					stopOnLastSlide: ${!attributes.loop}
				},

				speed: ${attributes.speed},

				slidesPerView: ${attributes.slidesPerView},

				slidesPerGroup: ${attributes.slidesPerGroup},

				loop: ${attributes.loop},

				effect: '${attributes.effect}',

				// navigation arrows
				navigation: {
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev',
				},

			});`);
			} else {
				// eslint-disable-next-line no-eval
				eval(`var swiper${index} = new Swiper ('.vk_slider_${attributes.clientId}', {
				// Optional parameters
				pagination: {
					el: '.swiper-pagination',
					clickable : true,
				},

				speed: ${attributes.speed},

				slidesPerView: ${attributes.slidesPerView},

				slidesPerGroup: ${attributes.slidesPerGroup},

				loop: ${attributes.loop},

				effect: '${attributes.effect}',

				// navigation arrows
				navigation: {
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev',
				}

			});`);
			}

			// ページネーションがOFFの時非表示
			if (!attributes.pagination) {
				// eslint-disable-next-line no-eval
				eval(`swiper${index}.pagination.destroy();`);
			}
		}
	}
});
