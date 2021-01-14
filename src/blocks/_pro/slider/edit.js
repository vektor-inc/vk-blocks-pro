import replaceClientId from '@vkblocks/utils/replaceClientId';
import { AdvancedToggleControl } from '@vkblocks/components/advanced-toggle-control';
import AdvancedViewportControl from '@vkblocks/components/advanced-viewport-control';
import AdvancedUnitControl from '@vkblocks/components/advanced-unit-control';
import { __ } from '@wordpress/i18n';
import { Fragment, useEffect } from '@wordpress/element';
import {
	InspectorControls,
	BlockControls,
	BlockAlignmentToolbar,
	InnerBlocks,
	useBlockProps,
} from '@wordpress/block-editor';
import { dispatch } from '@wordpress/data';
import {
	PanelBody,
	BaseControl,
	TextControl,
	ButtonGroup,
	Button,
	SelectControl,
} from '@wordpress/components';

export default function SliderEdit(props) {
	const { attributes, setAttributes, clientId } = props;
	const {
		autoPlay,
		autoPlayDelay,
		pagination,
		width,
		loop,
		effect,
		speed,
	} = attributes;
	const { updateBlockAttributes } = dispatch('core/block-editor');
	const customClientId = replaceClientId(clientId);

	useEffect(() => {
		updateBlockAttributes(clientId, {
			clientId: customClientId,
		});
	}, []);

	const containerClass = ' vk_grid-column';
	let alignClass;
	const ALLOWED_BLOCKS = [['vk-blocks/slider-item']];
	const TEMPLATE = ALLOWED_BLOCKS;

	if ('full' === width) {
		alignClass = 'vk_width-full';
	} else if ('wide' === width) {
		alignClass = 'vk_width-wide';
	} else {
		alignClass = 'vk_width';
	}

	const sliderData = {
		autoPlay,
		autoPlayDelay,
		pagination,
		clientId,
		width,
		loop,
		effect,
		speed,
	};

	const blockProps = useBlockProps({
		className: `swiper-container vk_slider vk_slider_${clientId} ${alignClass}`,
	});

	return (
		<Fragment>
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
								isSmall
								isPrimary={width === ''}
								isSecondary={width !== ''}
								onClick={() => setAttributes({ width: '' })}
							>
								{__('Normal', 'vk-blocks')}
							</Button>
							<Button
								isSmall
								isPrimary={width === 'full'}
								isSecondary={width !== 'full'}
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
						<AdvancedViewportControl
							{...props}
							initial={{
								iPc: 600,
								iTablet: 600,
								iMobile: 600,
							}}
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
						<TextControl
							label={__('Display Time', 'vk-blocks')}
							value={autoPlayDelay}
							onChange={(value) =>
								setAttributes({
									autoPlayDelay: parseInt(value, 10),
								})
							}
							type={'number'}
						/>
					</BaseControl>
					<BaseControl
						label={__('Change Speed', 'vk-blocks')}
						id={`vk_slider-changeSpeed`}
					>
						<TextControl
							value={speed}
							onChange={(value) =>
								setAttributes({
									speed: parseInt(value, 10),
								})
							}
							type={'number'}
						/>
					</BaseControl>
					<BaseControl
						label={__('Display Pagination', 'vk-blocks')}
						id={`vk_slider-displayPagination`}
					>
						<AdvancedToggleControl
							initialFixedTable={pagination}
							schema={'pagination'}
							{...props}
						/>
					</BaseControl>
				</PanelBody>
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
				<div className="swiper-button-next"></div>
				<div className="swiper-button-prev"></div>
				{pagination && <div className="swiper-pagination"></div>}
			</div>
		</Fragment>
	);
}
