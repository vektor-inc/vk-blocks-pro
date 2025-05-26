document.defaultView.addEventListener('load', function () {
	// //data-vkb-slider属性のNodeを取得
	let sliderNodeList = document.querySelectorAll('[data-vkb-slider]');
	// 配列に変換。
	sliderNodeList = Array.from(sliderNodeList);

	// ズームアニメーション用のCSS生成関数
	const generateZoomAnimationCss = (attributes, sliderId) => {
		const {
			zoomAnimation,
			zoomInitialScale,
			zoomFinalScale,
			autoPlayDelay,
			speed,
		} = attributes;

		let css = '';

		if (zoomAnimation) {
			// ズーム用のセレクターは ::before 専用にして、親要素への副作用を防ぐ
			const zoomSelector = `.vk_slider_${sliderId}`;

			css += `
				.vk_slider_${sliderId} .vk_slider_item.swiper-slide-active::before,
				.vk_slider_${sliderId} .vk_slider_item.swiper-slide-duplicate-active::before {
					content: "";
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
					background-size: cover;
					background-position: center;
					background-image: inherit;
					will-change: transform;
					transform: scale(${zoomInitialScale !== undefined ? zoomInitialScale : 1});
					transition: transform ${(autoPlayDelay + speed + autoPlayDelay * 0.5) / 1000 || 6}s linear;
					z-index: -1;
				}
				
				${zoomSelector} .vk_slider_item.swiper-slide-active::before,
				${zoomSelector} .vk_slider_item.swiper-slide-duplicate-active::before {
					transform: scale(${zoomFinalScale !== undefined ? zoomFinalScale : 1.25});
				}
				
				${zoomSelector} .vk_slider_item.swiper-slide-prev::before,
				${zoomSelector} .vk_slider_item.swiper-slide-next::before {
					transform: scale(${zoomInitialScale !== undefined ? zoomInitialScale : 1});
				}
			`;
		}

		return css;
	};

	// ズームアニメーション用のスタイルを動的に追加
	const addZoomAnimationStyles = (attributes, sliderId) => {
		if (attributes.zoomAnimation) {
			const css = generateZoomAnimationCss(attributes, sliderId);
			if (css) {
				const styleElement = document.createElement('style');
				styleElement.type = 'text/css';
				styleElement.innerHTML = css;
				document.head.appendChild(styleElement);
			}
		}
	};

	if (sliderNodeList) {
		for (const index in sliderNodeList) {
			const sliderNode = sliderNodeList[index];
			const attributes = JSON.parse(
				sliderNode.getAttribute('data-vkb-slider')
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

			// ズームアニメーション用のスタイルを追加
			addZoomAnimationStyles(attributes, sliderId);

			let SwiperSetting = `
			var swiper${index} = new Swiper ('.vk_slider_${sliderId}', {
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
});
