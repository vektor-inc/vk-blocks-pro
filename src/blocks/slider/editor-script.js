const loadSwiper = (sliderNodeList) => {
	if (sliderNodeList) {
		for (const index in sliderNodeList) {
			const sliderNode = sliderNodeList[index];

			// swiper クラスを一応削除
			sliderNode.classList.remove('swiper');

			// swiper クラスを追加
			const newSwiperDiv = sliderNode.querySelector(
				'.block-editor-inner-blocks'
			);
			newSwiperDiv.classList.add('swiper');

			// swiper-wrapper クラスを一応削除
			const oldSwiperWrapper =
				sliderNode.querySelector('.swiper-wrapper');
			oldSwiperWrapper.classList.remove('swiper-wrapper');

			// swiper-wrapper クラスを追加
			const newSwiperWrapper = sliderNode.querySelector(
				'.block-editor-block-list__layout'
			);
			newSwiperWrapper.classList.add('swiper-wrapper');

			// 値を取得して配列に格納
			const attributes = JSON.parse(
				sliderNode.getAttribute('data-vkb-slider')
			);

			let sliderId = '';
			if (attributes.blockId !== undefined) {
				sliderId = attributes.blockId;
			} else if (attributes.clientId !== undefined) {
				// 1.36.0 より古い状態で保存されてる場合の互換処理
				sliderId = attributes.clientId;
			}

			let SwiperSetting = `
			var swiper${index} = new Swiper ('.vk_slider_${sliderId} > div > div > div.block-editor-inner-blocks', {
			`;

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

			if (attributes.effect !== 'fade') {
				if (attributes.slidesPerViewMobile) {
					SwiperSetting += `slidesPerView: ${attributes.slidesPerViewMobile},`;
					if (
						attributes.slidesPerGroup &&
						attributes.slidesPerGroup === 'slides-per-view' &&
						Number.isInteger(attributes.slidesPerViewMobile)
					) {
						SwiperSetting += `slidesPerGroup: ${attributes.slidesPerViewMobile},`;
					} else {
						SwiperSetting += `slidesPerGroup: 1,`;
					}
				} else if (attributes.slidesPerView) {
					SwiperSetting += `slidesPerView: ${attributes.slidesPerView},`;
					if (
						attributes.slidesPerGroup &&
						attributes.slidesPerGroup === 'slides-per-view' &&
						Number.isInteger(attributes.slidesPerView)
					) {
						SwiperSetting += `slidesPerGroup: ${attributes.slidesPerView},`;
					} else {
						SwiperSetting += `slidesPerGroup: 1,`;
					}
				} else {
					SwiperSetting += `slidesPerView: 1,`;
					SwiperSetting += `slidesPerGroup: 1,`;
				}
				if (
					attributes.slidesPerViewTablet ||
					attributes.slidesPerViewPC
				) {
					// Responsive breakpoints
					SwiperSetting += `breakpoints: {`;
					if (attributes.slidesPerViewTablet) {
						SwiperSetting += `576: {`;
						SwiperSetting += `slidesPerView: ${attributes.slidesPerViewTablet},`;
						if (
							attributes.slidesPerGroup &&
							attributes.slidesPerGroup === 'slides-per-view' &&
							Number.isInteger(attributes.slidesPerViewTablet)
						) {
							SwiperSetting += `slidesPerGroup: ${attributes.slidesPerViewTablet},`;
						}
						SwiperSetting += `},`;
					}
					if (attributes.slidesPerViewPC) {
						SwiperSetting += `992: {`;
						SwiperSetting += `slidesPerView: ${attributes.slidesPerViewPC},`;
						if (
							attributes.slidesPerGroup &&
							attributes.slidesPerGroup === 'slides-per-view' &&
							Number.isInteger(attributes.slidesPerViewPC)
						) {
							SwiperSetting += `slidesPerGroup: ${attributes.slidesPerViewPC},`;
						}
						SwiperSetting += `},`;
					}
					SwiperSetting += `},`;
				}
				if (attributes.centeredSlides) {
					SwiperSetting += `centeredSlides: ${attributes.centeredSlides},`;
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
};

// 初回の loadSwiper 呼び出し（data-vkb-slider 属性を持つ要素に対して）
document.defaultView.addEventListener('load', function () {
	// //data-vkb-slider属性のNodeを取得
	const sliderNodes = document.querySelectorAll('[data-vkb-slider]');
	// 配列に変換。
	const sliderNodeArray = Array.from(sliderNodes);
	loadSwiper(sliderNodeArray);
});
