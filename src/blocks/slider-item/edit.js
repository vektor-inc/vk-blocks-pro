/**
 * External dependencies
 */
import classnames from 'classnames';

/* eslint camelcase: 0 */
import { __ } from '@wordpress/i18n';
import { useEffect } from '@wordpress/element';
import { select } from '@wordpress/data';
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
	ToolbarGroup,
} from '@wordpress/components';
import { AdvancedMediaUpload } from '@vkblocks/components/advanced-media-upload';
import GenerateBgImage from './GenerateBgImage';
import { isHexColor } from '@vkblocks/utils/is-hex-color';
import { AdvancedColorPalette } from '@vkblocks/components/advanced-color-palette';
import { isParentReusableBlock } from '@vkblocks/utils/is-parent-reusable-block';
import LinkToolbar from '@vkblocks/components/link-toolbar';

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
		linkUrl,
		linkTarget,
		relAttribute,
		linkDescription,
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

	useEffect(() => {
		let isMounted = true;

		async function updateBgImageId(imageUrl, idAttributeName) {
			if (!imageUrl || attributes[idAttributeName]) {
				return;
			}

			// 取得試行回数
			let attempts = 0;
			const maxAttempts = 10;

			while (attempts < maxAttempts && isMounted) {
				const media = select('core').getEntityRecords(
					'postType',
					'attachment',
					{ per_page: -1 }
				);

				if (media && media.length > 0) {
					const mediaItem = media.find(
						(item) => item.source_url === imageUrl
					);
					if (mediaItem && mediaItem.id) {
						setAttributes({ [idAttributeName]: mediaItem.id });
						break;
					}
				}

				attempts++;
				await new Promise((resolve) => setTimeout(resolve, 500));
			}
		}

		updateBgImageId(attributes.bgImage, 'bgImageId');
		updateBgImageId(attributes.bgImageTablet, 'bgImageTabletId');
		updateBgImageId(attributes.bgImageMobile, 'bgImageMobileId');

		return () => {
			isMounted = false;
		};
	}, [
		attributes.bgImage,
		attributes.bgImageTablet,
		attributes.bgImageMobile,
	]);

	// classPaddingLRのクラス切り替え
	let classPaddingLR = '';
	let paddingValue = '';

	if (padding_left_and_right === '0' || !padding_left_and_right) {
		classPaddingLR = ` is-layout-constrained`;
		paddingValue = '0';
	} else if (padding_left_and_right === '1') {
		classPaddingLR = ` ${prefix}-paddingLR-use`;
		paddingValue = '4em';
	} else if (padding_left_and_right === '2') {
		classPaddingLR = ` ${prefix}-paddingLR-zero`;
		paddingValue = '0';
	}

	// コアの余白システムに値を適用
	useEffect(() => {
		const currentLeftPadding = attributes?.style?.spacing?.padding?.left;
		const currentRightPadding = attributes?.style?.spacing?.padding?.right;

		if (
			paddingValue !== currentLeftPadding ||
			paddingValue !== currentRightPadding
		) {
			setAttributes((prevAttrs) => ({
				...prevAttrs,
				style: {
					...prevAttrs.style,
					spacing: {
						...prevAttrs.style?.spacing,
						padding: {
							left: paddingValue,
							right: paddingValue,
						},
					},
				},
			}));
		}
	}, [paddingValue, attributes?.style?.spacing?.padding]);

	let containerClass = '';
	if (classPaddingLR === ` is-layout-constrained` || classPaddingLR === '') {
		containerClass = `${prefix}_container container`;
	} else {
		containerClass = `${prefix}_container`;
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
		paddingLeft: paddingValue,
		paddingRight: paddingValue,
	};

	const GetBgImage = (
		<>
			{(bgImage || bgImageTablet || bgImageMobile) && (
				<GenerateBgImage prefix={prefix} blockId={blockId} {...props} />
			)}
			<div className={bgAreaClasses} style={bgAreaStyles}></div>
		</>
	);

	const blockProps = useBlockProps({
		className: `vk_slider_item vk_valign-${verticalAlignment} ${prefix}-${blockId} ${classPaddingLR} ${prefix}-paddingVertical-none swiper-slide`,
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
				<ToolbarGroup>
					<LinkToolbar
						linkUrl={linkUrl}
						setLinkUrl={(url) => setAttributes({ linkUrl: url })}
						linkTarget={linkTarget}
						setLinkTarget={(target) =>
							setAttributes({ linkTarget: target })
						}
						relAttribute={relAttribute}
						setRelAttribute={(rel) =>
							setAttributes({ relAttribute: rel })
						}
						linkDescription={linkDescription}
						setLinkDescription={(description) =>
							setAttributes({ linkDescription: description })
						}
					/>
				</ToolbarGroup>
			</BlockControls>
			<InspectorControls>
				<PanelBody
					title={__('Layout Setting', 'vk-blocks-pro')}
					initialOpen={true}
				>
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
								schemaId={'bgImageId'}
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
							schemaId={'bgImageTabletId'}
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
							schemaId={'bgImageMobileId'}
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
