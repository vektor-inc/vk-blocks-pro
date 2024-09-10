import classnames from 'classnames';
import { componentDivider } from './component-divider';
import GenerateBgImage from './GenerateBgImage';
import { isHexColor } from '@vkblocks/utils/is-hex-color';
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

const prefix = 'vkb-outer';

export default function save(props) {
	const { attributes } = props;
	const {
		bgColor,
		bgPosition,
		bgImageMobile,
		bgImageTablet,
		bgImage,
		outerWidth,
		padding_left_and_right,
		padding_top_and_bottom,
		opacity,
		levelSettingPerDevice,
		upper_level,
		upper_level_mobile,
		upper_level_tablet,
		upper_level_pc,
		lower_level,
		lower_level_mobile,
		lower_level_tablet,
		lower_level_pc,
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

	// 幅のクラス切り替え
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

	// classPaddingLRのクラス切り替え
	classPaddingLR = '';
	if (padding_left_and_right === '0') {
		classPaddingLR = 'vk_outer-paddingLR-none';
	} else if (padding_left_and_right === '1') {
		classPaddingLR = 'vk_outer-paddingLR-use';
	} else if (padding_left_and_right === '2') {
		classPaddingLR = 'vk_outer-paddingLR-zero';
	}

	// classPaddingVerticalのクラス切り替え
	if (padding_top_and_bottom === '1') {
		classPaddingVertical = 'vk_outer-paddingVertical-use';
	} else {
		classPaddingVertical = 'vk_outer-paddingVertical-none';
	}

	// 上側セクションの傾き切り替え
	if (!levelSettingPerDevice) {
		if (upper_level) {
			whichSideUpper = 'upper';
		}
	} else if (upper_level_mobile || upper_level_tablet || upper_level_pc) {
		whichSideUpper = 'upper';
	}

	// 下側セクションの傾き切り替え
	if (!levelSettingPerDevice) {
		if (lower_level) {
			whichSideLower = 'lower';
		}
	} else if (lower_level_mobile || lower_level_tablet || lower_level_pc) {
		whichSideLower = 'lower';
	}

	// 編集画面とサイト上の切り替え
	const containerClass = 'vk_outer_container';

	// Dividerエフェクトがない時のみ枠線を追
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
		},
	});

	const GetLinkUrl = linkUrl ? (
		<a
			href={linkUrl}
			className={`${prefix}-link`}
			target={linkTarget !== '_self' ? linkTarget : undefined}
			rel={relAttribute || undefined}
			aria-label={linkDescription}
		>
			<span className="visually-hidden">{linkDescription}</span>
		</a>
	) : null;

	return (
		<div {...blockProps}>
			{GetLinkUrl}
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
