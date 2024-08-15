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

	//幅のクラス切り替え
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

	// classPaddingLRのクラス切り替え
	classPaddingLR = '';
	if (
		padding_left_and_right === '0' ||
		padding_left_and_right === 'vk_outer-paddingLR-none'
	) {
		classPaddingLR = ` is-layout-constrained container`;
	} else if (padding_left_and_right === '1') {
		classPaddingLR = ` vk_outer-paddingLR-use`;
	} else if (padding_left_and_right === '2') {
		classPaddingLR = ` vk_outer-paddingLR-zero`;
	}

	// classPaddingVerticalのクラス切り替え
	classPaddingVertical = '';
	if (padding_top_and_bottom === '1') {
		classPaddingVertical = 'vk_outer-paddingVertical-use';
	} else if (padding_top_and_bottom === '0') {
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

	// Dividerエフェクトがない時のみ枠線を追
	let borderStyleProperty = {};
	//eslint-disable-next-line camelcase
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

	let paddingLeft, paddingRight;

	if (classPaddingLR.includes('container')) {
		paddingLeft = undefined;
		paddingRight = undefined;
	} else if (padding_left_and_right === '0') {
		paddingLeft = '0';
		paddingRight = '0';
	} else {
		paddingLeft = '';
		paddingRight = '';
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
			paddingLeft,
			paddingRight,
			paddingTop: '',
			paddingBottom: '',
		},
	});

	// paddingTop と paddingBottom の設定
	if (padding_top_and_bottom === '0') {
		blockProps.style.paddingTop = '0';
		blockProps.style.paddingBottom = '0';
	} else if (padding_top_and_bottom === '1') {
		blockProps.style.paddingTop = '4em';
		blockProps.style.paddingBottom = '4em';
	}

	// paddingTop と paddingBottom の設定
	if (padding_top_and_bottom === '0') {
		blockProps.style.paddingTop = '0';
		blockProps.style.paddingBottom = '0';
	} else if (padding_top_and_bottom === '1') {
		blockProps.style.paddingTop = '4em';
		blockProps.style.paddingBottom = '4em';
	}

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
		<div {...blockProps}>
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
