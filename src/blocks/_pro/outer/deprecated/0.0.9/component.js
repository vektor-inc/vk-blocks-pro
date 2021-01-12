import { componentDivider } from '../component-divider';
import { InnerBlocks } from '@wordpress/block-editor';
import hex2rgba from '@vkblocks/utils/hex-to-rgba';

export const ComponentV2 = (props) => {
	let {
		bgPosition,
		outerWidth,
		// eslint-disable-next-line camelcase
		padding_left_and_right,
		// eslint-disable-next-line camelcase
		padding_top_and_bottom,
		// eslint-disable-next-line camelcase
		upper_level,
		// eslint-disable-next-line camelcase
		lower_level,
		upperDividerBgColor,
		lowerDividerBgColor,
		dividerType,
		borderWidth,
		borderStyle,
		borderColor,
		borderRadius,
		anchor,
	} = props.attributes;

	const { clientId } = props;
	const className = props.className;
	const for_ = props.for_;
	let classPaddingLR;
	let classPaddingVertical;
	let classBgPosition;
	let classWidth;
	let elm;
	let containerClass;
	let whichSideUpper;
	let whichSideLower;
	let borderProperty;
	let borderRadiusProperty;

	//幅のクラス切り替え
	// eslint-disable-next-line prefer-const
	classWidth = ` vk_outer-width-${outerWidth}`;

	//classBgPositionのクラス切り替え
	if (bgPosition === 'parallax') {
		classBgPosition = ' vk_outer-bgPosition-parallax vk-prlx';
	} else if (bgPosition === 'fixed') {
		classBgPosition = ' vk_outer-bgPosition-fixed';
	} else {
		classBgPosition = ' vk_outer-bgPosition-normal';
	}

	//classPaddingLRのクラス切り替え
	// eslint-disable-next-line camelcase
	if (padding_left_and_right === '1') {
		classPaddingLR = ' vk_outer-paddingLR-use';
	} else {
		classPaddingLR = ' vk_outer-paddingLR-none';
	}

	//classPaddingVerticalのクラス切り替え
	// eslint-disable-next-line camelcase
	if (padding_top_and_bottom === '1') {
		classPaddingVertical = ' vk_outer-paddingVertical-use';
	} else {
		classPaddingVertical = ' vk_outer-paddingVertical-none';
	}

	//上側セクションの傾き切り替え
	// eslint-disable-next-line camelcase
	if (upper_level) {
		whichSideUpper = 'upper';
	}

	//下側セクションの傾き切り替え
	// eslint-disable-next-line camelcase
	if (lower_level) {
		whichSideLower = 'lower';
	}

	//編集画面とサイト上の切り替え
	if (for_ === 'edit') {
		elm = <InnerBlocks />;
	} else if ('save') {
		elm = <InnerBlocks.Content />;
		containerClass = 'vk_outer_container';
	}

	//borderColorクリア時に白をセットする
	if (!borderColor) {
		borderColor = '#fff';
	}

	//Dividerエフェクトがない時のみ枠線を追加
	// eslint-disable-next-line camelcase
	if (upper_level === 0 && lower_level === 0) {
		borderProperty = `${borderWidth}px ${borderStyle} ${borderColor}`;
		borderRadiusProperty = `${borderRadius}px`;
	} else {
		borderProperty = 'none';
		borderRadiusProperty = `0px`;
	}

	const defaultProps = {
		clientId,
		anchor,
		className,
		classWidth,
		classPaddingLR,
		classPaddingVertical,
		classBgPosition,
		borderProperty,
		borderRadiusProperty,
		upper_level,
		upperDividerBgColor,
		whichSideUpper,
		dividerType,
		containerClass,
		elm,
		lower_level,
		lowerDividerBgColor,
		whichSideLower,
	};

	return (
		<>
			<GenerateMediaqueryCss { ...props } />
			<OuterBlockInner { ...defaultProps } />
		</>
	);
};

