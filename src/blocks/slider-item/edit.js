/**
 * External dependencies
 */
import classnames from 'classnames';

/* eslint camelcase: 0 */
import { __ } from '@wordpress/i18n';
import { useEffect } from '@wordpress/element';
import {
	InspectorControls,
	BlockControls,
	BlockVerticalAlignmentToolbar,
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
import GenerateBgImage from './GenerateBgImage';
import { isHexColor } from '@vkblocks/utils/is-hex-color';
import { AdvancedColorPalette } from '@vkblocks/components/advanced-color-palette';
import { isParentReusableBlock } from '@vkblocks/utils/is-parent-reusable-block';

const prefix = 'vk_slider_item';

export default function SliderItemEdit(props) {
	const { attributes, setAttributes, clientId } = props;
	const {
		verticalAlignment,
		bgColor,
		opacity,
		padding_left_and_right,
		bgSize,
		bgImageMobile,
		bgImageTablet,
		bgImage,
		blockId,
	} = attributes;

	useEffect(() => {
		if (attributes.clientId !== undefined) {
			setAttributes({ clientId: undefined });
		}
		if (
			blockId === undefined ||
			isParentReusableBlock(clientId) === false
		) {
			setAttributes({ blockId: clientId });
		}
	}, [clientId]);

	//classPaddingLRのクラス切り替え
	let containerClass = `${prefix}_container`;
	let containerStyles = {};
	const classPaddingLR = '';
	switch (padding_left_and_right) {
		case '0':
			containerClass += ' container';
			break;
		case '1':
			containerStyles = { paddingLeft: '4em', paddingRight: '4em' };
			break;
		case '2':
			containerStyles = { paddingLeft: '0', paddingRight: '0' };
			break;
	}

	const opacityClass = opacity && opacity * 10;
	const bgAreaClasses = classnames('vk_slider_item-background-area', {
		[`has-background`]: bgColor !== undefined,
		[`has-${bgColor}-background-color`]:
			bgColor !== undefined && !isHexColor(bgColor),
		[`has-background-dim`]: opacity !== undefined,
		[`has-background-dim-${opacityClass}`]: opacityClass !== undefined,
	});

	const bgAreaStyles = {
		backgroundColor: isHexColor(bgColor) ? bgColor : undefined,
	};

	const GetBgImage = (
		<>
			{(bgImage || bgImageTablet || bgImageMobile) && (
				<GenerateBgImage prefix={prefix} blockId={blockId} {...props} />
			)}
			<div className={bgAreaClasses} style={bgAreaStyles}></div>
		</>
	);

	const blockProps = useBlockProps.save({
		className: `vk_slider_item swiper-slide vk_valign-${verticalAlignment} ${prefix}-${blockId} ${classPaddingLR} ${prefix}-paddingVertical-none`,
		style: containerStyles,
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
					title={__('Layout Setting', 'vk-blocks-pro')}
					initialOpen={true}
				>
					<BaseControl>
						<RadioControl
							label={__(
								'Padding (Left and Right)',
								'vk-blocks-pro'
							)}
							selected={padding_left_and_right}
							className={'vk-radioControl'}
							options={[
								{
									label: __(
										'Fit to the Container area',
										'vk-blocks-pro'
									),
									value: '0',
								},
								{
									label: __(
										'Add padding to the Slider area',
										'vk-blocks-pro'
									),
									value: '1',
								},
								{
									label: __(
										'Remove padding from the Slider area',
										'vk-blocks-pro'
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
						label={__('Vertical align', 'vk-blocks-pro')}
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
					title={__('Background Setting', 'vk-blocks-pro')}
					initialOpen={false}
				>
					<BaseControl
						label={__('Color Setting', 'vk-blocks-pro')}
						id={`vk_sliderItem-colorSetting`}
						help={__(
							'Color will overcome background image. If you want to display image, set opacity 0.',
							'vk-blocks-pro'
						)}
					>
						<AdvancedColorPalette
							enableAlpha={false}
							schema={'bgColor'}
							{...props}
						/>
					</BaseControl>
					<BaseControl
						label={__('Opacity Setting', 'vk-blocks-pro')}
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
						label={__('Background Image Size', 'vk-blocks-pro')}
						id={`vk_sliderItem-backgroundImageSize`}
					>
						<RadioControl
							selected={bgSize}
							options={[
								{
									label: __('cover', 'vk-blocks-pro'),
									value: 'cover',
								},
								{
									label: __('repeat', 'vk-blocks-pro'),
									value: 'repeat',
								},
							]}
							onChange={(value) =>
								setAttributes({ bgSize: value })
							}
						/>
					</BaseControl>
					<BaseControl
						label={__('Background Image PC', 'vk-blocks-pro')}
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
						label={__('Background Image Tablet', 'vk-blocks-pro')}
						className={'vk_slider_item_sidebar_bgImage'}
						id={`vk_sliderItem-backgroundImageTablet`}
					>
						<AdvancedMediaUpload
							schema={'bgImageTablet'}
							{...props}
						/>
					</BaseControl>
					<BaseControl
						label={__('Background Image Mobile', 'vk-blocks-pro')}
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
				{GetBgImage}
				<div className={containerClass}>
					<InnerBlocks
						templateLock={false}
						template={[['core/paragraph']]}
					/>
				</div>
			</div>
		</>
	);
}
