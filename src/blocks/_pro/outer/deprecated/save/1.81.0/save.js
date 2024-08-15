/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import { __ } from '@wordpress/i18n';
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
		bgFocalPoint,
		bgFocalPointTablet,
		bgFocalPointMobile,
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
		backgroundImage:
			bgImageMobile ? `url(${bgImageMobile})` :
			bgImageTablet ? `url(${bgImageTablet})` :
			bgImage ? `url(${bgImage})` : undefined,
		backgroundPosition:
			bgImageMobile ? `${bgFocalPointMobile.x * 100}% ${bgFocalPointMobile.y * 100}%` :
			bgImageTablet ? `${bgFocalPointTablet.x * 100}% ${bgFocalPointTablet.y * 100}%` :
			bgImage ? `${bgFocalPoint.x * 100}% ${bgFocalPoint.y * 100}%` : undefined,
		minHeight: minHeightValuePC ? `${minHeightValuePC}${minHeightUnit}` : undefined,
	};

	const classWidth =
		outerWidth === 'full' || outerWidth === 'wide'
			? `vk_outer-width-${outerWidth} align${outerWidth}`
			: 'vk_outer-width-normal';

	if (bgPosition === 'parallax') {
		classBgPosition = 'vk_outer-bgPosition-parallax vk-prlx';
	} else if (bgPosition === 'fixed') {
		classBgPosition = 'vk_outer-bgPosition-fixed';
	} else if (bgPosition === 'repeat') {
		classBgPosition = 'vk_outer-bgPosition-repeat';
	} else {
		classBgPosition = 'vk_outer-bgPosition-normal';
	}

	classPaddingLR = '';
	if (padding_left_and_right === '0') {
		classPaddingLR = 'vk_outer-paddingLR-none';
	} else if (padding_left_and_right === '1') {
		classPaddingLR = 'vk_outer-paddingLR-use';
	} else if (padding_left_and_right === '2') {
		classPaddingLR = 'vk_outer-paddingLR-zero';
	}

	if (padding_top_and_bottom === '1') {
		classPaddingVertical = 'vk_outer-paddingVertical-use';
	} else {
		classPaddingVertical = 'vk_outer-paddingVertical-none';
	}

	if (!levelSettingPerDevice) {
		if (upper_level) {
			whichSideUpper = 'upper';
		}
	} else if (upper_level_mobile || upper_level_tablet || upper_level_pc) {
		whichSideUpper = 'upper';
	}

	if (!levelSettingPerDevice) {
		if (lower_level) {
			whichSideLower = 'lower';
		}
	} else if (lower_level_mobile || lower_level_tablet || lower_level_pc) {
		whichSideLower = 'lower';
	}

	const containerClass = 'vk_outer_container';

	let borderStyleProperty = {};
	if (!levelSettingPerDevice) {
		if (
			upper_level === 0 &&
			lower_level === 0 &&
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
		} else if (upper_level !== 0 || lower_level !== 0) {
			borderStyleProperty = {
				border: `none`,
				borderRadius: `0px`,
			};
		}
	} else if (
		upper_level_mobile === 0 &&
		upper_level_tablet === 0 &&
		upper_level_pc === 0 &&
		lower_level_mobile === 0 &&
		lower_level_tablet === 0 &&
		lower_level_pc === 0 &&
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
	} else if (
		upper_level_mobile !== 0 ||
		upper_level_tablet !== 0 ||
		upper_level_pc !== 0 ||
		lower_level_mobile !== 0 ||
		lower_level_tablet !== 0 ||
		lower_level_pc !== 0
	) {
		borderStyleProperty = {
			border: `none`,
			borderRadius: `0px`,
		};
	}

	const blockProps = useBlockProps.save({
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
			...backgroundStyles,
		},
	});

	const relAttribute =
		linkTarget === '_blank' ? 'noopener noreferrer' : 'noopener';
	const GetLinkUrl = (
		<a
			href={linkUrl}
			target={linkTarget}
			className={`${prefix}-link`}
			rel={relAttribute}
			aria-label={__('Outer link', 'vk-blocks-pro')}
		>
			<span className="screen-reader-text">
				{__('Outer link', 'vk-blocks-pro')}
			</span>
		</a>
	);

	return (
		<div {...blockProps} style={backgroundStyles}>
			{linkUrl && GetLinkUrl}
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
					<InnerBlocks.Content />
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
	);
}
