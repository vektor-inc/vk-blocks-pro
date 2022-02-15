import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import { componentDivider } from './component-divider';
import GenerateBgImage from './GenerateBgImage';
import { isHexColor } from '@vkblocks/utils/is-hex-color';

export default function save(props) {
	const { attributes } = props;
	const {
		bgColor,
		bgPosition,
		outerWidth,
		padding_left_and_right, //eslint-disable-line camelcase
		padding_top_and_bottom, //eslint-disable-line camelcase
		upper_level, //eslint-disable-line camelcase
		lower_level, //eslint-disable-line camelcase
		upperDividerBgColor,
		lowerDividerBgColor,
		dividerType,
		borderWidth,
		borderStyle,
		borderColor,
		borderRadius,
		clientId,
	} = attributes;

	let classPaddingLR;
	let classPaddingVertical;
	let classBgPosition;
	let whichSideUpper;
	let whichSideLower;

	//幅のクラス切り替え
	const classWidth = `vk_outer-width-${outerWidth}`;

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
	if (upper_level) {
		whichSideUpper = 'upper';
	}

	//下側セクションの傾き切り替
	//eslint-disable-next-line camelcase
	if (lower_level) {
		whichSideLower = 'lower';
	}

	//編集画面とサイト上の切り替え
	const containerClass = 'vk_outer_container';

	const bgColorClasses = [];
	let borderColorCss = borderColor;

	let bgColorOutputDisable = false;
	if (!isHexColor(bgColor)) {
		bgColorOutputDisable = true;
		bgColorClasses.push('has-background-color');
		bgColorClasses.push(`has-${bgColor}-background-color`);
	}

	if (!isHexColor(borderColor)) {
		bgColorClasses.push('has-text-color');
		bgColorClasses.push(`has-${borderColor}-color`);
		borderColorCss = 'currentColor';
	}

	//Dividerエフェクトがない時のみ枠線を追
	let borderStyleProperty = {};
	//eslint-disable-next-line camelcase
	if (
		upper_level === 0 && //eslint-disable-line camelcase
		lower_level === 0 && //eslint-disable-line camelcase
		borderWidth > 0 &&
		borderStyle !== 'none'
	) {
		borderStyleProperty = {
			border: `${borderWidth}px ${borderStyle} ${borderColorCss}`,
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

	const blockProps = useBlockProps.save({
		className: `vkb-outer-${clientId} vk_outer ${classWidth} ${bgColorClasses.join(
			' '
		)} ${classPaddingLR} ${classPaddingVertical} ${classBgPosition}`,
		style: borderStyleProperty,
	});
	return (
		<div {...blockProps}>
			<GenerateBgImage
				prefix={'vkb-outer'}
				clientId={clientId}
				bgColorOutputDisable={bgColorOutputDisable}
				{...props}
			/>
			<div>
				{componentDivider(
					upper_level,
					upperDividerBgColor,
					whichSideUpper,
					dividerType
				)}
				<div className={containerClass}>
					<InnerBlocks.Content />
				</div>
				{componentDivider(
					lower_level,
					lowerDividerBgColor,
					whichSideLower,
					dividerType
				)}
			</div>
		</div>
	);
}
