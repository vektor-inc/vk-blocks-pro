/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import toNumber from '@vkblocks/utils/to-number';
import { AdvancedMediaUpload } from '@vkblocks/components/advanced-media-upload';
import { componentDivider } from './component-divider';
import GenerateBgImage from './GenerateBgImage';
import { isHexColor } from '@vkblocks/utils/is-hex-color';
import { AdvancedColorPalette } from '@vkblocks/components/advanced-color-palette';
import LinkToolbar from '@vkblocks/components/link-toolbar';
const prefix = 'vkb-outer';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	RangeControl,
	RadioControl,
	PanelBody,
	BaseControl,
	SelectControl,
	ToggleControl,
	ToolbarGroup,
} from '@wordpress/components';
import {
	InspectorControls,
	InnerBlocks,
	useBlockProps,
	BlockControls,
	BlockAlignmentToolbar,
} from '@wordpress/block-editor';
import { useEffect } from '@wordpress/element';
import { isParentReusableBlock } from '@vkblocks/utils/is-parent-reusable-block';

export default function OuterEdit(props) {
	const { attributes, setAttributes, clientId } = props;
	const {
		bgColor,
		bgImage,
		bgImageTablet,
		bgImageMobile,
		bgPosition,
		outerWidth,
		padding_left_and_right, //eslint-disable-line camelcase
		padding_top_and_bottom, //eslint-disable-line camelcase
		opacity,
		levelSettingPerDevice,
		upper_level, //eslint-disable-line camelcase
		upper_level_mobile, //eslint-disable-line camelcase
		upper_level_tablet, //eslint-disable-line camelcase
		upper_level_pc, //eslint-disable-line camelcase
		lower_level, //eslint-disable-line camelcase
		lower_level_mobile, //eslint-disable-line camelcase
		lower_level_tablet, //eslint-disable-line camelcase
		lower_level_pc, //eslint-disable-line camelcase
		upperDividerBgColor,
		lowerDividerBgColor,
		dividerType,
		borderWidth,
		borderStyle,
		borderColor,
		borderRadius,
		innerSideSpaceValuePC,
		innerSideSpaceValueTablet,
		innerSideSpaceValueMobile,
		innerSideSpaceUnit,
		minHeightValuePC,
		minHeightValueTablet,
		minHeightValueMobile,
		minHeightUnit,
		blockId,
	} = attributes;

	let classPaddingLR;
	let classPaddingVertical;
	let classBgPosition;
	let whichSideUpper;
	let whichSideLower;

	const containerClass = 'vk_outer_container';

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
		// 互換処理 #1187
		if (borderStyle === 'none' && attributes.className) {
			// 追加CSSクラスを半角文字列で分けて配列化
			const nowClassArray = attributes.className.split(' ');
			// has-border-color,has-〇〇-border-colorクラスを削除する
			const newClassName = nowClassArray.filter((nowClassName) => {
				return !nowClassName.match(/has(.*)border-color/);
			});
			setAttributes({
				className: classnames(newClassName),
			});
		}
		// 前バージョンとの互換処理
		if (
			innerSideSpaceValuePC === undefined ||
			innerSideSpaceValuePC === null
		) {
			setAttributes({
				innerSideSpaceValuePC: 0,
			});
		}
		if (
			innerSideSpaceValueTablet === undefined ||
			innerSideSpaceValueTablet === null
		) {
			setAttributes({
				innerSideSpaceValueTablet: 0,
			});
		}
		if (
			innerSideSpaceValueMobile === undefined ||
			innerSideSpaceValueMobile === null
		) {
			setAttributes({
				innerSideSpaceValueTablet: 0,
			});
		}
		if (innerSideSpaceUnit === undefined || innerSideSpaceUnit === null) {
			setAttributes({
				innerSideSpaceUnit: 'px',
			});
		}
		// 互換処理：divider per device
		if (
			levelSettingPerDevice === undefined ||
			levelSettingPerDevice === null
		) {
			setAttributes({
				levelSettingPerDevice: false,
			});
		}
		if (upper_level_mobile === undefined || upper_level_mobile === null) {
			setAttributes({
				upper_level_mobile: upper_level,
			});
		}
		if (upper_level_tablet === undefined || upper_level_tablet === null) {
			setAttributes({
				upper_level_tablet: upper_level,
			});
		}
		if (upper_level_pc === undefined || upper_level_pc === null) {
			setAttributes({
				upper_level_pc: upper_level,
			});
		}
		if (lower_level_mobile === undefined || lower_level_mobile === null) {
			setAttributes({
				lower_level_mobile: lower_level,
			});
		}
		if (lower_level_tablet === undefined || lower_level_tablet === null) {
			setAttributes({
				lower_level_tablet: lower_level,
			});
		}
		if (lower_level_pc === undefined || lower_level_pc === null) {
			setAttributes({
				lower_level_pc: lower_level,
			});
		}
	}, [clientId]);

	const bgColorClasses = classnames({
		[`has-background`]: bgColor !== undefined,
		[`has-${bgColor}-background-color`]:
			bgColor !== undefined && !isHexColor(bgColor),
		[`has-background-dim`]: opacity !== undefined,
	});

	const bgColorStyles = {
		backgroundColor: isHexColor(bgColor) ? bgColor : undefined,
		opacity: opacity !== undefined ? opacity : undefined,
	};

	const GetBgImage = (
		<>
			{(bgImage || bgImageTablet || bgImageMobile) && (
				<GenerateBgImage prefix={prefix} blockId={blockId} {...props} />
			)}
			<span
				className={`vk_outer-background-area ${bgColorClasses}`}
				style={bgColorStyles}
			></span>
		</>
	);

	//幅のクラス切り替え
	// eslint-disable-next-line prefer-const
	const classWidth =
		outerWidth === 'full' || outerWidth === 'wide'
			? `vk_outer-width-${outerWidth} align${outerWidth}`
			: 'vk_outer-width-normal';

	//classBgPositionのクラス切り替え
	if (bgPosition === 'parallax') {
		classBgPosition = 'vk_outer-bgPosition-parallax vk-prlx';
	} else if (bgPosition === 'fixed') {
		classBgPosition = 'vk_outer-bgPosition-fixed';
	} else if (bgPosition === 'repeat') {
		classBgPosition = 'vk_outer-bgPosition-repeat';
	} else {
		classBgPosition = 'vk_outer-bgPosition-normal';
	}

	//classPaddingLRのクラス切り替え
	classPaddingLR = '';
	//eslint-disable-next-line camelcase
	if (padding_left_and_right === '0') {
		classPaddingLR = 'vk_outer-paddingLR-none';
		//eslint-disable-next-line camelcase
	} else if (padding_left_and_right === '1') {
		classPaddingLR = 'vk_outer-paddingLR-use';
		//eslint-disable-next-line camelcase
	} else if (padding_left_and_right === '2') {
		// Fit to content area width
		classPaddingLR = 'vk_outer-paddingLR-zero';
	}

	//classPaddingVerticalのクラス切り替
	//eslint-disable-next-line camelcase
	if (padding_top_and_bottom === '1') {
		classPaddingVertical = 'vk_outer-paddingVertical-use';
	} else {
		classPaddingVertical = 'vk_outer-paddingVertical-none';
	}

	//上側セクションの傾き切り替
	//eslint-disable-next-line camelcase
	if (!levelSettingPerDevice) {
		if (upper_level) {
			whichSideUpper = 'upper';
		}
	} else if (upper_level_mobile || upper_level_tablet || upper_level_pc) {
		whichSideUpper = 'upper';
	}

	//下側セクションの傾き切り替
	//eslint-disable-next-line camelcase
	if (!levelSettingPerDevice) {
		if (lower_level) {
			whichSideLower = 'lower';
		}
	} else if (lower_level_mobile || lower_level_tablet || lower_level_pc) {
		whichSideLower = 'lower';
	}
	//borderColorクリア時に白をセットする
	if (borderColor === null || borderColor === undefined) {
		setAttributes({ borderColor: '#fff' });
	}

	//Dividerエフェクトがない時のみ枠線を追
	let borderStyleProperty = {};

	if (!levelSettingPerDevice) {
		if (
			upper_level === 0 && //eslint-disable-line camelcase
			lower_level === 0 && //eslint-disable-line camelcase
			borderWidth > 0 &&
			borderStyle !== 'none'
		) {
			borderStyleProperty = {
				borderWidth: `${borderWidth}px`,
				borderStyle: `${borderStyle}`,
				borderColor:
					isHexColor(borderColor) && borderColor
						? borderColor
						: undefined,
				borderRadius: `${borderRadius}px`,
			};
			//eslint-disable-next-line camelcase
		} else if (upper_level !== 0 || lower_level !== 0) {
			//eslint-disable-line camelcase
			borderStyleProperty = {
				border: `none`,
				borderRadius: `0px`,
			};
		}
	} else if (
		upper_level_mobile === 0 && //eslint-disable-line camelcase
		upper_level_tablet === 0 && //eslint-disable-line camelcase
		upper_level_pc === 0 && //eslint-disable-line camelcase
		lower_level_mobile === 0 && //eslint-disable-line camelcase
		lower_level_tablet === 0 && //eslint-disable-line camelcase
		lower_level_pc === 0 && //eslint-disable-line camelcase
		borderWidth > 0 &&
		borderStyle !== 'none'
	) {
		borderStyleProperty = {
			borderWidth: `${borderWidth}px`,
			borderStyle: `${borderStyle}`,
			borderColor:
				isHexColor(borderColor) && borderColor
					? borderColor
					: undefined,
			borderRadius: `${borderRadius}px`,
		};
		//eslint-disable-next-line camelcase
	} else if (
		upper_level_mobile !== 0 ||
		upper_level_tablet !== 0 ||
		upper_level_pc !== 0 ||
		lower_level_mobile !== 0 ||
		lower_level_tablet !== 0 ||
		lower_level_pc !== 0
	) {
		//eslint-disable-line camelcase
		borderStyleProperty = {
			border: `none`,
			borderRadius: `0px`,
		};
	}

	const setAttributesByUnit = (key, value, unit, min, max) => {
		if ('px' === unit) {
			value = parseInt(value);
		}
		setAttributes({
			[key]: toNumber(value, min, max),
		});
	};

	const blockProps = useBlockProps({
		className: classnames(
			`vkb-outer-${blockId} vk_outer ${classWidth} ${classPaddingLR} ${classPaddingVertical} ${classBgPosition}`,
			{
				[`has-border-color`]:
					borderStyle !== 'none' && borderColor !== undefined,
				[`has-${borderColor}-border-color`]:
					borderStyle !== 'none' &&
					borderColor !== undefined &&
					!isHexColor(borderColor),
				[`vk_outer-minHeight`]:
					minHeightValuePC > 0 ||
					minHeightValueTablet > 0 ||
					minHeightValueMobile > 0,
			}
		),
		style: {
			...borderStyleProperty,
			'--min-height-mobile': minHeightValueMobile
				? `${minHeightValueMobile}${minHeightUnit}`
				: undefined,
			'--min-height-tablet': minHeightValueTablet
				? `${minHeightValueTablet}${minHeightUnit}`
				: undefined,
			'--min-height-pc': minHeightValuePC
				? `${minHeightValuePC}${minHeightUnit}`
				: undefined,
		},
	});

	// minHeightUnit に基づいて動的に最大値を設定
	const getMaxHeight = (unit) => {
		switch (unit) {
			case 'px':
				return 1000;
			case 'em':
			case 'rem':
				return 500;
			case 'vh':
			case 'svh':
			case 'lvh':
			case 'dvh':
				return 100;
			default:
				return 500;
		}
	};

	const handleUnitChange = (newUnit) => {
		const newMax = getMaxHeight(newUnit);
		setAttributes({
			minHeightUnit: newUnit,
			minHeightValuePC: Math.min(minHeightValuePC, newMax),
			minHeightValueTablet: Math.min(minHeightValueTablet, newMax),
			minHeightValueMobile: Math.min(minHeightValueMobile, newMax),
		});
	};

	return (
		<>
			<BlockControls>
				<BlockAlignmentToolbar
					value={outerWidth}
					onChange={(nextWidth) =>
						setAttributes({ outerWidth: nextWidth })
					}
					controls={['full']}
				/>
				<ToolbarGroup>
					<LinkToolbar
						linkUrl={attributes.linkUrl}
						setLinkUrl={(url) => setAttributes({ linkUrl: url })}
						linkTarget={attributes.linkTarget}
						setLinkTarget={(target) =>
							setAttributes({ linkTarget: target })
						}
						linkDescription={attributes.linkDescription}
						setLinkDescription={(desc) =>
							setAttributes({ linkDescription: desc })
						}
						relAttribute={attributes.relAttribute}
						setAttributes={setAttributes}
					/>
				</ToolbarGroup>
			</BlockControls>
			<InspectorControls>
				<PanelBody
					title={__('Background Setting', 'vk-blocks-pro')}
					initialOpen={false}
				>
					<BaseControl
						id={`vk_outer-colorSetting`}
						label={__('Color Setting', 'vk-blocks-pro')}
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
						id={`vk_outer-opacitySetting`}
					>
						<RangeControl
							value={opacity}
							onChange={(value) => {
								setAttributes({ opacity: value });
							}}
							min={0}
							max={1}
							step={0.01}
						/>
					</BaseControl>
					<BaseControl
						label={__('Background Image PC', 'vk-blocks-pro')}
						className={'vk_outer_sidebar_bgImage'}
						id={`vk_outer-bgImagePC`}
					>
						<div
							className={
								'vk_outer_sidebar_bgImage_button_container'
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
						className={'vk_outer_sidebar_bgImage'}
						id={`vk_outer-bgImageTablet`}
					>
						<AdvancedMediaUpload
							schema={'bgImageTablet'}
							{...props}
						/>
					</BaseControl>
					<BaseControl
						label={__('Background Image Mobile', 'vk-blocks-pro')}
						className={'vk_outer_sidebar_bgImage'}
						id={`vk_outer-bgImageMobile`}
					>
						<AdvancedMediaUpload
							schema={'bgImageMobile'}
							{...props}
						/>
					</BaseControl>
					<BaseControl
						label={__('Background image Position', 'vk-blocks-pro')}
						help=""
						id={`vk_outer-bgPosition`}
					>
						<RadioControl
							selected={bgPosition}
							options={[
								{
									label: __('Repeat', 'vk-blocks-pro'),
									value: 'repeat',
								},
								{
									label: __('Cover', 'vk-blocks-pro'),
									value: 'normal',
								},
								{
									label: __(
										'Cover fixed (Not fixed on iPhone)',
										'vk-blocks-pro'
									),
									value: 'fixed',
								},
								{
									label: __(
										'Parallax (Non-guaranteed)',
										'vk-blocks-pro'
									),
									value: 'parallax',
								},
							]}
							onChange={(value) =>
								setAttributes({ bgPosition: value })
							}
						/>
					</BaseControl>
				</PanelBody>

				<PanelBody
					title={__('Layout Setting', 'vk-blocks-pro')}
					initialOpen={false}
				>
					<p>{__('Width', 'vk-blocks-pro')} </p>
					<BaseControl>
						<RadioControl
							label={__(
								'Padding (Left and Right)',
								'vk-blocks-pro'
							)}
							selected={padding_left_and_right} //eslint-disable-line camelcase
							options={[
								{
									label: __(
										'Fit to the Content area',
										'vk-blocks-pro'
									),
									value: '0',
								},
								{
									label: __(
										'Add padding to the Outer area',
										'vk-blocks-pro'
									),
									value: '1',
								},
								{
									label: __(
										'Remove padding from the Outer area',
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
						<RadioControl
							label={__(
								'Padding (Top and Bottom)',
								'vk-blocks-pro'
							)}
							className={'mb-1'}
							selected={padding_top_and_bottom} //eslint-disable-line camelcase
							options={[
								{
									label: __(
										'Use default padding',
										'vk-blocks-pro'
									),
									value: '1',
								},
								{
									label: __(
										'Do not use default padding',
										'vk-blocks-pro'
									),
									value: '0',
								},
							]}
							onChange={(value) =>
								setAttributes({
									padding_top_and_bottom: value,
								})
							}
						/>
						<p>
							{__(
								'* If you select "Do not use" that, please set yourself it such as a spacer block.',
								'vk-blocks-pro'
							)}
						</p>
					</BaseControl>
				</PanelBody>
				<PanelBody
					title={__('Divider Setting', 'vk-blocks-pro')}
					initialOpen={false}
				>
					<BaseControl>
						<SelectControl
							label={__('Type', 'vk-blocks-pro')}
							value={dividerType}
							onChange={(value) =>
								setAttributes({ dividerType: value })
							}
							options={[
								{
									value: 'tilt',
									label: __('Tilt', 'vk-blocks-pro'),
								},
								{
									value: 'curve',
									label: __('Curve', 'vk-blocks-pro'),
								},
								{
									value: 'wave',
									label: __('Wave', 'vk-blocks-pro'),
								},
								{
									value: 'triangle',
									label: __('Triangle', 'vk-blocks-pro'),
								},
								{
									value: 'largeTriangle',
									label: __(
										'Large triangle',
										'vk-blocks-pro'
									),
								},
								{
									value: 'serrated',
									label: __('Serrated', 'vk-blocks-pro'),
								},
							]}
						/>
					</BaseControl>
					<BaseControl>
						<ToggleControl
							label={__(
								'Settings for each device',
								'vk-blocks-pro'
							)}
							checked={levelSettingPerDevice}
							onChange={(checked) =>
								setAttributes({
									levelSettingPerDevice: checked,
								})
							}
						/>
					</BaseControl>
					<BaseControl
						label={__('Upper Divider Level', 'vk-blocks-pro')}
						id={`vk_outer-upperDividerLevel`}
					>
						{!levelSettingPerDevice ? (
							<RangeControl
								value={upper_level} //eslint-disable-line camelcase
								onChange={(value) => {
									setAttributes({
										upper_level: toNumber(value, -100, 100),
									});
									if (
										upper_level_pc === upper_level_tablet &&
										upper_level_tablet ===
											upper_level_mobile
									) {
										setAttributes({
											upper_level_pc: value,
											upper_level_tablet: value,
											upper_level_mobile: value,
										});
									}
								}}
								min="-100"
								max="100"
							/>
						) : (
							<>
								<RangeControl
									label={__('Mobile', 'vk-blocks-pro')}
									value={upper_level_mobile} //eslint-disable-line camelcase
									onChange={(value) =>
										setAttributes({
											upper_level_mobile: toNumber(
												value,
												-100,
												100
											),
										})
									}
									min="-100"
									max="100"
								/>
								<RangeControl
									label={__('Tablet', 'vk-blocks-pro')}
									value={upper_level_tablet} //eslint-disable-line camelcase
									onChange={(value) =>
										setAttributes({
											upper_level_tablet: toNumber(
												value,
												-100,
												100
											),
										})
									}
									min="-100"
									max="100"
								/>
								<RangeControl
									label={__('PC', 'vk-blocks-pro')}
									value={upper_level_pc} //eslint-disable-line camelcase
									onChange={(value) =>
										setAttributes({
											upper_level_pc: toNumber(
												value,
												-100,
												100
											),
										})
									}
									min="-100"
									max="100"
								/>
							</>
						)}
					</BaseControl>
					<BaseControl>
						<AdvancedColorPalette
							schema={'upperDividerBgColor'}
							{...props}
						/>
					</BaseControl>
					<BaseControl
						label={__('Lower Divider Level', 'vk-blocks-pro')}
						id={`vk_outer-lowerDividerLevel`}
					>
						{!levelSettingPerDevice ? (
							<RangeControl
								value={lower_level} //eslint-disable-line camelcase
								onChange={(value) => {
									setAttributes({
										lower_level: toNumber(value, -100, 100),
									});
									if (
										lower_level_pc === lower_level_tablet &&
										lower_level_tablet ===
											lower_level_mobile
									) {
										setAttributes({
											lower_level_pc: value,
											lower_level_tablet: value,
											lower_level_mobile: value,
										});
									}
								}}
								min="-100"
								max="100"
							/>
						) : (
							<>
								<RangeControl
									label={__('Mobile', 'vk-blocks-pro')}
									value={lower_level_mobile} //eslint-disable-line camelcase
									onChange={(value) =>
										setAttributes({
											lower_level_mobile: toNumber(
												value,
												-100,
												100
											),
										})
									}
									min="-100"
									max="100"
								/>
								<RangeControl
									label={__('Tablet', 'vk-blocks-pro')}
									value={lower_level_tablet} //eslint-disable-line camelcase
									onChange={(value) =>
										setAttributes({
											lower_level_tablet: toNumber(
												value,
												-100,
												100
											),
										})
									}
									min="-100"
									max="100"
								/>
								<RangeControl
									label={__('PC', 'vk-blocks-pro')}
									value={lower_level_pc} //eslint-disable-line camelcase
									onChange={(value) =>
										setAttributes({
											lower_level_pc: toNumber(
												value,
												-100,
												100
											),
										})
									}
									min="-100"
									max="100"
								/>
							</>
						)}
					</BaseControl>
					<BaseControl>
						<AdvancedColorPalette
							schema={'lowerDividerBgColor'}
							{...props}
						/>
					</BaseControl>
				</PanelBody>
				<PanelBody
					title={__('Border Setting', 'vk-blocks-pro')}
					initialOpen={false}
				>
					<BaseControl>
						<p>
							{__(
								'Border will disappear when divider effect is applied.',
								'vk-blocks-pro'
							)}
						</p>
						<SelectControl
							label={__('Border type', 'vk-blocks-pro')}
							value={borderStyle}
							onChange={(value) =>
								setAttributes({ borderStyle: value })
							}
							options={[
								{
									value: 'none',
									label: __('None', 'vk-blocks-pro'),
								},
								{
									value: 'solid',
									label: __('Solid', 'vk-blocks-pro'),
								},
								{
									value: 'dotted',
									label: __('Dotted', 'vk-blocks-pro'),
								},
								{
									value: 'dashed',
									label: __('Dashed', 'vk-blocks-pro'),
								},
								{
									value: 'double',
									label: __('Double', 'vk-blocks-pro'),
								},
								{
									value: 'groove',
									label: __('Groove', 'vk-blocks-pro'),
								},
								{
									value: 'ridge',
									label: __('Ridge', 'vk-blocks-pro'),
								},
								{
									value: 'inset',
									label: __('Inset', 'vk-blocks-pro'),
								},
								{
									value: 'outset',
									label: __('Outset', 'vk-blocks-pro'),
								},
							]}
						/>
					</BaseControl>
					<BaseControl>
						<AdvancedColorPalette
							schema={'borderColor'}
							{...props}
						/>
					</BaseControl>
					<BaseControl
						label={__('Border width', 'vk-blocks-pro')}
						id={`vk_outer-borderWidth`}
					>
						<RangeControl
							value={borderWidth}
							onChange={(value) =>
								setAttributes({ borderWidth: value })
							}
							min="0"
						/>
					</BaseControl>
					<BaseControl
						label={__('Border radius', 'vk-blocks-pro')}
						id={`vk_outer-borderRadius`}
					>
						<RangeControl
							value={borderRadius}
							onChange={(value) =>
								setAttributes({
									borderRadius: toNumber(value, 0, 100),
								})
							}
							min="0"
							max="100"
						/>
					</BaseControl>
				</PanelBody>
				<PanelBody
					title={__(
						'Container Inner Side Space Setting',
						'vk-blocks-pro'
					)}
					initialOpen={false}
				>
					<RangeControl
						label={__('Mobile', 'vk-blocks-pro')}
						value={innerSideSpaceValueMobile}
						onChange={(value) =>
							setAttributesByUnit(
								'innerSideSpaceValueMobile',
								value,
								innerSideSpaceUnit,
								0,
								100
							)
						}
						min="0"
						max="100"
						step={'px' === innerSideSpaceUnit ? 1 : 0.1}
					/>
					<RangeControl
						label={__('Tablet', 'vk-blocks-pro')}
						value={innerSideSpaceValueTablet}
						onChange={(value) =>
							setAttributesByUnit(
								'innerSideSpaceValueTablet',
								value,
								innerSideSpaceUnit,
								0,
								200
							)
						}
						min="0"
						max="200"
						step={'px' === innerSideSpaceUnit ? 1 : 0.1}
					/>
					<RangeControl
						label={__('PC', 'vk-blocks-pro')}
						value={innerSideSpaceValuePC}
						onChange={(value) =>
							setAttributesByUnit(
								'innerSideSpaceValuePC',
								value,
								innerSideSpaceUnit,
								0,
								300
							)
						}
						min="0"
						max="300"
						step={'px' === innerSideSpaceUnit ? 1 : 0.1}
					/>
					<SelectControl
						label={__('Unit Type', 'vk-blocks-pro')}
						value={innerSideSpaceUnit}
						onChange={(value) => {
							setAttributes({
								innerSideSpaceValueMobile: parseInt(
									innerSideSpaceValueMobile
								),
							});
							setAttributes({
								innerSideSpaceValueTablet: parseInt(
									innerSideSpaceValueTablet
								),
							});
							setAttributes({
								innerSideSpaceValuePC: parseInt(
									innerSideSpaceValuePC
								),
							});
							setAttributes({
								innerSideSpaceUnit: value,
							});
						}}
						options={[
							{
								value: 'px',
								label: __('px', 'vk-blocks-pro'),
							},
							{
								value: 'em',
								label: __('em', 'vk-blocks-pro'),
							},
							{
								value: 'rem',
								label: __('rem', 'vk-blocks-pro'),
							},
							{
								value: 'vw',
								label: __('vw', 'vk-blocks-pro'),
							},
						]}
					/>
				</PanelBody>
				<PanelBody
					title={__('Min Height Setting', 'vk-blocks-pro')}
					initialOpen={false}
				>
					<RangeControl
						label={__('Mobile', 'vk-blocks-pro')}
						value={minHeightValueMobile}
						onChange={(value) =>
							setAttributesByUnit(
								'minHeightValueMobile',
								value,
								minHeightUnit,
								0,
								getMaxHeight(minHeightUnit)
							)
						}
						min="0"
						max={getMaxHeight(minHeightUnit)}
						step={'px' === minHeightUnit ? 1 : 0.1}
					/>
					<RangeControl
						label={__('Tablet', 'vk-blocks-pro')}
						value={minHeightValueTablet}
						onChange={(value) =>
							setAttributesByUnit(
								'minHeightValueTablet',
								value,
								minHeightUnit,
								0,
								getMaxHeight(minHeightUnit)
							)
						}
						min="0"
						max={getMaxHeight(minHeightUnit)}
						step={'px' === minHeightUnit ? 1 : 0.1}
					/>
					<RangeControl
						label={__('PC', 'vk-blocks-pro')}
						value={minHeightValuePC}
						onChange={(value) =>
							setAttributesByUnit(
								'minHeightValuePC',
								value,
								minHeightUnit,
								0,
								getMaxHeight(minHeightUnit)
							)
						}
						min="0"
						max={getMaxHeight(minHeightUnit)}
						step={'px' === minHeightUnit ? 1 : 0.1}
					/>
					<SelectControl
						label={__('Unit Type', 'vk-blocks-pro')}
						value={minHeightUnit}
						onChange={handleUnitChange}
						options={[
							{
								value: 'px',
								label: __('px', 'vk-blocks-pro'),
							},
							{
								value: 'em',
								label: __('em', 'vk-blocks-pro'),
							},
							{
								value: 'rem',
								label: __('rem', 'vk-blocks-pro'),
							},
							{
								value: 'vh',
								label: __('vh', 'vk-blocks-pro'),
							},
							{
								value: 'svh',
								label: __('svh', 'vk-blocks-pro'),
							},
							{
								value: 'lvh',
								label: __('lvh', 'vk-blocks-pro'),
							},
							{
								value: 'dvh',
								label: __('dvh', 'vk-blocks-pro'),
							},
						]}
					/>
				</PanelBody>
			</InspectorControls>
			<div {...blockProps}>
				{GetBgImage}
				<div>
					{componentDivider(
						upper_level,
						upperDividerBgColor,
						whichSideUpper,
						dividerType,
						levelSettingPerDevice,
						upper_level_mobile,
						upper_level_tablet,
						upper_level_pc
					)}
					<div className={containerClass}>
						<InnerBlocks />
					</div>
					{componentDivider(
						lower_level,
						lowerDividerBgColor,
						whichSideLower,
						dividerType,
						levelSettingPerDevice,
						lower_level_mobile,
						lower_level_tablet,
						lower_level_pc
					)}
				</div>
			</div>
		</>
	);
}
