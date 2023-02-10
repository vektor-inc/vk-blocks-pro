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
} from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { isParentReusableBlock } from '@vkblocks/utils/is-parent-reusable-block';

export default function SliderEdit(props) {
	const { attributes, setAttributes, clientId } = props;
	const {
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
		navigationPosition,
		blockId,
	} = attributes;

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
	}, [clientId]);

	const containerClass = ' vk_grid-column';
	const ALLOWED_BLOCKS = ['vk-blocks/slider-item'];
	const TEMPLATE = [['vk-blocks/slider-item']];

	// インナーブロックを取得
	const innerBlocks = useSelect((select) =>
		select('core/block-editor').getBlocks(clientId)
	);

	// １スライドあたりの表示枚数がスライダーの総枚数の約数出なかったときに表示するアラート
	const slidesPerViewAlert = (
		<div className="text-danger font-size-11px offset-mt-18px">
			{__(
				'Enter divisors for the number of placed slide items for each display size.',
				'vk-blocks'
			)}
		</div>
	);

	// 上記アラートを表示するか否かのモバイル時の処理
	let slidesPerViewMobileAlert = '';
	if (
		innerBlocks.length % slidesPerViewMobile !== 0 &&
		slidesPerGroup === 'slides-per-view'
	) {
		slidesPerViewMobileAlert = slidesPerViewAlert;
	}

	// 上記アラートを表示するか否かのタブレット時の処理
	let slidesPerViewTabletAlert = '';
	if (
		innerBlocks.length % slidesPerViewTablet !== 0 &&
		slidesPerGroup === 'slides-per-view'
	) {
		slidesPerViewTabletAlert = slidesPerViewAlert;
	}

	// 上記アラートを表示するか否かの PC 時の処理
	let slidesPerViewPCAlert = '';
	if (
		innerBlocks.length % slidesPerViewPC !== 0 &&
		slidesPerGroup === 'slides-per-view'
	) {
		slidesPerViewPCAlert = slidesPerViewAlert;
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
	};

	// 複数枚表示設定
	let multiItemSetting = '';
	if (effect !== 'fade') {
		multiItemSetting = (
			<PanelBody
				title={__('Multi-item Display Setting', 'vk-blocks')}
				initialOpen={false}
			>
				<BaseControl
					label={__(
						'Number of Items to display per view',
						'vk-blocks'
					)}
					id={`vk_slider-MultiItem`}
				>
					<p className="font-size-11px">
						{__(
							'Enter divisors for the number of placed slide items for each display size.',
							'vk-blocks'
						)}
						{__(
							'If the number is not divisible, the sliding behaviour will be unnatural',
							'vk-blocks'
						)}
					</p>
					<TextControl
						type={'number'}
						label={__('PC', 'vk-blocks')}
						value={slidesPerViewPC}
						onChange={(value) => {
							if (Number(value) === NaN || Number(value) < 1) {
								setAttributes({
									slidesPerViewPC: 1,
								});
							} else {
								setAttributes({
									slidesPerViewPC: parseInt(
										Number(value),
										10
									),
								});
							}
						}}
						min={1}
					/>
					{slidesPerViewPCAlert}
					<TextControl
						type={'number'}
						label={__('Tablet', 'vk-blocks')}
						value={slidesPerViewTablet}
						onChange={(value) => {
							if (Number(value) === NaN || Number(value) < 1) {
								setAttributes({
									slidesPerViewTablet: 1,
								});
							} else {
								setAttributes({
									slidesPerViewTablet: parseInt(
										Number(value),
										10
									),
								});
							}
						}}
						min={1}
					/>
					{slidesPerViewTabletAlert}
					<TextControl
						type={'number'}
						label={__('Mobile', 'vk-blocks')}
						value={slidesPerViewMobile}
						onChange={(value) => {
							if (Number(value) === NaN || Number(value) < 1) {
								setAttributes({
									slidesPerViewMobile: 1,
								});
							} else {
								setAttributes({
									slidesPerViewMobile: parseInt(
										Number(value),
										10
									),
								});
							}
						}}
						min={1}
					/>
					{slidesPerViewMobileAlert}
				</BaseControl>
				<BaseControl
					label={__(
						'Number of items to change in a transition',
						'vk-blocks'
					)}
					id={`vk_slider-slidesPerGroup`}
				>
					<RadioControl
						selected={slidesPerGroup}
						className={'vk-radioControl'}
						options={[
							{
								label: __('One by One', 'vk-blocks'),
								value: 'one-by-one',
							},
							{
								label: __(
									'Same as the number of items to display',
									'vk-blocks'
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
		className: `swiper swiper-container vk_slider vk_slider_${clientId}${alignClass}`,
	});

	return (
		<>
			<BlockControls>
				<BlockAlignmentToolbar
					value={width}
					onChange={(nextWidth) =>
						setAttributes({ width: nextWidth })
					}
					controls={['full']}
				/>
			</BlockControls>
			<InspectorControls>
				<PanelBody title={__('Width', 'vk-blocks')} initialOpen={true}>
					<BaseControl id={`vk_slider-width`}>
						<ButtonGroup>
							<Button
								isSmall={true}
								variant={width === '' ? 'primary' : 'secondary'}
								onClick={() => setAttributes({ width: '' })}
							>
								{__('Normal', 'vk-blocks')}
							</Button>
							<Button
								isSmall={true}
								variant={
									width === 'full' ? 'primary' : 'secondary'
								}
								onClick={() => setAttributes({ width: 'full' })}
							>
								{__('Full Wide', 'vk-blocks')}
							</Button>
						</ButtonGroup>
					</BaseControl>
				</PanelBody>
				<PanelBody
					title={__('Height', 'vk-blocks')}
					initialOpen={false}
				>
					<AdvancedUnitControl {...props} />
					<BaseControl
						label={__('Slide Height for each device.', 'vk-blocks')}
						id={`vk_slider-SlideHeight`}
					>
						<RangeControl
							label={__('PC', 'vk-blocks')}
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
							label={__('Tablet', 'vk-blocks')}
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
							label={__('Mobile', 'vk-blocks')}
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
					title={__('Slider Settings', 'vk-blocks')}
					initialOpen={false}
				>
					<BaseControl
						label={__('Effect ', 'vk-blocks')}
						id={`vk_slider-effect`}
					>
						<SelectControl
							value={effect}
							onChange={(value) =>
								setAttributes({ effect: value })
							}
							options={[
								{
									label: __('Slide', 'vk-blocks'),
									value: 'slide',
								},
								{
									label: __('Fade', 'vk-blocks'),
									value: 'fade',
								},
							]}
						/>
					</BaseControl>
					<BaseControl
						label={__('Loop ', 'vk-blocks')}
						id={`vk_slider-loop`}
					>
						<AdvancedToggleControl
							initialFixedTable={loop}
							schema={'loop'}
							{...props}
						/>
					</BaseControl>
					<BaseControl
						label={__('AutoPlay', 'vk-blocks')}
						id={`vk_slider-autoPlay`}
					>
						<AdvancedToggleControl
							initialFixedTable={autoPlay}
							schema={'autoPlay'}
							{...props}
						/>
					</BaseControl>
					<BaseControl
						label={__('Stop AutoPlay when swipe', 'vk-blocks')}
						id={`vk_slider-autoPlay`}
					>
						<AdvancedToggleControl
							initialFixedTable={autoPlayStop}
							schema={'autoPlayStop'}
							{...props}
						/>
					</BaseControl>
					<BaseControl
						label={__('Display Time', 'vk-blocks')}
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
						label={__('Change Speed', 'vk-blocks')}
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
						label={__('Pagination Type', 'vk-blocks')}
						id={`vk_slider-displayPagination`}
					>
						<SelectControl
							value={pagination}
							options={[
								{
									label: __('Hide', 'vk-blocks'),
									value: 'hide',
								},
								{
									label: __('Default', 'vk-blocks'),
									value: 'bullets',
								},
								{
									label: __('Number of slides', 'vk-blocks'),
									value: 'fraction',
								},
							]}
							onChange={(value) =>
								setAttributes({ pagination: value })
							}
						/>
					</BaseControl>
					<BaseControl
						label={__('Navigation Position', 'vk-blocks')}
						id={`vk_slider-navigationPosition`}
					>
						<SelectControl
							value={navigationPosition}
							options={[
								{
									label: __('Hide', 'vk-blocks'),
									value: 'hide',
								},
								{
									label: __('Center', 'vk-blocks'),
									value: 'center',
								},
								{
									label: __(
										'Bottom on Mobile device',
										'vk-blocks'
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
				<div className={`swiper-wrapper`}>
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
