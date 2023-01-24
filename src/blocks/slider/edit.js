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

		// 以前のバージョンでは slidesPerViewMobile が定義されていないので互換設定を追加
		if (slidesPerViewMobile === undefined) {
			setAttributes({
				slidesPerViewMobile: 1,
			});
		}

		// 以前のバージョンでは slidesPerViewTablet が定義されていないので互換設定を追加
		if (slidesPerViewTablet === undefined) {
			setAttributes({
				slidesPerViewTablet: 1,
			});
		}

		// 以前のバージョンでは slidesPerViewPC が定義されていないので互換設定を追加
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

		// 以前のバージョンでは slidesPerView が定義されていないので互換設定を追加
		if (slidesPerView === undefined) {
			setAttributes({
				slidesPerView: 1,
			});
		}

		// 以前のバージョンでは slidesPerGroup が定義されていないので互換設定を追加
		// 以前のバージョンでは slidesPerGroup は数値だったが文字列なったときの処理も含む
		@since 1.50
		1.49 までは slidesPerGroup は 数字での保存のみだったため、
		1 の場合は one-by-one に、 1 以外の数字指定だった場合は slides-per-view になるように
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

		// 以前のバージョンでは pagination はブール型だったが文字列型になっための互換処理
		if (pagination === false) {
			setAttributes({ pagination: 'hide' });
		}
		if (pagination === true) {
			setAttributes({ pagination: 'bullets' });
		}

		// 以前のバージョンでは autoPlayStop が定義されていないので互換設定を追加
		if (autoPlayStop === undefined) {
			setAttributes({ autoPlayStop: false });
		}

		// 以前のバージョンでは navigationPosition が定義されていないので互換設定を追加
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
		<div className="alert alert-denger">
			<p>
				{__(
					'Specify a number that divides the number of slide items.',
					'vk-blocks'
				)}
			</p>
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
	let multiImageSetting = '';
	if (effect !== 'fade') {
		multiImageSetting = (
			<PanelBody
				title={__('Multi-image Display Setting', 'vk-blocks')}
				initialOpen={false}
			>
				<BaseControl
					label={__('Display Images per View', 'vk-blocks')}
					id={`vk_slider-MultiImage`}
				>
					<div className="alert alert-denger">
						<p>
							{__(
								'Specify a number that divides the number of slide items by the number of display items.',
								'vk-blocks'
							)}
						</p>
						<p>
							{__(
								'If the number is not divisible, the slide behavior will be unnatural.',
								'vk-blocks'
							)}
						</p>
					</div>
					<TextControl
						label={__('Images per View for Mobile', 'vk-blocks')}
						value={slidesPerViewMobile}
						onChange={(value) => {
							if (Number(value)) {
								setAttributes({
									slidesPerViewMobile: parseInt(value, 10),
								});
							}
						}}
						type={'number'}
					/>
					{slidesPerViewMobileAlert}
					<TextControl
						label={__('Images per View for Tablet', 'vk-blocks')}
						value={slidesPerViewTablet}
						onChange={(value) => {
							if (Number(value)) {
								setAttributes({
									slidesPerViewTablet: parseInt(value, 10),
								});
							}
						}}
						type={'number'}
					/>
					{slidesPerViewTabletAlert}
					<TextControl
						label={__('Images per View for PC', 'vk-blocks')}
						value={slidesPerViewPC}
						onChange={(value) => {
							if (Number(value)) {
								setAttributes({
									slidesPerViewPC: parseInt(value, 10),
								});
							}
						}}
						type={'number'}
					/>
					{slidesPerViewPCAlert}
				</BaseControl>
				<BaseControl
					label={__('Move Views per Slide', 'vk-blocks')}
					id={`vk_slider-MultiImage`}
				>
					<ButtonGroup className="mb-3">
						<Button
							isSmall={true}
							variant={
								slidesPerGroup === 'one-by-one'
									? 'primary'
									: 'secondary'
							}
							onClick={() =>
								setAttributes({ slidesPerGroup: 'one-by-one' })
							}
						>
							{__('One by One', 'vk-blocks')}
						</Button>
						<Button
							isSmall={true}
							variant={
								slidesPerGroup === 'slides-per-view'
									? 'primary'
									: 'secondary'
							}
							onClick={() =>
								setAttributes({
									slidesPerGroup: 'slides-per-view',
								})
							}
						>
							{__('Display Images per View', 'vk-blocks')}
						</Button>
					</ButtonGroup>
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
							onChange={(value) =>
								setAttributes({ pc: parseFloat(value) })
							}
							min={0}
							max={1000}
							allowReset={true}
							resetFallbackValue={null}
						/>
						<RangeControl
							label={__('Tablet', 'vk-blocks')}
							value={tablet}
							onChange={(value) =>
								setAttributes({ tablet: parseFloat(value) })
							}
							min={0}
							max={1000}
							allowReset={true}
							resetFallbackValue={null}
						/>
						<RangeControl
							label={__('Mobile', 'vk-blocks')}
							value={mobile}
							onChange={(value) =>
								setAttributes({ mobile: parseFloat(value) })
							}
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
							value={autoPlayDelay}
							onChange={(value) => {
								if (Number(value)) {
									setAttributes({
										autoPlayDelay: parseInt(value, 10),
									});
								}
							}}
							type={'number'}
						/>
					</BaseControl>
					<BaseControl
						label={__('Change Speed', 'vk-blocks')}
						id={`vk_slider-changeSpeed`}
					>
						<TextControl
							value={speed}
							onChange={(value) => {
								if (Number(value)) {
									setAttributes({
										speed: parseInt(value, 10),
									});
								}
							}}
							type={'number'}
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
				{multiImageSetting}
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
