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
import { sanitizeSlug } from '@vkblocks/utils/sanitizeSlug';
import { AdvancedColorPalette } from '@vkblocks/components/advanced-color-palette';
import LinkToolbar from '@vkblocks/components/link-toolbar';
import ResponsiveSizeControl, {
	getMaxByUnit,
} from '@vkblocks/components/responsive-size-control';
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
	FocalPointPicker,
	__experimentalToggleGroupControl as ToggleGroupControl,
	__experimentalToggleGroupControlOption as ToggleGroupControlOption,
} from '@wordpress/components';
import {
	InspectorControls,
	InnerBlocks,
	useBlockProps,
	BlockControls,
	BlockAlignmentToolbar,
} from '@wordpress/block-editor';
import { useEffect, useRef } from '@wordpress/element';
import { select } from '@wordpress/data';
import { isParentReusableBlock } from '@vkblocks/utils/is-parent-reusable-block';

export default function OuterEdit(props) {
	const { attributes, setAttributes, clientId } = props;
	const {
		bgColor,
		bgImage,
		bgImageTablet,
		bgImageMobile,
		bgPosition,
		bgPositionType,
		bgFocalPointPC,
		bgFocalPointTablet,
		bgFocalPointMobile,
		enableFocalPointPC,
		enableFocalPointTablet,
		enableFocalPointMobile,
		bgOffsetTop,
		bgOffsetBottom,
		bgOffsetLeft,
		bgOffsetRight,
		bgOffsetUnit,
		bgOffsetDisableMobile,
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
		linkUrl,
		linkTarget,
		relAttribute,
		linkDescription,
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
		// 背景オフセットの互換処理
		if (bgOffsetTop === undefined) {
			setAttributes({ bgOffsetTop: 0 });
		}
		if (bgOffsetBottom === undefined) {
			setAttributes({ bgOffsetBottom: 0 });
		}
		if (bgOffsetLeft === undefined) {
			setAttributes({ bgOffsetLeft: 0 });
		}
		if (bgOffsetRight === undefined) {
			setAttributes({ bgOffsetRight: 0 });
		}
		if (bgOffsetUnit === undefined) {
			setAttributes({ bgOffsetUnit: 'px' });
		}
		if (bgOffsetDisableMobile === undefined) {
			setAttributes({ bgOffsetDisableMobile: false });
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

	// 既存ブロックの bgImage, bgImageTablet, bgImageMobile の ID を自動補完
	useEffect(() => {
		let isMounted = true;

		const updateBgImageId = async (imageUrl, idAttributeName) => {
			if (!imageUrl || attributes[idAttributeName]) {
				return;
			}

			for (let attempts = 0; attempts < 10 && isMounted; attempts++) {
				const media = select('core').getEntityRecords(
					'postType',
					'attachment',
					{ per_page: -1 }
				);
				const mediaItem = media?.find(
					(item) => item.source_url === imageUrl
				);

				if (mediaItem?.id) {
					setAttributes({ [idAttributeName]: mediaItem.id });
					return;
				}

				await new Promise((resolve) => setTimeout(resolve, 500));
			}
		};

		['bgImage', 'bgImageTablet', 'bgImageMobile'].forEach((attr) =>
			updateBgImageId(attributes[attr], `${attr}Id`)
		);

		return () => {
			isMounted = false;
		};
	}, [
		attributes.bgImage,
		attributes.bgImageTablet,
		attributes.bgImageMobile,
	]);

	const bgColorClasses = classnames({
		[`has-background`]: bgColor !== undefined,
		[`has-${sanitizeSlug(bgColor)}-background-color`]:
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

	// オフセットが設定されているかどうかをチェック
	const hasBackgroundOffset =
		bgOffsetTop !== 0 ||
		bgOffsetBottom !== 0 ||
		bgOffsetLeft !== 0 ||
		bgOffsetRight !== 0;

	//classBgPositionのクラス切り替え
	if (!hasBackgroundOffset) {
		if (bgPosition === 'parallax') {
			classBgPosition = 'vk_outer-bgPosition-parallax vk-prlx';
		} else if (bgPosition === 'fixed') {
			classBgPosition = 'vk_outer-bgPosition-fixed';
		} else if (bgPosition === 'repeat') {
			classBgPosition = 'vk_outer-bgPosition-repeat';
		} else {
			classBgPosition = 'vk_outer-bgPosition-normal';
		}
	} else {
		classBgPosition = '';
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

	//Dividerエフェクトがない時のみ枠線を追加
	let borderStyleProperty = {};

	// オフセットが設定されている場合は、BorderとDividerの設定を無効化
	if (hasBackgroundOffset) {
		borderStyleProperty = {
			border: 'none',
			borderRadius: '0px',
		};
	} else if (!levelSettingPerDevice) {
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

	// useRefの定義
	const blockRef = useRef(null);
	const defaultFocalPoint = { x: 0.5, y: 0.5 };

	// フォーカルポイントを背景位置に変換する関数
	const coordsToBackgroundPosition = (value) => {
		if (!value || (isNaN(value.x) && isNaN(value.y))) {
			return '50% 50%';
		}

		const x = isNaN(value.x) ? 0.5 : value.x;
		const y = isNaN(value.y) ? 0.5 : value.y;

		return `${x * 100}% ${y * 100}%`;
	};

	const onChangeBgFocalPoint = (value, device) => {
		const imageForDevice = {
			PC: bgImage,
			Tablet: bgImageTablet || bgImage,
			Mobile: bgImageMobile || bgImageTablet || bgImage,
		}[device];

		if (!imageForDevice) {
			value = { x: 0.5, y: 0.5 };
		}

		if (blockRef.current) {
			updateBackgroundPosition(value);
		}

		setAttributes({ [`bgFocalPoint${device}`]: value });
	};

	// 背景位置をリアルタイムで更新する関数
	const updateBackgroundPosition = (value) => {
		if (blockRef.current) {
			blockRef.current.style.backgroundPosition =
				coordsToBackgroundPosition(value);
		}
	};

	useEffect(() => {
		if (blockRef.current) {
			// デバイスごとに背景位置を更新
			['PC', 'Tablet', 'Mobile'].forEach((device) => {
				const focalPoint = attributes[`bgFocalPoint${device}`];
				const backgroundPosition =
					coordsToBackgroundPosition(focalPoint);
				blockRef.current.style.setProperty(
					`--bg-position-${device.toLowerCase()}`,
					backgroundPosition
				);
				updateBackgroundPosition(focalPoint);
			});
		}
	}, [bgFocalPointPC, bgFocalPointTablet, bgFocalPointMobile]);

	useEffect(() => {
		// bgFocalPointPCが未定義または不正な値の場合にデフォルト値を設定
		if (
			!bgFocalPointPC ||
			bgFocalPointPC.x === undefined ||
			bgFocalPointPC.y === undefined
		) {
			setAttributes({ bgFocalPointPC: { x: 0.5, y: 0.5 } });
		}
		if (
			!bgFocalPointTablet ||
			bgFocalPointTablet.x === undefined ||
			bgFocalPointTablet.y === undefined
		) {
			setAttributes({ bgFocalPointTablet: { x: 0.5, y: 0.5 } });
		}
		if (
			!bgFocalPointMobile ||
			bgFocalPointMobile.x === undefined ||
			bgFocalPointMobile.y === undefined
		) {
			setAttributes({ bgFocalPointMobile: { x: 0.5, y: 0.5 } });
		}
	}, [bgImage, bgImageTablet, bgImageMobile]);

	const updateFocalPoint = (image, enableKey) => {
		setAttributes({ [enableKey]: !!image });
	};

	useEffect(() => {
		const focalPoints = [
			{ image: bgImage, key: 'enableFocalPointPC' },
			{ image: bgImageTablet || bgImage, key: 'enableFocalPointTablet' },
			{
				image: bgImageMobile || bgImageTablet || bgImage,
				key: 'enableFocalPointMobile',
			},
		];

		focalPoints.forEach(({ image, key }) => updateFocalPoint(image, key));
	}, [bgImage, bgImageTablet, bgImageMobile]);

	useEffect(() => {
		const getFocalPoint = (device) => {
			return attributes[`bgFocalPoint${device}`] || defaultFocalPoint;
		};

		// PC, Tablet, Mobile それぞれのフォーカルポイントを継承させるロジック
		let bgPositionPC;
		if (enableFocalPointPC) {
			bgPositionPC = getFocalPoint('PC');
		} else {
			bgPositionPC = defaultFocalPoint;
		}

		let bgPositionTablet;
		if (enableFocalPointTablet) {
			bgPositionTablet = getFocalPoint('Tablet');
		} else if (enableFocalPointPC) {
			bgPositionTablet = bgPositionPC;
		} else {
			bgPositionTablet = defaultFocalPoint;
		}

		let bgPositionMobile;
		if (enableFocalPointMobile) {
			bgPositionMobile = getFocalPoint('Mobile');
		} else if (enableFocalPointTablet) {
			bgPositionMobile = bgPositionTablet;
		} else if (enableFocalPointPC) {
			bgPositionMobile = bgPositionPC;
		} else {
			bgPositionMobile = defaultFocalPoint;
		}

		// デバイスごとの背景位置をCSS変数に設定
		if (blockRef.current) {
			blockRef.current.style.setProperty(
				'--bg-position-pc',
				coordsToBackgroundPosition(bgPositionPC)
			);
			blockRef.current.style.setProperty(
				'--bg-position-tablet',
				coordsToBackgroundPosition(bgPositionTablet)
			);
			blockRef.current.style.setProperty(
				'--bg-position-mobile',
				coordsToBackgroundPosition(bgPositionMobile)
			);
			updateBackgroundPosition(bgPositionPC);
		}
	}, [
		enableFocalPointPC,
		enableFocalPointTablet,
		enableFocalPointMobile,
		bgFocalPointPC,
		bgFocalPointTablet,
		bgFocalPointMobile,
	]);

	const handleToggleChange = (device) => {
		const attributeKey = `enableFocalPoint${device}`;
		const focalPointKey = `bgFocalPoint${device}`;
		const isEnabled = attributes[attributeKey];

		// トグルの状態を切り替える
		setAttributes({ [attributeKey]: !isEnabled });

		// OFFにした場合、デフォルトの中央位置にリセット
		if (isEnabled) {
			setAttributes({ [focalPointKey]: defaultFocalPoint });
		}
	};

	const backgroundStyles = {
		backgroundImage: bgImage ? `url(${bgImage})` : undefined,
		backgroundPosition: bgFocalPointPC
			? `${bgFocalPointPC.x * 100}% ${bgFocalPointPC.y * 100}%`
			: undefined,
		'--bg-image-mobile': bgImageMobile
			? `url(${bgImageMobile})`
			: undefined,
		'--bg-image-tablet': bgImageTablet
			? `url(${bgImageTablet})`
			: undefined,
		'--bg-position-mobile': bgFocalPointMobile
			? `${bgFocalPointMobile.x * 100}% ${bgFocalPointMobile.y * 100}%`
			: undefined,
		'--bg-position-tablet': bgFocalPointTablet
			? `${bgFocalPointTablet.x * 100}% ${bgFocalPointTablet.y * 100}%`
			: undefined,
		...((bgOffsetTop ||
			bgOffsetBottom ||
			bgOffsetLeft ||
			bgOffsetRight) && {
			...(bgOffsetTop && {
				'--bg-offset-top': `${bgOffsetTop}${bgOffsetUnit}`,
			}),
			...(bgOffsetBottom && {
				'--bg-offset-bottom': `${bgOffsetBottom}${bgOffsetUnit}`,
			}),
			...(bgOffsetLeft && {
				'--bg-offset-left': `${bgOffsetLeft}${bgOffsetUnit}`,
			}),
			...(bgOffsetRight && {
				'--bg-offset-right': `${bgOffsetRight}${bgOffsetUnit}`,
			}),
		}),
		'--min-height-mobile': minHeightValueMobile
			? `${minHeightValueMobile}${minHeightUnit}`
			: 'auto',
		'--min-height-tablet': minHeightValueTablet
			? `${minHeightValueTablet}${minHeightUnit}`
			: 'auto',
		'--min-height-pc': minHeightValuePC
			? `${minHeightValuePC}${minHeightUnit}`
			: 'auto',
	};

	const blockProps = useBlockProps({
		ref: blockRef,
		style: {
			...backgroundStyles,
			...borderStyleProperty,
		},
		className: classnames(
			`vkb-outer-${blockId} vk_outer ${classWidth} ${classPaddingLR} ${classPaddingVertical} ${classBgPosition}`,
			{
				[`has-border-color`]:
					!hasBackgroundOffset &&
					borderStyle !== 'none' &&
					borderColor !== undefined,
				[`has-${sanitizeSlug(borderColor)}-border-color`]:
					!hasBackgroundOffset &&
					borderStyle !== 'none' &&
					borderColor !== undefined &&
					!isHexColor(borderColor),
				[`vk_outer-minHeight`]:
					minHeightValuePC > 0 ||
					minHeightValueTablet > 0 ||
					minHeightValueMobile > 0,
				[`has-background-offset`]: hasBackgroundOffset,
				[`has-background-offset-disabled-mobile`]:
					bgOffsetDisableMobile,
			}
		),
	});

	// bgOffsetUnit に基づいて動的に最大値を設定
	const getMaxOffset = (unit) => {
		switch (unit) {
			case 'px':
				return 1000;
			case 'em':
			case 'rem':
			case 'vw':
			case 'vh':
				return 50;
			default:
				return 100;
		}
	};

	useEffect(() => {
		if (bgPositionType === undefined) {
			setAttributes({ bgPositionType: 'focalPoint' });
		}
	}, []);

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
								schemaId={'bgImageId'}
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
							schemaId={'bgImageTabletId'}
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
							schemaId={'bgImageMobileId'}
							{...props}
						/>
					</BaseControl>
					<hr />
					<h4>{__('Background Position Type', 'vk-blocks-pro')}</h4>
					<p>
						{__(
							'Select either Focal Point to control the image’s focus, or Background Offset to shift the background position. (Only one option can be active at a time.)',
							'vk-blocks-pro'
						)}
					</p>
					<BaseControl id="vk_outer-bgPositionType">
						<ToggleGroupControl
							value={bgPositionType}
							onChange={(value) => {
								setAttributes({ bgPositionType: value });
								// リセット処理
								if (value === 'focalPoint') {
									setAttributes({
										bgOffsetTop: 0,
										bgOffsetBottom: 0,
										bgOffsetLeft: 0,
										bgOffsetRight: 0,
										bgOffsetDisableMobile: false,
									});
								} else {
									setAttributes({
										bgFocalPointPC: { x: 0.5, y: 0.5 },
										bgFocalPointTablet: { x: 0.5, y: 0.5 },
										bgFocalPointMobile: { x: 0.5, y: 0.5 },
										enableFocalPointPC: false,
										enableFocalPointTablet: false,
										enableFocalPointMobile: false,
									});
								}
							}}
							isBlock
						>
							<ToggleGroupControlOption
								value="focalPoint"
								label={__('Focal Point', 'vk-blocks-pro')}
							/>
							<ToggleGroupControlOption
								value="offset"
								label={__('Background Offset', 'vk-blocks-pro')}
							/>
						</ToggleGroupControl>
					</BaseControl>
					{bgPositionType === 'focalPoint' && (
						<>
							<ToggleControl
								label={
									__('Enable Focal Point', 'vk-blocks-pro') +
									__('(PC)', 'vk-blocks-pro')
								}
								checked={enableFocalPointPC}
								onChange={() => handleToggleChange('PC')}
								disabled={!bgImage}
							/>
							{enableFocalPointPC && (
								<BaseControl
									label={
										__(
											'Focal Point Picker',
											'vk-blocks-pro'
										) +
										' ' +
										__('(PC)', 'vk-blocks-pro')
									}
									id="vk_outer-focalPointPickerPC"
								>
									<FocalPointPicker
										url={
											bgImage ||
											bgImageTablet ||
											bgImageMobile
										}
										value={bgFocalPointPC}
										onChange={(value) =>
											onChangeBgFocalPoint(value, 'PC')
										}
										onDrag={(value) =>
											onChangeBgFocalPoint(value, 'PC')
										}
									/>
								</BaseControl>
							)}
							<ToggleControl
								label={
									__('Enable Focal Point', 'vk-blocks-pro') +
									__('(Tablet)', 'vk-blocks-pro')
								}
								checked={enableFocalPointTablet}
								onChange={() => handleToggleChange('Tablet')}
								disabled={!bgImageTablet && !bgImage}
							/>
							{enableFocalPointTablet && (
								<BaseControl
									label={
										__(
											'Focal Point Picker',
											'vk-blocks-pro'
										) +
										' ' +
										__('(Tablet)', 'vk-blocks-pro')
									}
									id="vk_outer-focalPointPickerTablet"
								>
									<FocalPointPicker
										url={bgImageTablet || bgImage}
										value={bgFocalPointTablet}
										onChange={(value) =>
											onChangeBgFocalPoint(
												value,
												'Tablet'
											)
										}
										onDrag={(value) =>
											onChangeBgFocalPoint(
												value,
												'Tablet'
											)
										}
									/>
								</BaseControl>
							)}
							<ToggleControl
								label={
									__('Enable Focal Point', 'vk-blocks-pro') +
									__('(Mobile)', 'vk-blocks-pro')
								}
								checked={enableFocalPointMobile}
								onChange={() => handleToggleChange('Mobile')}
								disabled={
									!bgImage && !bgImageTablet && !bgImageMobile
								}
							/>
							{enableFocalPointMobile && (
								<BaseControl
									label={
										__(
											'Focal Point Picker',
											'vk-blocks-pro'
										) +
										' ' +
										__('(Mobile)', 'vk-blocks-pro')
									}
									id="vk_outer-focalPointPickerMobile"
								>
									<FocalPointPicker
										url={
											bgImageMobile ||
											bgImageTablet ||
											bgImage
										}
										value={bgFocalPointMobile}
										onChange={(value) =>
											onChangeBgFocalPoint(
												value,
												'Mobile'
											)
										}
										onDrag={(value) =>
											onChangeBgFocalPoint(
												value,
												'Mobile'
											)
										}
									/>
								</BaseControl>
							)}
							<BaseControl
								label={__(
									'Background image Position',
									'vk-blocks-pro'
								)}
								id={`vk_outer-bgPosition`}
							>
								<RadioControl
									selected={bgPosition}
									options={[
										{
											label: __(
												'Repeat',
												'vk-blocks-pro'
											),
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
											help: __(
												'This will not work on iPhone.',
												'vk-blocks-pro'
											),
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
						</>
					)}
					{bgPositionType === 'offset' && (
						<>
							<p className="block-editor-block-types-list__help">
								{__(
									'When using Background Offset, Border and Divider will be temporarily disabled.',
									'vk-blocks-pro'
								)}
							</p>
							<ToggleControl
								label={__(
									'Disable offset on mobile',
									'vk-blocks-pro'
								)}
								checked={bgOffsetDisableMobile}
								onChange={(value) =>
									setAttributes({
										bgOffsetDisableMobile: value,
									})
								}
							/>
							<SelectControl
								label={__('Unit', 'vk-blocks-pro')}
								value={bgOffsetUnit}
								options={[
									{ label: 'px', value: 'px' },
									{ label: 'em', value: 'em' },
									{ label: 'rem', value: 'rem' },
									{ label: 'vw', value: 'vw' },
									{ label: 'vh', value: 'vh' },
								]}
								onChange={(value) =>
									setAttributes({
										bgOffsetUnit: value,
									})
								}
							/>

							<p>{__('Vertical Offset', 'vk-blocks-pro')}</p>
							<div style={{ marginBottom: '1em' }}>
								<RangeControl
									label={__('Top', 'vk-blocks-pro')}
									value={bgOffsetTop}
									onChange={(value) => {
										setAttributes({
											bgOffsetTop: value,
											bgOffsetBottom: 0,
										});
									}}
									min={0}
									max={getMaxOffset(bgOffsetUnit)}
									step={bgOffsetUnit === 'px' ? 1 : 0.1}
									disabled={bgOffsetBottom !== 0}
								/>
								<RangeControl
									label={__('Bottom', 'vk-blocks-pro')}
									value={bgOffsetBottom}
									onChange={(value) => {
										setAttributes({
											bgOffsetBottom: value,
											bgOffsetTop: 0,
										});
									}}
									min={0}
									max={getMaxOffset(bgOffsetUnit)}
									step={bgOffsetUnit === 'px' ? 1 : 0.1}
									disabled={bgOffsetTop !== 0}
								/>
							</div>
							<p>{__('Horizontal Offset', 'vk-blocks-pro')}</p>
							<div>
								<RangeControl
									label={__('Left', 'vk-blocks-pro')}
									value={bgOffsetLeft}
									onChange={(value) => {
										setAttributes({
											bgOffsetLeft: value,
											bgOffsetRight: 0,
										});
									}}
									min={0}
									max={getMaxOffset(bgOffsetUnit)}
									step={bgOffsetUnit === 'px' ? 1 : 0.1}
									disabled={bgOffsetRight !== 0}
								/>
								<RangeControl
									label={__('Right', 'vk-blocks-pro')}
									value={bgOffsetRight}
									onChange={(value) => {
										setAttributes({
											bgOffsetRight: value,
											bgOffsetLeft: 0,
										});
									}}
									min={0}
									max={getMaxOffset(bgOffsetUnit)}
									step={bgOffsetUnit === 'px' ? 1 : 0.1}
									disabled={bgOffsetLeft !== 0}
								/>
							</div>
						</>
					)}
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
								{
									value: 'book',
									label: __('Book', 'vk-blocks-pro'),
								},
								{
									value: 'pyramid',
									label: __('Pyramid', 'vk-blocks-pro'),
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
					<ResponsiveSizeControl
						label={__(
							'Container Inner Side Space Setting',
							'vk-blocks-pro'
						)}
						valuePC={innerSideSpaceValuePC}
						valueTablet={innerSideSpaceValueTablet}
						valueMobile={innerSideSpaceValueMobile}
						unit={innerSideSpaceUnit}
						onChangePC={(value) =>
							setAttributes({
								innerSideSpaceValuePC: parseInt(value),
							})
						}
						onChangeTablet={(value) =>
							setAttributes({
								innerSideSpaceValueTablet: parseInt(value),
							})
						}
						onChangeMobile={(value) =>
							setAttributes({
								innerSideSpaceValueMobile: parseInt(value),
							})
						}
						onChangeUnit={(value) =>
							setAttributes({ innerSideSpaceUnit: value })
						}
						unitOptions={['px', 'em', 'rem', 'vw']}
						maxPC={300}
						maxTablet={200}
						maxMobile={100}
					/>
				</PanelBody>
				<PanelBody
					title={__('Min Height Setting', 'vk-blocks-pro')}
					initialOpen={false}
				>
					<ResponsiveSizeControl
						label={__('Min Height Setting', 'vk-blocks-pro')}
						valuePC={minHeightValuePC}
						valueTablet={minHeightValueTablet}
						valueMobile={minHeightValueMobile}
						unit={minHeightUnit}
						onChangePC={(value) =>
							setAttributes({
								minHeightValuePC: value,
							})
						}
						onChangeTablet={(value) =>
							setAttributes({
								minHeightValueTablet: value,
							})
						}
						onChangeMobile={(value) =>
							setAttributes({
								minHeightValueMobile: value,
							})
						}
						onChangeUnit={(value) =>
							setAttributes({
								minHeightUnit: value,
							})
						}
						maxPC={getMaxByUnit(minHeightUnit)}
						maxTablet={getMaxByUnit(minHeightUnit)}
						maxMobile={getMaxByUnit(minHeightUnit)}
					/>
				</PanelBody>
			</InspectorControls>
			<div {...blockProps}>
				{GetBgImage}
				<div>
					{!hasBackgroundOffset &&
						whichSideUpper &&
						componentDivider(
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
					{!hasBackgroundOffset &&
						whichSideLower &&
						componentDivider(
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
