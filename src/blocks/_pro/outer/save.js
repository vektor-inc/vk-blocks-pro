/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import { componentDivider } from './component-divider';
import GenerateBgImage from './GenerateBgImage';
import { isHexColor } from '@vkblocks/utils/is-hex-color';
const prefix = 'vkb-outer';

/**
 * WordPress dependencies
 */
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

export default function save(props) {
	const { attributes } = props;
	const {
		bgColor,
		bgPosition,
		bgImageMobile,
		bgImageTablet,
		bgImage,
		bgFocalPointPC,
		bgFocalPointTablet,
		bgFocalPointMobile,
		bgOffsetTop,
		bgOffsetBottom,
		bgOffsetLeft,
		bgOffsetRight,
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
		minHeightValuePC,
		minHeightValueTablet,
		minHeightValueMobile,
		minHeightUnit,
		blockId,
		linkUrl,
		linkTarget,
		relAttribute,
		linkDescription,
		bgOffsetUnit,
		disableOffsetMobile,
	} = attributes;

	let classPaddingLR;
	let classPaddingVertical;
	let classBgPosition;
	let whichSideUpper;
	let whichSideLower;

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

	const backgroundStyles = {
		'--bg-image': bgImage ? `url(${bgImage})` : 'none',
		'--bg-position': bgFocalPointPC
			? `${bgFocalPointPC.x * 100}% ${bgFocalPointPC.y * 100}%`
			: 'center',
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

	// 幅クラスの切り替え
	const classWidth =
		outerWidth === 'full' || outerWidth === 'wide'
			? `vk_outer-width-${outerWidth} align${outerWidth}`
			: 'vk_outer-width-normal';

	// classBgPositionのクラス切り替え
	if (bgPosition === 'parallax') {
		classBgPosition = 'vk_outer-bgPosition-parallax vk-prlx';
	} else if (bgPosition === 'fixed') {
		classBgPosition = 'vk_outer-bgPosition-fixed';
	} else if (bgPosition === 'repeat') {
		classBgPosition = 'vk_outer-bgPosition-repeat';
	} else {
		classBgPosition = 'vk_outer-bgPosition-normal';
	}

	// classPaddingLRの切り替え
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

	// classPaddingVerticalの切り替え
	//eslint-disable-next-line camelcase
	if (padding_top_and_bottom === '1') {
		classPaddingVertical = 'vk_outer-paddingVertical-use';
	} else {
		classPaddingVertical = 'vk_outer-paddingVertical-none';
	}

	// 上側セクションの傾き切り替え
	//eslint-disable-next-line camelcase
	if (!levelSettingPerDevice) {
		if (upper_level) {
			whichSideUpper = 'upper';
		}
	} else if (upper_level_mobile || upper_level_tablet || upper_level_pc) {
		whichSideUpper = 'upper';
	}

	// 下側セクションの傾き切り替え
	//eslint-disable-next-line camelcase
	if (!levelSettingPerDevice) {
		if (lower_level) {
			whichSideLower = 'lower';
		}
	} else if (lower_level_mobile || lower_level_tablet || lower_level_pc) {
		whichSideLower = 'lower';
	}

	// 編集画面とサイト上の切り替え
	const containerClass = 'vk_outer_container';

	// オフセットが設定されているかどうかをチェック
	const hasBackgroundOffset =
		bgOffsetTop !== 0 ||
		bgOffsetBottom !== 0 ||
		bgOffsetLeft !== 0 ||
		bgOffsetRight !== 0;

	// Dividerエフェクトがない時のみ枠線を追加
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

	const blockProps = useBlockProps.save({
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
				[`has-${borderColor}-border-color`]:
					!hasBackgroundOffset &&
					borderStyle !== 'none' &&
					borderColor !== undefined &&
					!isHexColor(borderColor),
				[`vk_outer-minHeight`]:
					minHeightValuePC > 0 ||
					minHeightValueTablet > 0 ||
					minHeightValueMobile > 0,
				[`has-background-offset`]: hasBackgroundOffset,
				[`has-background-offset-disabled-mobile`]: disableOffsetMobile,
			}
		),
	});

	return (
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
					<InnerBlocks.Content />
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
			{linkUrl && (
				<a
					href={linkUrl}
					className="vkb-outer-link"
					target={linkTarget}
					rel={relAttribute}
					aria-label={linkDescription}
				></a>
			)}
		</div>
	);
}
