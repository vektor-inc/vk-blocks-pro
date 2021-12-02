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

			let SwiperSetting = `
			var swiper${index} = new Swiper ('.vk_slider_${attributes.clientId}', {
			`;

			if (attributes.autoPlay) {
				SwiperSetting += `
				autoplay: {
					delay: ${attributes.autoPlayDelay},
					disableOnInteraction: ${attributes.autoPlayStop},
					stopOnLastSlide: ${!attributes.loop},
				},
				`;
			}

			if (attributes.pagination !== 'hide') {
				SwiperSetting += `
				pagination: {
					el: '.swiper-pagination',
					clickable : true,
					type: '${attributes.pagination}',
					renderFraction: function (currentClass, totalClass) {
						return '<span class="' + currentClass + '"></span>' + ' / ' + '<span class="' + totalClass + '"></span>';
					},
				},
				`;
			}

			if (attributes.speed) {
				SwiperSetting += `
				speed: ${attributes.speed},
				`;
			}

			if (attributes.effect !== 'fade') {
				if (attributes.slidesPerView) {
					SwiperSetting += `
				slidesPerView: ${attributes.slidesPerView},
					`;
				}

				if (attributes.slidesPerGroup) {
					SwiperSetting += `
				slidesPerGroup: ${attributes.slidesPerGroup},
					`;
				}
			}

			if (attributes.loop) {
				SwiperSetting += `
				loop: ${attributes.loop},
				`;
			}

			if (attributes.effect) {
				SwiperSetting += `
				effect: '${attributes.effect}',
				`;
			}

			SwiperSetting += `
				navigation: {
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev',
				},
			});`;
			// eslint-disable-next-line no-eval
			eval(SwiperSetting);
			// ページネーションがOFFの時非表示
			if (attributes.pagination === 'hide') {
				// eslint-disable-next-line no-eval
				eval(`swiper${index}.pagination.destroy();`);
			}
		}
	}
});
