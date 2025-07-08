document.defaultView.addEventListener('load', function () {
	// //data-vkb-slider属性のNodeを取得
	let sliderNodeList = document.querySelectorAll(
		'[data-vk-post-list-slider]'
	);
	// 配列に変換。
	sliderNodeList = Array.from(sliderNodeList);

	if (sliderNodeList) {
		for (const index in sliderNodeList) {
			const sliderNode = sliderNodeList[index];
			const attributes = JSON.parse(
				sliderNode.getAttribute('data-vk-post-list-slider')
			);
			if (!sliderNode.classList.contains('swiper')) {
				sliderNode.classList.add('swiper');
			}
			let sliderId = '';
			if (attributes.blockId !== undefined) {
				sliderId = attributes.blockId;
			} else if (attributes.clientId !== undefined) {
				// 1.36.0 より古い状態で保存されてる場合の互換処理
				sliderId = attributes.clientId;
			}

			// Swiper設定オブジェクトを組み立て
			const config = {
				autoplay: attributes.autoPlay
					? {
						delay: Number(attributes.autoPlayDelay) || 2500,
						disableOnInteraction: !!attributes.autoPlayStop,
						stopOnLastSlide: !attributes.loop,
					}
					: false,
				pagination: attributes.pagination !== 'hide'
					? {
						el: '.swiper-pagination',
						clickable: true,
						type: attributes.pagination,
						renderFraction: function (currentClass, totalClass) {
							return '<span class="' + currentClass + '"></span>' + ' / ' + '<span class="' + totalClass + '"></span>';
						},
					}
					: undefined,
				speed: Number(attributes.speed) || 500,
				effect: typeof attributes.effect === 'string' ? attributes.effect : 'slide',
				loop: !!attributes.loop,
				navigation: {
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev',
				},
			};
			// breakpointsやcenteredSlidesなども必要に応じて追加
			if (attributes.slidesPerViewMobile || attributes.slidesPerView || attributes.slidesPerViewTablet || attributes.slidesPerViewPC) {
				config.slidesPerView = Number(attributes.slidesPerViewMobile) || Number(attributes.slidesPerView) || 1;
				config.slidesPerGroup = 1;
				if (attributes.slidesPerGroup && attributes.slidesPerGroup === 'slides-per-view') {
					config.slidesPerGroup = config.slidesPerView;
				}
				if (attributes.slidesPerViewTablet || attributes.slidesPerViewPC) {
					config.breakpoints = {};
					if (attributes.slidesPerViewTablet) {
						config.breakpoints[576] = {
							slidesPerView: Number(attributes.slidesPerViewTablet),
							slidesPerGroup: (attributes.slidesPerGroup === 'slides-per-view') ? Number(attributes.slidesPerViewTablet) : 1,
						};
					}
					if (attributes.slidesPerViewPC) {
						config.breakpoints[992] = {
							slidesPerView: Number(attributes.slidesPerViewPC),
							slidesPerGroup: (attributes.slidesPerGroup === 'slides-per-view') ? Number(attributes.slidesPerViewPC) : 1,
						};
					}
				}
			}
			if (attributes.centeredSlides) {
				config.centeredSlides = !!attributes.centeredSlides;
			}
			// Swiperインスタンスをwindow変数に格納
			window[`swiper${index}`] = new Swiper(`.vk_post_list_slider-${sliderId}`, config);
			// ページネーションがOFFの時非表示
			if (attributes.pagination === 'hide' && window[`swiper${index}`]?.pagination) {
				window[`swiper${index}`].pagination.destroy();
			}
		}
	}
});
