import { AdvancedToggleControl } from '@vkblocks/components/advanced-toggle-control';
import AdvancedUnitControl from '@vkblocks/components/advanced-unit-control';
import { __ } from '@wordpress/i18n';
import { useEffect } from '@wordpress/element';
import {
	InspectorControls,
	BlockControls,
	BlockAlignmentToolbar,
	InnerBlocks,
	useBlockProps,
} from '@wordpress/block-editor';
import {
	PanelBody,
	BaseControl,
	TextControl,
	RadioControl,
	ButtonGroup,
	Button,
	SelectControl,
	RangeControl,
	ToggleControl,
	ToolbarGroup,
	ToolbarDropdownMenu,
	Dashicon,
} from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import Swiper from 'swiper/bundle';
import { isParentReusableBlock } from '@vkblocks/utils/is-parent-reusable-block';

// スライダーの格納
const swiper = {};

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

// スライダーブロック単体の処理
const LaunchSwiper = (slider) => {
	// 値を取得して配列に格納
	const attributes = JSON.parse(slider.getAttribute('data-vkb-slider'));

	// スライダーの ID を取得
	if (attributes && (attributes.blockId || attributes.clientId)) {
		// 対象の ID を取得
		let sliderId = '';
		if (attributes.blockId !== undefined) {
			sliderId = attributes.blockId;
		} else if (attributes.clientId !== undefined) {
			// 1.36.0 より古い状態で保存されてる場合の互換処理
			sliderId = attributes.clientId;
		}

		// 編集モードに応じた処理を実行
		if (attributes.editorMode && attributes.editorMode === 'slide') {
			if (!swiper[sliderId]) {
				// swiper クラスを追加
				const newSwiperDiv = slider.querySelector(
					'.block-editor-inner-blocks'
				);
				if (newSwiperDiv) {
					newSwiperDiv.classList.add('swiper');
				}

				// swiper-wrapper クラスを追加
				const newSwiperWrapper = slider.querySelector(
					'.block-editor-block-list__layout'
				);
				if (newSwiperWrapper) {
					newSwiperWrapper.classList.add('swiper-wrapper');
				}

				// スライダーアイテムのクラス処理
				const newSwiperSlide =
					slider.querySelectorAll('.vk_slider_item');
				if (newSwiperSlide.length > 0) {
					newSwiperSlide.forEach((slide) => {
						slide.classList.add('swiper-slide'); // swiper-slide クラスを追加
						slide.classList.remove('is-highlighted'); // 誤動作防止の為 is-highlighted クラスを削除
					});
				}

				const swiperButtonPrev = slider.querySelector(
					'.swiper-button-prev'
				);
				if (swiperButtonPrev) {
					swiperButtonPrev.style.display = '';
				}
				const swiperButtonNext = slider.querySelector(
					'.swiper-button-next'
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
					nextEl: slider.querySelector('.swiper-button-next'),
					prevEl: slider.querySelector('.swiper-button-prev'),
				};

				// ページネーションの設定
				if (attributes.pagination && attributes.pagination !== 'hide') {
					SwiperSetting.pagination = {
						el: slider.querySelector('.swiper-pagination'),
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
								slidesPerView: attributes.slidesPerViewTablet,
							};
							if (
								attributes.slidesPerGroup &&
								attributes.slidesPerGroup ===
									'slides-per-view' &&
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
					slider.querySelector(
						'div > div > div.block-editor-inner-blocks'
					),
					SwiperSetting
				);
			}
		} else {
			// 不要な swiper クラスを削除
			const newSwiperDiv = slider.querySelector(
				'.block-editor-inner-blocks'
			);
			if (newSwiperDiv) {
				removeSwiperClassName(newSwiperDiv);
			}

			// 不要な wiper-wrapper クラスを削除
			const newSwiperWrapper = slider.querySelector(
				'.block-editor-block-list__layout'
			);
			if (newSwiperWrapper) {
				removeSwiperClassName(newSwiperWrapper);
			}

			// 不要な swiper-slide クラスを削除
			const newSwiperSlide = slider.querySelectorAll('.vk_slider_item');
			if (newSwiperSlide.length > 0) {
				newSwiperSlide.forEach((slide) => {
					slide.classList.remove('is-selected');
					slide.classList.remove('is-highlighted');
					removeSwiperClassName(slide);
				});
				newSwiperSlide[0].classList.add('is-selected');
			}

			// ナビゲーションの非表示
			const swiperButtonPrev = slider.querySelector(
				'.swiper-button-prev'
			);
			if (swiperButtonPrev) {
				swiperButtonPrev.style.display = 'none';
			}
			const swiperButtonNext = slider.querySelector(
				'.swiper-button-next'
			);
			if (swiperButtonNext) {
				swiperButtonNext.style.display = 'none';
			}
			if (swiper[sliderId]) {
				swiper[sliderId].destroy();
				swiper[sliderId] = null;
			}
		}
	}
};

// スライダーブロック全体の処理
const LaunchSwiperAll = (editorRoot) => {
	const sliders = editorRoot.querySelectorAll('.vk_slider');
	if (sliders.length > 0) {
		sliders.forEach((slider) => {
			LaunchSwiper(slider);
		});
	}
};

// スライダーの監視
const SliderObserver = (editorRoot) => {
	const config = { childList: true, subtree: true, attributes: true };

	const callback = (mutationsList) => {
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

	const observer = new MutationObserver(callback); // eslint-disable-line no-undef
	observer.observe(editorRoot, config);
};

// eslint-disable no-shadow
export default function SliderEdit(props) {
	const { attributes, setAttributes, clientId } = props;
	const {
		editorMode,
		pc,
		tablet,
		mobile,
		autoPlay,
		autoPlayStop,
		autoPlayDelay,
		pagination,
		width,
		loop,
		effect,
		speed,
		slidesPerView,
		slidesPerViewMobile,
		slidesPerViewTablet,
		slidesPerViewPC,
		slidesPerGroup,
		centeredSlides,
		navigationPosition,
		blockId,
	} = attributes;

	const blockEditorRoot = document.querySelector(
		'.block-editor .is-root-container'
	);
	if (blockEditorRoot) {
		LaunchSwiperAll(blockEditorRoot);
		SliderObserver(blockEditorRoot);
	}
	const iframe = document.querySelector('#site-editor iframe');
	if (iframe) {
		const siteEditorRoot =
			iframe.contentWindow.document.querySelector('.is-root-container');
		if (siteEditorRoot) {
			LaunchSwiperAll(siteEditorRoot);
			SliderObserver(siteEditorRoot);
		}
	}

	useEffect(() => {
		// attributes の clientId は使わなくなったので削除
		if (attributes.clientId !== undefined) {
			setAttributes({ clientId: undefined });
		}

		// blockID が定義されていない場合は blockID に clientID を挿入
		// 再利用ブロックのインナーブロックではない場合 blockID を更新
		if (
			blockId === undefined ||
			isParentReusableBlock(clientId) === false
		) {
			setAttributes({ blockId: clientId });
		}

		// 1.49 以前では slidesPerViewMobile が定義されていないので互換設定を追加
		if (slidesPerViewMobile === undefined) {
			setAttributes({
				slidesPerViewMobile: 1,
			});
		}

		// 1.49 以前では slidesPerViewTablet が定義されていないので互換設定を追加
		if (slidesPerViewTablet === undefined) {
			setAttributes({
				slidesPerViewTablet: 1,
			});
		}

		// 1.49 以前では slidesPerViewPC が定義されていないので互換設定を追加
		if (slidesPerViewPC === undefined) {
			if (slidesPerView !== undefined) {
				setAttributes({
					slidesPerViewPC: slidesPerView,
				});
			} else {
				setAttributes({
					slidesPerViewPC: 1,
				});
			}
		}

		// 1.49 以前では slidesPerView が定義されていないので互換設定を追加
		if (slidesPerView === undefined) {
			setAttributes({
				slidesPerView: 1,
			});
		}

		// @since 1.50
		// 1.49 までは slidesPerGroup は 数字での保存のみだったため、
		// 1 の場合は one-by-one に、 1 以外の数字指定だった場合は slides-per-view になるように
		if (
			slidesPerGroup === undefined ||
			slidesPerGroup === null ||
			slidesPerGroup === '' ||
			slidesPerGroup === 1 ||
			slidesPerGroup === 'one-by-one'
		) {
			setAttributes({
				slidesPerGroup: 'one-by-one',
			});
		} else {
			setAttributes({
				slidesPerGroup: 'slides-per-view',
			});
		}

		// 1.51 以前では centeredSlides が定義されていないので互換設定を追加
		if (centeredSlides === undefined) {
			setAttributes({ centeredSlides: false });
		}

		// 1.49 以前では pagination はブール型だったが文字列型になっための互換処理
		if (pagination === false) {
			setAttributes({ pagination: 'hide' });
		}
		if (pagination === true) {
			setAttributes({ pagination: 'bullets' });
		}

		// 1.49 以前では autoPlayStop が定義されていないので互換設定を追加
		if (autoPlayStop === undefined) {
			setAttributes({ autoPlayStop: false });
		}

		// 1.49 以前では navigationPosition が定義されていないので互換設定を追加
		if (navigationPosition === undefined) {
			setAttributes({ navigationPosition: 'mobile-bottom' });
		}

		// 1.67 以前では editorMode が定義されていないので互換設定を追加
		if (editorMode === undefined) {
			setAttributes({ editorMode: 'default' });
		}
	}, [clientId]);

	// 複数枚動かすときに sliderPerView が小数だと微妙なので対処
	useEffect(() => {
		if (slidesPerGroup === 'slides-per-view') {
			setAttributes({
				slidesPerViewPC: parseInt(Number(slidesPerViewPC), 10),
			});
			setAttributes({
				slidesPerViewTablet: parseInt(Number(slidesPerViewTablet), 10),
			});
			setAttributes({
				slidesPerViewMobile: parseInt(Number(slidesPerViewMobile), 10),
			});
		}
	}, [slidesPerGroup]);

	const containerClass = ' vk_grid-column';
	const ALLOWED_BLOCKS = ['vk-blocks/slider-item'];
	const TEMPLATE = [['vk-blocks/slider-item']];

	// インナーブロックを取得
	const innerBlocks = useSelect((select) =>
		select('core/block-editor').getBlocks(clientId)
	);

	let demicalPointAlert = '';
	if (slidesPerGroup === 'one-by-one') {
		demicalPointAlert = (
			<p className="font-size-11px">
				{__(
					'If you specifying a numbers with decimals such as 1.5, Please set "Centering the active slide"',
					'vk-blocks-pro'
				)}
			</p>
		);
	} else if (slidesPerGroup === 'slides-per-view') {
		demicalPointAlert = (
			<p>
				{__(
					'The decimal point can be set for the display number only when the display is switched one by one.',
					'vk-blocks-pro'
				)}
			</p>
		);
	}

	// １スライドあたりの表示枚数がスライダーの総枚数の約数出なかったときに表示するアラート
	const slidesPerViewAlert = (
		<div className="text-danger font-size-11px">
			{__(
				'Enter integer divisors for the number of placed slide items for each display size.',
				'vk-blocks-pro'
			)}
		</div>
	);

	// 上記アラートを表示するか否かのモバイル時の処理
	let slidesPerViewMobileAlert = '';
	if (
		innerBlocks.length % parseInt(slidesPerViewMobile) !== 0 &&
		slidesPerGroup === 'slides-per-view'
	) {
		slidesPerViewMobileAlert = slidesPerViewAlert;
	}

	// 上記アラートを表示するか否かのタブレット時の処理
	let slidesPerViewTabletAlert = '';
	if (
		innerBlocks.length % parseInt(slidesPerViewTablet) !== 0 &&
		slidesPerGroup === 'slides-per-view'
	) {
		slidesPerViewTabletAlert = slidesPerViewAlert;
	}

	// 上記アラートを表示するか否かの PC 時の処理
	let slidesPerViewPCAlert = '';
	if (
		innerBlocks.length % parseInt(slidesPerViewPC) !== 0 &&
		slidesPerGroup === 'slides-per-view'
	) {
		slidesPerViewPCAlert = slidesPerViewAlert;
	}

	// ループに関するアラート
	let sloderPerViewLoopAlert = '';
	if (slidesPerGroup === 'slides-per-view') {
		sloderPerViewLoopAlert = (
			<div className="alert alert-danger font-size-11px">
				{__(
					'If you want to loop slides, the number of placed slide items must be greater than or equal to twice the number of items you want to display per view.',
					'vk-blocks-pro'
				)}
			</div>
		);
	} else {
		sloderPerViewLoopAlert = (
			<div className="alert alert-danger font-size-11px">
				{__(
					'If you want to loop slides, the number of placed slide items must be greater than or equal to the number of items you want to display per view + 1.',
					'vk-blocks-pro'
				)}
			</div>
		);
	}

	/* ループ時のアラート */
	// モバイル
	let slidesPerViewMobileLoopAlert = '';
	// タブレット
	let slidesPerViewTabletLoopAlert = '';
	// PC
	let slidesPerViewPCLoopAlert = '';
	if (!!loop) {
		if (
			(slidesPerGroup === 'slides-per-view' &&
				innerBlocks.length / slidesPerViewMobile < 2) ||
			(slidesPerGroup === 'one-by-one' &&
				innerBlocks.length - (slidesPerViewMobile + 1) < 0)
		) {
			slidesPerViewMobileLoopAlert = sloderPerViewLoopAlert;
		}
		if (
			(slidesPerGroup === 'slides-per-view' &&
				innerBlocks.length / slidesPerViewTablet < 2) ||
			(slidesPerGroup === 'one-by-one' &&
				innerBlocks.length - (slidesPerViewTablet + 1) < 0)
		) {
			slidesPerViewTabletLoopAlert = sloderPerViewLoopAlert;
		}

		if (
			(slidesPerGroup === 'slides-per-view' &&
				innerBlocks.length / slidesPerViewPC < 2) ||
			(slidesPerGroup === 'one-by-one' &&
				innerBlocks.length - (slidesPerViewPC + 1) < 0)
		) {
			slidesPerViewPCLoopAlert = sloderPerViewLoopAlert;
		}
	}

	// 幅のクラス名変更
	let alignClass = '';
	if ('full' === width) {
		alignClass = ' alignfull';
	} else if ('wide' === width) {
		alignClass = ' alignwide';
	}

	// JS に渡す値の構造体
	const sliderData = {
		editorMode,
		autoPlay,
		autoPlayStop,
		autoPlayDelay,
		pagination,
		blockId,
		width,
		loop,
		effect,
		speed,
		slidesPerViewMobile,
		slidesPerViewTablet,
		slidesPerViewPC,
		slidesPerGroup,
		centeredSlides,
	};

	// 複数枚表示設定
	let multiItemSetting = '';
	if (effect !== 'fade') {
		multiItemSetting = (
			<PanelBody
				title={__('Multi-item Display Setting', 'vk-blocks-pro')}
				initialOpen={false}
			>
				<BaseControl
					label={__(
						'Number of Items to display per view',
						'vk-blocks-pro'
					)}
					id={`vk_slider-MultiItem`}
				>
					<p className="font-size-11px">
						{__(
							'Enter divisors for the number of placed slide items for each display size.',
							'vk-blocks-pro'
						)}
						{__(
							'If the number is not divisible, the sliding behaviour will be unnatural',
							'vk-blocks-pro'
						)}
					</p>
					{demicalPointAlert}
					<TextControl
						type={'number'}
						label={__('PC', 'vk-blocks-pro')}
						value={slidesPerViewPC}
						onChange={(value) => {
							if (Number(value) === NaN || Number(value) < 1) {
								setAttributes({
									slidesPerViewPC: 1,
								});
							} else if (slidesPerGroup === 'slides-per-view') {
								setAttributes({
									slidesPerViewPC: parseInt(
										Number(value),
										10
									),
								});
							} else {
								setAttributes({
									slidesPerViewPC: parseFloat(Number(value)),
								});
							}
						}}
						min={1}
						step={slidesPerGroup === 'slides-per-view' ? 1 : 0.1}
					/>
					{slidesPerViewPCAlert}
					{slidesPerViewPCLoopAlert}
					<TextControl
						type={'number'}
						label={__('Tablet', 'vk-blocks-pro')}
						value={slidesPerViewTablet}
						onChange={(value) => {
							if (Number(value) === NaN || Number(value) < 1) {
								setAttributes({
									slidesPerViewTablet: 1,
								});
							} else if (slidesPerGroup === 'slides-per-view') {
								setAttributes({
									slidesPerViewTablet: parseInt(
										Number(value),
										10
									),
								});
							} else {
								setAttributes({
									slidesPerViewTablet: parseFloat(
										Number(value)
									),
								});
							}
						}}
						min={1}
						step={slidesPerGroup === 'slides-per-view' ? 1 : 0.1}
					/>
					{slidesPerViewTabletAlert}
					{slidesPerViewTabletLoopAlert}
					<TextControl
						type={'number'}
						label={__('Mobile', 'vk-blocks-pro')}
						value={slidesPerViewMobile}
						onChange={(value) => {
							if (Number(value) === NaN || Number(value) < 1) {
								setAttributes({
									slidesPerViewMobile: 1,
								});
							} else if (slidesPerGroup === 'slides-per-view') {
								setAttributes({
									slidesPerViewMobile: parseInt(
										Number(value),
										10
									),
								});
							} else {
								setAttributes({
									slidesPerViewMobile: parseFloat(
										Number(value)
									),
								});
							}
						}}
						min={1}
						step={slidesPerGroup === 'slides-per-view' ? 1 : 0.1}
					/>
					{slidesPerViewMobileAlert}
					{slidesPerViewMobileLoopAlert}
				</BaseControl>
				<BaseControl
					label={__(
						'Number of items to change in a transition',
						'vk-blocks-pro'
					)}
					id={`vk_slider-slidesPerGroup`}
				>
					<RadioControl
						selected={slidesPerGroup}
						className={'vk-radioControl'}
						options={[
							{
								label: __('One by One', 'vk-blocks-pro'),
								value: 'one-by-one',
							},
							{
								label: __(
									'Same as the number of items to display',
									'vk-blocks-pro'
								),
								value: 'slides-per-view',
							},
						]}
						onChange={(value) =>
							setAttributes({
								slidesPerGroup: value,
							})
						}
					/>
				</BaseControl>
				<BaseControl id={`vk_slider-slidesPerGroup`}>
					<ToggleControl
						label={__(
							'Centering the active slide',
							'vk-blocks-pro'
						)}
						className={'mb-1'}
						checked={centeredSlides} //eslint-disable-line camelcase
						onChange={(checked) =>
							setAttributes({ centeredSlides: checked })
						}
						help={__(
							'If you specify the center, you can display items that are cut off on the left and right.',
							'vk-blocks-pro'
						)}
					/>
				</BaseControl>
			</PanelBody>
		);
	}

	// ページネーションの HTML
	let pagination_html = '';
	if (pagination !== 'hide') {
		pagination_html = (
			<div
				className={`swiper-pagination swiper-pagination-${pagination}`}
			></div>
		);
	}

	// ナビゲーションの HTML
	let navigation_next_html = '';
	let navigation_prev_html = '';
	if (navigationPosition !== 'hide') {
		navigation_next_html = (
			<div
				className={`swiper-button-next swiper-button-${navigationPosition}`}
			></div>
		);
		navigation_prev_html = (
			<div
				className={`swiper-button-prev swiper-button-${navigationPosition}`}
			></div>
		);
	}

	const blockProps = useBlockProps({
		className: `vk_slider vk_swiper vk_slider_editorMode--${editorMode} vk_slider_${clientId}${alignClass}`,
	});

	return (
		<>
			<BlockControls>
				<BlockAlignmentToolbar
					value={width}
					onChange={(nextWidth) =>
						setAttributes({ width: nextWidth })
					}
					controls={['wide', 'full']}
				/>
				<ToolbarGroup>
					<ToolbarDropdownMenu
						icon={
							editorMode === 'default' ? (
								<Dashicon icon="edit" />
							) : (
								<Dashicon icon="visibility" />
							)
						}
						label={__('Change Slide Editor Mode', 'vk-blocks-pro')}
						controls={[
							{
								title: __(
									'Edit ( Stacked Layout ) Mode',
									'vk-blocks-pro'
								),
								icon: <Dashicon icon="edit" />,
								isActive: editorMode === 'default',
								onClick: () =>
									setAttributes({ editorMode: 'default' }),
							},
							{
								title: __(
									'Preview ( Slide ) Mode',
									'vk-blocks-pro'
								),
								icon: <Dashicon icon="visibility" />,
								isActive: editorMode === 'slide',
								onClick: () =>
									setAttributes({ editorMode: 'slide' }),
							},
						]}
					/>
				</ToolbarGroup>
			</BlockControls>
			<InspectorControls>
				<PanelBody
					title={__('Editor Setting', 'vk-blocks-pro')}
					initialOpen={true}
				>
					<BaseControl
						label={__('Editor Mode', 'vk-blocks-pro')}
						id={`vk_slider-effect`}
					>
						<ButtonGroup>
							<Button
								isSmall={true}
								variant={
									editorMode === 'default'
										? 'primary'
										: 'secondary'
								}
								onClick={() =>
									setAttributes({ editorMode: 'default' })
								}
							>
								{__('Edit ( Stacked Layout )', 'vk-blocks-pro')}
							</Button>
							<Button
								isSmall={true}
								variant={
									editorMode === 'slide'
										? 'primary'
										: 'secondary'
								}
								onClick={() =>
									setAttributes({ editorMode: 'slide' })
								}
							>
								{__('Preview ( Slide )', 'vk-blocks-pro')}
							</Button>
						</ButtonGroup>
					</BaseControl>
				</PanelBody>
				<PanelBody
					title={__('Height', 'vk-blocks-pro')}
					initialOpen={false}
				>
					<AdvancedUnitControl {...props} />
					<BaseControl
						label={__(
							'Slide Height for each device.',
							'vk-blocks-pro'
						)}
						id={`vk_slider-SlideHeight`}
					>
						<RangeControl
							label={__('PC', 'vk-blocks-pro')}
							value={pc}
							onChange={(value) => {
								if (
									value === null ||
									value === '' ||
									value === undefined
								) {
									setAttributes({ pc: null });
								} else {
									setAttributes({
										pc: parseFloat(Number(value)),
									});
								}
							}}
							min={0}
							max={1000}
							allowReset={true}
							resetFallbackValue={null}
						/>
						<RangeControl
							label={__('Tablet', 'vk-blocks-pro')}
							value={tablet}
							onChange={(value) => {
								if (
									value === null ||
									value === '' ||
									value === undefined
								) {
									setAttributes({ tablet: null });
								} else {
									setAttributes({
										tablet: parseFloat(Number(value)),
									});
								}
							}}
							min={0}
							max={1000}
							allowReset={true}
							resetFallbackValue={null}
						/>
						<RangeControl
							label={__('Mobile', 'vk-blocks-pro')}
							value={mobile}
							onChange={(value) => {
								if (
									value === null ||
									value === '' ||
									value === undefined
								) {
									setAttributes({ mobile: null });
								} else {
									setAttributes({
										mobile: parseFloat(Number(value)),
									});
								}
							}}
							min={0}
							max={1000}
							allowReset={true}
							resetFallbackValue={null}
						/>
					</BaseControl>
				</PanelBody>
				<PanelBody
					title={__('Slider Settings', 'vk-blocks-pro')}
					initialOpen={false}
				>
					<BaseControl
						label={__('Effect ', 'vk-blocks-pro')}
						id={`vk_slider-effect`}
					>
						<SelectControl
							value={effect}
							onChange={(value) =>
								setAttributes({ effect: value })
							}
							options={[
								{
									label: __('Slide', 'vk-blocks-pro'),
									value: 'slide',
								},
								{
									label: __('Fade', 'vk-blocks-pro'),
									value: 'fade',
								},
							]}
						/>
					</BaseControl>
					<BaseControl
						label={__('Loop ', 'vk-blocks-pro')}
						id={`vk_slider-loop`}
					>
						<AdvancedToggleControl
							initialFixedTable={loop}
							schema={'loop'}
							{...props}
						/>
					</BaseControl>
					<BaseControl
						label={__('AutoPlay', 'vk-blocks-pro')}
						id={`vk_slider-autoPlay`}
					>
						<AdvancedToggleControl
							initialFixedTable={autoPlay}
							schema={'autoPlay'}
							{...props}
						/>
					</BaseControl>
					<BaseControl
						label={__('Stop AutoPlay when swipe', 'vk-blocks-pro')}
						id={`vk_slider-autoPlay`}
					>
						<AdvancedToggleControl
							initialFixedTable={autoPlayStop}
							schema={'autoPlayStop'}
							{...props}
						/>
					</BaseControl>
					<BaseControl
						label={__('Display Time', 'vk-blocks-pro')}
						id={`vk_slider-autoPlay`}
					>
						<TextControl
							type={'number'}
							value={autoPlayDelay}
							onChange={(value) => {
								if (
									Number(value) === NaN ||
									Number(value) < 0
								) {
									setAttributes({
										autoPlayDelay: 0,
									});
								} else {
									setAttributes({
										autoPlayDelay: parseInt(
											Number(value),
											10
										),
									});
								}
							}}
							min={0}
						/>
					</BaseControl>
					<BaseControl
						label={__('Change Speed', 'vk-blocks-pro')}
						id={`vk_slider-changeSpeed`}
					>
						<TextControl
							type={'number'}
							value={speed}
							onChange={(value) => {
								if (
									Number(value) === NaN ||
									Number(value) < 0
								) {
									setAttributes({
										speed: 0,
									});
								} else {
									setAttributes({
										speed: parseInt(Number(value), 10),
									});
								}
							}}
							min={0}
						/>
					</BaseControl>
					<BaseControl
						label={__('Pagination Type', 'vk-blocks-pro')}
						id={`vk_slider-displayPagination`}
					>
						<SelectControl
							value={pagination}
							options={[
								{
									label: __('Hide', 'vk-blocks-pro'),
									value: 'hide',
								},
								{
									label: __('Default', 'vk-blocks-pro'),
									value: 'bullets',
								},
								{
									label: __(
										'Number of slides',
										'vk-blocks-pro'
									),
									value: 'fraction',
								},
							]}
							onChange={(value) =>
								setAttributes({ pagination: value })
							}
						/>
					</BaseControl>
					<BaseControl
						label={__('Navigation Position', 'vk-blocks-pro')}
						id={`vk_slider-navigationPosition`}
					>
						<SelectControl
							value={navigationPosition}
							options={[
								{
									label: __('Hide', 'vk-blocks-pro'),
									value: 'hide',
								},
								{
									label: __('Center', 'vk-blocks-pro'),
									value: 'center',
								},
								{
									label: __(
										'Bottom on Mobile device',
										'vk-blocks-pro'
									),
									value: 'mobile-bottom',
								},
							]}
							onChange={(value) =>
								setAttributes({ navigationPosition: value })
							}
						/>
					</BaseControl>
				</PanelBody>
				{multiItemSetting}
			</InspectorControls>
			<div {...blockProps} data-vkb-slider={JSON.stringify(sliderData)}>
				<div className={`vk_slider_wrapper`}>
					<div>
						<InnerBlocks
							//編集画面の追加タグ用に2回目のClassを挿入
							className={`${containerClass} row`}
							template={TEMPLATE}
							allowedBlocks={ALLOWED_BLOCKS}
						/>
					</div>
				</div>
				{navigation_next_html}
				{navigation_prev_html}
				{pagination_html}
			</div>
		</>
	);
}
