document.defaultView.addEventListener('load', function () {
	const swiper = [];
	const editorRoot = document.querySelector('.wp-block-post-content');

	// swiper クラスを削除
	const removeSwiperClassName = (targetElement) => {
		if (targetElement) {
			const classNames = targetElement.className.split(' ');
			for (let i = 0; i < classNames.length; i++) {
				if (classNames[i].match(/swiper(\w|-)*/)) {
					// クラスを削除
					targetElement.classList.remove(classNames[i]);
				}
			}
			targetElement.id = targetElement.id.replace(/swiper(\w|-)*/g, '');
			targetElement.style.width = '';
		}
	};

	// スライダーブロック全体の処理
	const LaunchSwiper = (slider) => {
		// 値を取得して配列に格納
		const attributes = JSON.parse(slider.getAttribute('data-vkb-slider'));
		if (attributes && (attributes.blockId || attributes.clientId)) {
			// 対象の ID を取得
			let sliderId = '';
			if (attributes.blockId !== undefined) {
				sliderId = attributes.blockId;
			} else if (attributes.clientId !== undefined) {
				// 1.36.0 より古い状態で保存されてる場合の互換処理
				sliderId = attributes.clientId;
			}

			if (attributes.editorMode && attributes.editorMode === 'slide') {
				if (!swiper[sliderId]) {
					// swiper クラスを追加
					const newSwiperDiv = slider.querySelector(
						'.block-editor-inner-blocks'
					);
					newSwiperDiv.classList.add('swiper');

					// swiper-wrapper クラスを追加
					const newSwiperWrapper = slider.querySelector(
						'.block-editor-block-list__layout'
					);
					newSwiperWrapper.classList.add('swiper-wrapper');

					// スライダーアイテムのクラス処理
					const newSwiperSlide =
						slider.querySelectorAll('.vk_slider_item');
					newSwiperSlide.forEach((slide) => {
						slide.classList.add('swiper-slide'); // swiper-slide クラスを追加
						slide.classList.remove('is-highlighted'); // 誤動作防止の為 is-highlighted クラスを削除
					});

					const swiperButtonPrev = slider.querySelector(
						'.swiper-button-prev'
					);
					if (swiperButtonPrev) {
						swiperButtonPrev.style.display = '';
					}
					const swiperButtonNext = slider.querySelector(
						'.swiper-button-prev'
					);
					if (swiperButtonNext) {
						swiperButtonNext.style.display = '';
					}

					// Sloder の設定を作成
					const SwiperSetting = {};

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
					if (
						attributes.pagination &&
						attributes.pagination !== 'hide'
					) {
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
								attributes.slidesPerGroup ===
									'slides-per-view' &&
								Number.isInteger(attributes.slidesPerViewMobile)
							) {
								SwiperSetting.slidesPerGroup =
									attributes.slidesPerViewMobile;
							} else {
								SwiperSetting.slidesPerGroup = 1;
							}
						} else if (attributes.slidesPerView) {
							SwiperSetting.slidesPerView =
								attributes.slidesPerView;
							if (
								attributes.slidesPerGroup &&
								attributes.slidesPerGroup ===
									'slides-per-view' &&
								Number.isInteger(attributes.slidesPerView)
							) {
								SwiperSetting.slidesPerGroup =
									attributes.slidesPerView;
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
									slidesPerView:
										attributes.slidesPerViewTablet,
								};
								if (
									attributes.slidesPerGroup &&
									attributes.slidesPerGroup ===
										'slides-per-view' &&
									Number.isInteger(
										attributes.slidesPerViewTablet
									)
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
									attributes.slidesPerGroup ===
										'slides-per-view' &&
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
							SwiperSetting.centeredSlides =
								attributes.centeredSlides;
						}

						SwiperSetting.slideActiveClass = 'is-selected';
					}

					// eslint-disable-next-line no-undef
					swiper[sliderId] = new Swiper(
						`.vk_slider_${sliderId} > div > div > div.block-editor-inner-blocks`,
						SwiperSetting
					);
				}
			} else {
				// swiper クラスを追加
				const newSwiperDiv = slider.querySelector(
					'.block-editor-inner-blocks'
				);
				removeSwiperClassName(newSwiperDiv);

				// swiper-wrapper クラスを追加
				const newSwiperWrapper = slider.querySelector(
					'.block-editor-block-list__layout'
				);
				removeSwiperClassName(newSwiperWrapper);

				// 不要なクラスを削除
				const newSwiperSlide =
					slider.querySelectorAll('.vk_slider_item');
				newSwiperSlide.forEach((slide) => {
					slide.classList.remove('is-selected');
					slide.classList.remove('is-highlighted');
					removeSwiperClassName(slide);
				});
				newSwiperSlide[0].classList.add('is-selected');
				slider.querySelector('.swiper-button-prev').style.display =
					'none';
				slider.querySelector('.swiper-button-next').style.display =
					'none';
				if (swiper[sliderId]) {
					swiper[sliderId].destroy();
					swiper[sliderId] = null;
				}
			}
		}
	};

	// エディターのルート部分を監視
	const rootConfig = { childList: true, subtree: true, attributes: true };
	const rootCallback = (mutationsList) => {
		// Use traditional 'for loops' for IE 11
		for (const mutation of mutationsList) {
			if (mutation.type === 'childList') {
				if (mutation.addedNodes.length > 0) {
					mutation.addedNodes.forEach((addedNode) => {
						if (
							addedNode.classList &&
							addedNode.classList.contains('vk_slider')
						) {
							LaunchSwiper(addedNode);
						} else if (
							addedNode.classList &&
							addedNode.classList.contains('vk_slider_item')
						) {
							const parentSlider =
								addedNode.closest('.vk_slider');
							LaunchSwiper(parentSlider);
						}
					});
				}
			} else if (mutation.type === 'attributes') {
				if (
					mutation.target.classList.contains('vk_slider') &&
					mutation.attributeName === 'data-vkb-slider'
				) {
					LaunchSwiper(mutation.target);
				}
			}
		}
	};
	const rootObserver = new MutationObserver(rootCallback); // eslint-disable-line no-undef

	if (editorRoot) {
		const sliderBlocks = editorRoot.querySelectorAll('.vk_slider');
		sliderBlocks.forEach((slider) => {
			LaunchSwiper(slider);
		});
		rootObserver.observe(editorRoot, rootConfig);
	}
});
