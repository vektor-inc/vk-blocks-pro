document.defaultView.addEventListener('load', function () {
	const vkSliderArray = document.querySelectorAll('.vk_slider');
	const swiper = [];

	const LaunchSwiper = (vkSlider, index) => {
		// 値を取得して配列に格納
		const attributes = JSON.parse(vkSlider.getAttribute('data-vkb-slider'));
		if (attributes.editorMode && attributes.editorMode === 'slide') {
			// swiper クラスを追加
			const newSwiperDiv = vkSlider.querySelector(
				'.block-editor-inner-blocks'
			);
			newSwiperDiv.classList.add('swiper');

			// swiper-wrapper クラスを追加
			const newSwiperWrapper = vkSlider.querySelector(
				'.block-editor-block-list__layout'
			);
			newSwiperWrapper.classList.add('swiper-wrapper');

			// swiper-slide クラスを追加
			const newSwiperSlide = vkSlider.querySelectorAll('.vk_slider_item');
			newSwiperSlide.forEach((slide) => {
				slide.classList.add('swiper-slide');
			});

			// Sloder の設定を作成
			const SwiperSetting = {};

			// 対象の ID を取得
			let sliderId = '';
			if (attributes.blockId !== undefined) {
				sliderId = attributes.blockId;
			} else if (attributes.clientId !== undefined) {
				// 1.36.0 より古い状態で保存されてる場合の互換処理
				sliderId = attributes.clientId;
			}

			// ループの設定
			if (attributes.loop) {
				SwiperSetting.loop = attributes.loop;
			}

			// エフェクトの設定
			if (attributes.effect) {
				SwiperSetting.effect = attributes.effect;
			}

			// ナビゲーションの設定
			SwiperSetting.navigation = {
				nextEl: `.vk_slider_${sliderId} .swiper-button-next`,
				prevEl: `.vk_slider_${sliderId} .swiper-button-prev`,
			};

			// ページネーションの設定
			if (attributes.pagination && attributes.pagination !== 'hide') {
				SwiperSetting.pagination = {
					el: `.vk_slider_${sliderId} .swiper-pagination`,
					clickable: true,
					type: `${attributes.pagination}`,
					renderFraction(currentClass, totalClass) {
						return (
							'<span class="' +
							currentClass +
							'"></span>' +
							' / ' +
							'<span class="' +
							totalClass +
							'"></span>'
						);
					},
				};
			}

			// 複数枚表示の設定
			if (attributes.effect && attributes.effect !== 'fade') {
				if (attributes.slidesPerViewMobile) {
					SwiperSetting.slidesPerView =
						attributes.slidesPerViewMobile;
					if (
						attributes.slidesPerGroup &&
						attributes.slidesPerGroup === 'slides-per-view' &&
						Number.isInteger(attributes.slidesPerViewMobile)
					) {
						SwiperSetting.slidesPerGroup =
							attributes.slidesPerViewMobile;
					} else {
						SwiperSetting.slidesPerGroup = 1;
					}
				} else if (attributes.slidesPerView) {
					SwiperSetting.slidesPerView = attributes.slidesPerView;
					if (
						attributes.slidesPerGroup &&
						attributes.slidesPerGroup === 'slides-per-view' &&
						Number.isInteger(attributes.slidesPerView)
					) {
						SwiperSetting.slidesPerGroup = attributes.slidesPerView;
					} else {
						SwiperSetting.slidesPerGroup = 1;
					}
				} else {
					SwiperSetting.slidesPerView = 1;
					SwiperSetting.slidesPerGroup = 1;
				}
				if (
					attributes.slidesPerViewTablet ||
					attributes.slidesPerViewPC
				) {
					// Responsive breakpoints
					SwiperSetting.breakpoints = {};
					if (attributes.slidesPerViewTablet) {
						SwiperSetting.breakpoints[576] = {
							slidesPerView: attributes.slidesPerViewTablet,
						};
						if (
							attributes.slidesPerGroup &&
							attributes.slidesPerGroup === 'slides-per-view' &&
							Number.isInteger(attributes.slidesPerViewTablet)
						) {
							SwiperSetting.breakpoints[576].slidesPerGroup =
								attributes.slidesPerViewTablet;
						} else {
							SwiperSetting.breakpoints[576].slidesPerGroup = 1;
						}
					}
					if (attributes.slidesPerViewPC) {
						SwiperSetting.breakpoints[992] = {
							slidesPerView: attributes.slidesPerViewPC,
						};
						if (
							attributes.slidesPerGroup &&
							attributes.slidesPerGroup === 'slides-per-view' &&
							Number.isInteger(attributes.slidesPerViewPC)
						) {
							SwiperSetting.breakpoints[992].slidesPerGroup =
								attributes.slidesPerViewPC;
						} else {
							SwiperSetting.breakpoints[992].slidesPerGroup = 1;
						}
					}
				}

				if (attributes.centeredSlides) {
					SwiperSetting.centeredSlides = attributes.centeredSlides;
				}
			}

			// eslint-disable-next-line no-undef
			swiper[index] = new Swiper(
				`.vk_slider_${sliderId} > div > div > div.block-editor-inner-blocks`,
				SwiperSetting
			);
		} else {
			const removeSwiperClassName = (targetElement) => {
				if (targetElement) {
					const classNames = targetElement.className.split(' ');
					for (let i = 0; i < classNames.length; i++) {
						if (classNames[i].match(/swiper(\w|-)*/)) {
							// クラスを削除
							targetElement.classList.remove(classNames[i]);
						}
					}
					targetElement.id = targetElement.id.replace(
						/swiper(\w|-)*/g,
						''
					);
					targetElement.style.width = '';
				}
			};
			// swiper クラスを追加
			const newSwiperDiv = vkSlider.querySelector(
				'.block-editor-inner-blocks'
			);
			removeSwiperClassName(newSwiperDiv);

			// swiper-wrapper クラスを追加
			const newSwiperWrapper = vkSlider.querySelector(
				'.block-editor-block-list__layout'
			);
			removeSwiperClassName(newSwiperWrapper);

			// swiper-slide クラスを追加
			const newSwiperSlide = vkSlider.querySelectorAll('.vk_slider_item');
			newSwiperSlide.forEach((slide) => {
				removeSwiperClassName(slide);
			});
		}
	};

	const observeSliderAttributeChanges = (vkSlider, index) => {
		// MutationObserverを設定して data-vkb-slider の変更を監視
		// https://developer.mozilla.org/ja/docs/Web/API/MutationObserver
		// eslint-disable-next-line no-undef
		const sliderAttributesObserver = new MutationObserver((mutations) => {
			mutations.forEach((mutation) => {
				if (
					mutation.type === 'attributes' &&
					mutation.attributeName === 'data-vkb-slider'
				) {
					LaunchSwiper(vkSlider, index);
					observeWrapperChanges(vkSlider, index); // 子要素の変更を監視
				}
			});
		});

		// 監視対象をvkSliderに設定
		sliderAttributesObserver.observe(vkSlider, { attributes: true });
	};

	const observeWrapperChanges = (vkSlider, index) => {
		// MutationObserverを設定してvkSliderの子要素の変更、追加、削除を監視
		// https://developer.mozilla.org/ja/docs/Web/API/MutationObserver
		// eslint-disable-next-line no-undef
		const wrapperObserver = new MutationObserver((mutations) => {
			mutations.forEach((mutation) => {
				if (mutation.type === 'childList') {
					// 子要素が変更、追加、削除された場合、LaunchSwiper関数を呼び出す
					LaunchSwiper(vkSlider, index);
				}
			});
		});

		// 監視対象をvkSliderの子要素に設定
		const vkSliderWrapper = vkSlider.querySelector(
			'.block-editor-block-list__layout'
		);
		if (vkSliderWrapper) {
			wrapperObserver.observe(vkSliderWrapper, {
				childList: true,
				attributes: true,
			});
		}
	};

	// vkSliderArray に格納された要素をループ
	vkSliderArray.forEach((vkSlider, index) => {
		LaunchSwiper(vkSlider, index);
		observeSliderAttributeChanges(vkSlider, index); // data-vkb-slider の変更を監視
		observeWrapperChanges(vkSlider, index); // 子要素の変更を監視
	});
});
