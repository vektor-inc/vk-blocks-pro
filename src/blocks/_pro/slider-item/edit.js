/* eslint camelcase: 0 */
import { __ } from '@wordpress/i18n';
import { useEffect } from '@wordpress/element';
import {
	InspectorControls,
	BlockControls,
	BlockVerticalAlignmentToolbar,
	ColorPalette,
	InnerBlocks,
	useBlockProps,
} from '@wordpress/block-editor';
import {
	RangeControl,
	RadioControl,
	PanelBody,
	BaseControl,
} from '@wordpress/components';
import { AdvancedMediaUpload } from '@vkblocks/components/advanced-media-upload';
import GenerateBgImage from '@vkblocks/utils/GenerateBgImage';
const prefix = 'vk_slider_item';

export default function SliderItemEdit(props) {
	const { attributes, setAttributes, clientId } = props;
	const {
		verticalAlignment,
		bgColor,
		opacity,
		padding_left_and_right,
		bgSize,
	} = attributes;

	useEffect(() => {
		setAttributes({ clientId });
	}, [clientId]);

	//classPaddingLRのクラス切り替え
	let classPaddingLR = '';
	if (padding_left_and_right === '0') {
		classPaddingLR = ` ${prefix}-paddingLR-none`;
	} else if (padding_left_and_right === '1') {
		classPaddingLR = ` ${prefix}-paddingLR-use`;
	} else if (padding_left_and_right === '2') {
		// Fit to content area width
		classPaddingLR = ` ${prefix}-paddingLR-zero`;
	}

	let containerClass = '';
	if (
		classPaddingLR === ` ${prefix}-paddingLR-none` ||
		classPaddingLR === ''
	) {
		containerClass = `${prefix}_container container`;
	} else {
		containerClass = `${prefix}_container`;
	}

	const blockProps = useBlockProps({
		className: `vk_slider_item swiper-slide vk_valign-${verticalAlignment} ${prefix}-${clientId} ${classPaddingLR} ${prefix}-paddingVertical-none`,
	});

	return (
		<>
			<BlockControls>
				<BlockVerticalAlignmentToolbar
					onChange={(alignment) =>
						setAttributes({ verticalAlignment: alignment })
					}
					value={verticalAlignment}
				/>
			</BlockControls>
			<InspectorControls>
				<PanelBody
					title={__('Layout Setting', 'vk-blocks')}
					initialOpen={true}
				>
					<BaseControl>
						<RadioControl
							label={__('Padding (Left and Right)', 'vk-blocks')}
							selected={padding_left_and_right}
							options={[
								{
									label: __(
										'Fit to the Container area',
										'vk-blocks'
									),
									value: '0',
								},
								{
									label: __(
										'Add padding to the Slider area',
										'vk-blocks'
									),
									value: '1',
								},
								{
									label: __(
										'Remove padding from the Slider area',
										'vk-blocks'
									),
									value: '2',
								},
							]}
							onChange={(value) =>
								setAttributes({
									padding_left_and_right: value,
								})
							}
						/>
					</BaseControl>
					<BaseControl
						label={__('Vertical align', 'vk-blocks')}
						id={`vk_sliderItem-verticalAlign`}
					>
						<BlockVerticalAlignmentToolbar
							onChange={(alignment) =>
								setAttributes({
									verticalAlignment: alignment,
								})
							}
							value={verticalAlignment}
						/>
					</BaseControl>
				</PanelBody>
				<PanelBody
					title={__('Background Setting', 'vk-blocks')}
					initialOpen={false}
				>
					<BaseControl
						label={__('Color Setting', 'vk-blocks')}
						id={`vk_sliderItem-colorSetting`}
						help={__(
							'Color will overcome background image. If you want to display image, clear background color or set opacity 0.',
							'vk-blocks'
						)}
					>
						<ColorPalette
							value={bgColor}
							onChange={(value) =>
								setAttributes({ bgColor: value })
							}
						/>
					</BaseControl>
					<BaseControl
						label={__('Opacity Setting', 'vk-blocks')}
						id={`vk_sliderItem-opacitySetting`}
					>
						<RangeControl
							value={opacity}
							onChange={(value) => {
								setAttributes({ opacity: value });
							}}
							min={0}
							max={1}
							step={0.1}
						/>
					</BaseControl>
					<BaseControl
						label={__('Background Image Size', 'vk-blocks')}
						id={`vk_sliderItem-backgroundImageSize`}
					>
						<RadioControl
							selected={bgSize}
							options={[
								{
									label: __('cover', 'vk-blocks'),
									value: 'cover',
								},
								{
									label: __('repeat', 'vk-blocks'),
									value: 'repeat',
								},
							]}
							onChange={(value) =>
								setAttributes({ bgSize: value })
							}
						/>
					</BaseControl>
					<BaseControl
						label={__('Background Image PC', 'vk-blocks')}
						id={`vk_sliderItem-backgroundImagePC`}
						className={'vk_slider_item_sidebar_bgImage'}
					>
						<div
							className={
								'vk_slider_item_sidebar_bgImage_button_container'
							}
						>
							<AdvancedMediaUpload
								schema={'bgImage'}
								{...props}
							/>
						</div>
					</BaseControl>
					<BaseControl
						label={__('Background Image Tablet', 'vk-blocks')}
						className={'vk_slider_item_sidebar_bgImage'}
						id={`vk_sliderItem-backgroundImageTablet`}
					>
						<AdvancedMediaUpload
							schema={'bgImageTablet'}
							{...props}
						/>
					</BaseControl>
					<BaseControl
						label={__('Background Image Mobile', 'vk-blocks')}
						className={'vk_slider_item_sidebar_bgImage'}
						id={`vk_sliderItem-backgroundImageMobile`}
					>
						<AdvancedMediaUpload
							schema={'bgImageMobile'}
							{...props}
						/>
					</BaseControl>
				</PanelBody>
			</InspectorControls>
			<div {...blockProps}>
				<GenerateBgImage
					prefix={prefix}
					clientId={clientId}
					{...props}
				/>
				<div className={containerClass}>
					<InnerBlocks />
				</div>
			</div>
		</>
	);
}
