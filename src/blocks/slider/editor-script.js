document.defaultView.addEventListener('load', function () {
	const swiper = [];

	const editorRoot = document.querySelector('.wp-block-post-content');

	// スライダーブロック単体の処理
	const LaunchSwiper = (slider, index) => {
		// 値を取得して配列に格納
		const attributes = JSON.parse(slider.getAttribute('data-vkb-slider'));
		if (
			attributes &&
			attributes.editorMode &&
			attributes.editorMode === 'slide'
		) {
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

			// swiper-slide クラスを追加
			const newSwiperSlide = slider.querySelectorAll('.vk_slider_item');
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
			const newSwiperDiv = slider.querySelector(
				'.block-editor-inner-blocks'
			);
			removeSwiperClassName(newSwiperDiv);

			// swiper-wrapper クラスを追加
			const newSwiperWrapper = slider.querySelector(
				'.block-editor-block-list__layout'
			);
			removeSwiperClassName(newSwiperWrapper);

			// swiper-slide クラスを追加
			const newSwiperSlide = slider.querySelectorAll('.vk_slider_item');
			newSwiperSlide.forEach((slide) => {
				removeSwiperClassName(slide);
			});
		}
	};

	// スライダーブロック全体の処理
	const LaunchSwiperALL = (root) => {
		const vkSliderArray = root.querySelectorAll('.vk_slider');
		vkSliderArray.forEach((vkSlider, index) => {
			LaunchSwiper(vkSlider, index);
		});
	};

	const changeActiveSlode = (sliderWrapper) => {
		if (sliderWrapper) {
			const sliderItemArray =
				sliderWrapper.querySelectorAll('.vk_slider_item');
			let changedFlag = false;
			sliderItemArray.forEach((sliderItem) => {
				sliderItem.classList.remove('swiper-slide-active');
				sliderItem.classList.remove('swiper-slide-prev');
				sliderItem.classList.remove('swiper-slide-next');
				if (
					sliderItem.classList.contains('is-selected') &&
					!changedFlag
				) {
					sliderItem.classList.add('swiper-slide-active');
					if (sliderItem.previousElementSibling) {
						sliderItem.previousElementSibling.classList.add(
							'swiper-slide-prev'
						);
					} else {
						sliderItemArray[
							sliderItemArray.length - 1
						].classList.add('swiper-slide-prev');
					}
					if (sliderItem.nextElementSibling) {
						sliderItem.nextElementSibling.classList.add(
							'swiper-slide-next'
						);
					} else {
						sliderItemArray[0].classList.add('swiper-slide-next');
					}
					changedFlag = true;
				}
			});
		}
	};

	// スライダーアイテムの class 属性を監視
	const sliderItemConfig = { attributes: true };
	const sliderItemCallback = (mutationsList) => {
		// Use traditional 'for loops' for IE 11
		for (const mutation of mutationsList) {
			if (
				mutation.type === 'attributes' &&
				mutation.attributeName === 'class'
			) {
				const sliderWrapper = mutation.target.parentNode;
				changeActiveSlode(sliderWrapper);
			}
		}
	};
	const sliderItemObserver = new MutationObserver(sliderItemCallback); // eslint-disable-line no-undef

	// スライダーのラッパー部分の子供を監視
	const sliderWrapperConfig = { childList: true };
	const sliderWrapperCallback = (mutationsList) => {
		// Use traditional 'for loops' for IE 11
		for (const mutation of mutationsList) {
			if (mutation.type === 'childList') {
				if (mutation.addedNodes.length > 0) {
					mutation.addedNodes.forEach((node) => {
						if (node.classList) {
							if (node.classList.contains('vk_slider_item')) {
								const slider =
									node.parentNode.parentNode.parentNode
										.parentNode;
								const index = slider.getAttribute(
									'data-vkb-slider-index'
								);
								LaunchSwiper(slider, index);
								sliderItemObserver.observe(
									node,
									sliderItemConfig
								);
							}
						}
					});
				}
			}
		}
	};
	const sliderWrapperObserver = new MutationObserver(sliderWrapperCallback); // eslint-disable-line no-undef

	// スライダーの属性を監視
	const sliderConfig = { attributes: true };
	const sliderCallback = (mutationsList) => {
		// Use traditional 'for loops' for IE 11
		for (const mutation of mutationsList) {
			if (
				mutation.type === 'attributes' &&
				mutation.attributeName === 'data-vkb-slider'
			) {
				const index = mutation.target.getAttribute(
					'data-vkb-slider-index'
				);
				LaunchSwiper(mutation.target, index);
				const vkSliderWrapper = mutation.target.querySelector(
					'.block-editor-block-list__layout'
				);
				if (vkSliderWrapper) {
					sliderWrapperObserver.observe(
						vkSliderWrapper,
						sliderWrapperConfig
					);
					const vkSliderItemArray =
						vkSliderWrapper.querySelectorAll('.vk_slider_item');
					vkSliderItemArray.forEach((vkSliderItem) => {
						sliderItemObserver.observe(
							vkSliderItem,
							sliderItemConfig
						);
					});
				}
			}
		}
	};
	const sliderObserver = new MutationObserver(sliderCallback); // eslint-disable-line no-undef

	// エディターのルート部分を監視
	const rootConfig = { childList: true };
	const rootCallback = (mutationsList) => {
		// Use traditional 'for loops' for IE 11
		for (const mutation of mutationsList) {
			if (mutation.type === 'childList') {
				if (mutation.addedNodes.length > 0) {
					mutation.addedNodes.forEach((node) => {
						if (node.classList) {
							if (node.classList.contains('vk_slider')) {
								LaunchSwiperALL(mutation.target);
								const vkSliderArray =
									mutation.target.querySelectorAll(
										'.vk_slider'
									);
								vkSliderArray.forEach((vkSlider) => {
									sliderObserver.observe(
										vkSlider,
										sliderConfig
									);
									const vkSliderWrapper =
										vkSlider.querySelector(
											'.block-editor-block-list__layout'
										);
									if (vkSliderWrapper) {
										sliderWrapperObserver.observe(
											vkSliderWrapper,
											sliderWrapperConfig
										);
										const vkSliderItemArray =
											vkSliderWrapper.querySelectorAll(
												'.vk_slider_item'
											);
										vkSliderItemArray.forEach(
											(vkSliderItem) => {
												sliderItemObserver.observe(
													vkSliderItem,
													sliderItemConfig
												);
											}
										);
									}
								});
							}
						}
					});
				}
			}
		}
	};
	const rootObserver = new MutationObserver(rootCallback); // eslint-disable-line no-undef

	if (editorRoot) {
		rootObserver.observe(editorRoot, rootConfig);
		const vkSliderArray = editorRoot.querySelectorAll('.vk_slider');
		vkSliderArray.forEach((vkSlider) => {
			LaunchSwiper(vkSlider);
			sliderObserver.observe(vkSlider, sliderConfig);
			const vkSliderWrapper = vkSlider.querySelector(
				'.block-editor-block-list__layout'
			);
			if (vkSliderWrapper) {
				sliderWrapperObserver.observe(
					vkSliderWrapper,
					sliderWrapperConfig
				);
				const vkSliderItemArray =
					vkSliderWrapper.querySelectorAll('.vk_slider_item');
				vkSliderItemArray.forEach((vkSliderItem) => {
					sliderItemObserver.observe(vkSliderItem, sliderItemConfig);
				});
			}
		});
	}
});
