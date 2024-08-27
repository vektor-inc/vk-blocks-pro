import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import { componentDivider } from './../component-divider';
import GenerateBgImage from '@vkblocks/utils/GenerateBgImage';

export default function save(props) {
	const { attributes } = props;
	const {
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
	let borderProperty;
	let borderRadiusProperty;

	//幅のクラス切り替え
	const classWidth = `vk_outer-width-${outerWidth}`;

	//classBgPositionのクラス切り替え
	if (bgPosition === 'parallax') {
		classBgPosition = ' vk_outer-bgPosition-parallax vk-prlx';
	} else if (bgPosition === 'fixed') {
		classBgPosition = ' vk_outer-bgPosition-fixed';
	} else if (bgPosition === 'repeat') {
		classBgPosition = ' vk_outer-bgPosition-repeat';
	} else {
		classBgPosition = ' vk_outer-bgPosition-normal';
	}

	//classPaddingLRのクラス切り替え
	classPaddingLR = '';
	//eslint-disable-next-line camelcase
	if (padding_left_and_right === '0') {
		classPaddingLR = ' vk_outer-paddingLR-none';
		//eslint-disable-next-line camelcase
	} else if (padding_left_and_right === '1') {
		classPaddingLR = ' vk_outer-paddingLR-use';
		//eslint-disable-next-line camelcase
	} else if (padding_left_and_right === '2') {
		// Fit to content area width
		classPaddingLR = ' vk_outer-paddingLR-zero';
	}

	//classPaddingVerticalのクラス切り替
	//eslint-disable-next-line camelcase
	if (padding_top_and_bottom === '1') {
		classPaddingVertical = ' vk_outer-paddingVertical-use';
	} else {
		classPaddingVertical = ' vk_outer-paddingVertical-none';
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

	//Dividerエフェクトがない時のみ枠線を追
	//eslint-disable-next-line camelcase
	if (upper_level === 0 && lower_level === 0) {
		borderProperty = `${borderWidth}px ${borderStyle} ${borderColor}`;
		borderRadiusProperty = `${borderRadius}px`;
	} else {
		borderProperty = 'none';
		borderRadiusProperty = `0px`;
	}

	const blockProps = useBlockProps.save({
		className: `vkb-outer-${clientId} vk_outer ${classWidth} ${classPaddingLR} ${classPaddingVertical} ${classBgPosition}`,
	});
	return (
		<div
			{...blockProps}
			style={{
				border: borderProperty,
				borderRadius: borderRadiusProperty,
			}}
		>
			<GenerateBgImage
				prefix={'vkb-outer'}
				clientId={clientId}
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