const GenerateMediaqueryCss = (props) => {
	const { attributes, clientId } = props;
	const {
		bgImageMobile,
		bgImageTablet,
		bgImage,
		bgColor,
		opacity,
	} = attributes;

	const mobileViewport = 'max-width: 575.98px';
	const tabletViewport = 'min-width: 576px';
	const pcViewport = 'min-width: 1200px';
	const underPcViewport = 'max-width: 1199.98px';

	let bgColorWOpacity;

	//hexからrgbaに変換
	if (bgColor) {
		bgColorWOpacity = hex2rgba(bgColor, opacity);
	} else {
		//背景色をクリアした時は、白に変更
		bgColorWOpacity = hex2rgba('#fff', opacity);
	}

	//moible only
	if (bgImageMobile && !bgImageTablet && !bgImage) {
		return (
			<style>{`.vkb-outer-${clientId}{background: linear-gradient(${bgColorWOpacity}, ${bgColorWOpacity}), url(${bgImageMobile})}!important;`}</style>
		);
	}
	//tablet only
	if (!bgImageMobile && bgImageTablet && !bgImage) {
		return (
			<style>{`.vkb-outer-${clientId}{background: linear-gradient(${bgColorWOpacity}, ${bgColorWOpacity}), url(${bgImageTablet})}!important;`}</style>
		);
	}
	//pc only
	if (!bgImageMobile && !bgImageTablet && bgImage) {
		return (
			<style>{`.vkb-outer-${clientId}{background: linear-gradient(${bgColorWOpacity}, ${bgColorWOpacity}), url(${bgImage})}!important;`}</style>
		);
	}
	//pc -mobile
	if (bgImageMobile && !bgImageTablet && bgImage) {
		return (
			<style>
				{`
          @media screen and (${underPcViewport}) {
            .vkb-outer-${clientId}{background: linear-gradient(${bgColorWOpacity}, ${bgColorWOpacity}), url(${bgImageMobile})}!important;
          }
          @media screen and (${pcViewport}) {
            .vkb-outer-${clientId}{background: linear-gradient(${bgColorWOpacity}, ${bgColorWOpacity}), url(${bgImage})}!important;
          }
          `}
			</style>
		);
	}
	//pc -tablet
	if (!bgImageMobile && bgImageTablet && bgImage) {
		return (
			<style>
				{`
          @media screen and (${underPcViewport}) {
            .vkb-outer-${clientId}{background: linear-gradient(${bgColorWOpacity}, ${bgColorWOpacity}), url(${bgImageTablet})}!important;
          }
          @media screen and (${pcViewport}) {
            .vkb-outer-${clientId}{background: linear-gradient(${bgColorWOpacity}, ${bgColorWOpacity}), url(${bgImage})}!important;
          }
          `}
			</style>
		);
	}
	//tablet - mobile
	if (bgImageMobile && bgImageTablet && !bgImage) {
		return (
			<style>
				{`
          @media screen and (${mobileViewport}) {
            .vkb-outer-${clientId}{background: linear-gradient(${bgColorWOpacity}, ${bgColorWOpacity}), url(${bgImageMobile})}!important;
          }
          @media screen and (${tabletViewport}) {
            .vkb-outer-${clientId}{background: linear-gradient(${bgColorWOpacity}, ${bgColorWOpacity}), url(${bgImageTablet})}!important;
          }
        `}
			</style>
		);
	}
	//pc -tablet - mobile
	if (bgImageMobile && bgImageTablet && bgImage) {
		return (
			<style>
				{`
        @media screen and (${mobileViewport}) {
          .vkb-outer-${clientId}{background: linear-gradient(${bgColorWOpacity}, ${bgColorWOpacity}), url(${bgImageMobile})}!important;
        }
        @media screen and (${tabletViewport}) {
          .vkb-outer-${clientId}{background: linear-gradient(${bgColorWOpacity}, ${bgColorWOpacity}), url(${bgImageTablet})}!important;
        }
        @media screen and (${pcViewport}) {
          .vkb-outer-${clientId}{background: linear-gradient(${bgColorWOpacity}, ${bgColorWOpacity}), url(${bgImage})}!important;
        }
        `}
			</style>
		);
	}
	//no background image
	if (!bgImageMobile && !bgImageTablet && !bgImage) {
		return (
			<style>{`.vkb-outer-${clientId}{background: linear-gradient(${bgColorWOpacity}, ${bgColorWOpacity})}!important;`}</style>
		);
	}
};

const OuterBlockInner = (props) => {
	const {
		clientId,
		anchor,
		className,
		classWidth,
		classPaddingLR,
		classPaddingVertical,
		classBgPosition,
		borderProperty,
		borderRadiusProperty,
		// eslint-disable-next-line camelcase
		upper_level,
		upperDividerBgColor,
		whichSideUpper,
		dividerType,
		containerClass,
		elm,
		// eslint-disable-next-line camelcase
		lower_level,
		lowerDividerBgColor,
		whichSideLower,
	} = props;

	return (
		<>
			<div
				id={anchor}
				className={
					'vkb-outer-' +
					clientId +
					' ' +
					className +
					' vk_outer' +
					classWidth +
					classPaddingLR +
					classPaddingVertical +
					classBgPosition
				}
				style={{
					border: borderProperty,
					borderRadius: borderRadiusProperty,
				}}
			>
				{componentDivider(
					upper_level,
					upperDividerBgColor,
					whichSideUpper,
					dividerType
				)}
				<div className={containerClass}>{elm}</div>
				{componentDivider(
					lower_level,
					lowerDividerBgColor,
					whichSideLower,
					dividerType
				)}
			</div>
		</>
	);
};
