import { AdvancedToggleControl } from '@vkblocks/components/advanced-toggle-control';
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
	__experimentalToggleGroupControl as ToggleGroupControl,
	__experimentalToggleGroupControlOption as ToggleGroupControlOption,
	SelectControl,
	ToolbarGroup,
	ToolbarDropdownMenu,
	Dashicon,
} from '@wordpress/components';
import { isParentReusableBlock } from '@vkblocks/utils/is-parent-reusable-block';
import { editSliderLaunch } from './edit-slider';
import { MultiItemSetting } from './edit-multiItem';
import ResponsiveSizeControl, {
	getMaxByUnit,
} from '@vkblocks/components/responsive-size-control';

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
		unit,
	} = attributes;

	useEffect(() => {
		let timer;
		if (editorMode) {
			timer = setTimeout(() => {
				editSliderLaunch();
			}, 50);
		}

		return () => clearTimeout(timer);
	}, [editorMode]);

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
						<ToggleGroupControl
							value={editorMode}
							onChange={(value) =>
								setAttributes({ editorMode: value })
							}
							isBlock
						>
							<ToggleGroupControlOption
								value="default"
								label={__(
									'Edit ( Stacked Layout )',
									'vk-blocks-pro'
								)}
							/>
							<ToggleGroupControlOption
								value="slide"
								label={__('Preview ( Slide )', 'vk-blocks-pro')}
							/>
						</ToggleGroupControl>
					</BaseControl>
				</PanelBody>
				<PanelBody
					title={__('Height', 'vk-blocks-pro')}
					initialOpen={false}
				>
					<ResponsiveSizeControl
						label={__(
							'Slide Height for each device.',
							'vk-blocks-pro'
						)}
						valuePC={pc}
						valueTablet={tablet}
						valueMobile={mobile}
						unit={unit}
						onChangePC={(value) => setAttributes({ pc: value })}
						onChangeTablet={(value) =>
							setAttributes({ tablet: value })
						}
						onChangeMobile={(value) =>
							setAttributes({ mobile: value })
						}
						onChangeUnit={(value) => setAttributes({ unit: value })}
						maxPC={getMaxByUnit(unit)}
						maxTablet={getMaxByUnit(unit)}
						maxMobile={getMaxByUnit(unit)}
					/>
				</PanelBody>
				<PanelBody
					title={__('Slider Settings', 'vk-blocks-pro')}
					initialOpen={false}
				>
					<BaseControl
						label={__('Effect', 'vk-blocks-pro')}
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
						label={__('Loop', 'vk-blocks-pro')}
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
				<MultiItemSetting {...props} />
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
