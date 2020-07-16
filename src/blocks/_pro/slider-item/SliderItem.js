import classNames from "classnames";
const { InnerBlocks} = wp.blockEditor;
import GenerateBgImage from "../../_helper/GenerateBgImage"
const prefix = "vk_slider_item";

const SliderItem = ( props )=>{
	const { className, attributes, setAttributes, for_ } = props;
	const {
		verticalAlignment,
		outerWidth,
		bgPosition,
		padding_left_and_right,
		padding_top_and_bottom,
		clientId
	} = attributes;
	let classPaddingLR;
	let classPaddingVertical;
	let classBgPosition;
	let elm;

	console.log(clientId)

	//幅のクラス切り替え
	let classWidth = ` ${prefix}-width-${outerWidth}`;

	//classBgPositionのクラス切り替え
	if (bgPosition === "parallax") {
		classBgPosition = ` ${prefix}-bgPosition-parallax vk-prlx`;
	} else if (bgPosition === "fixed") {
		classBgPosition = ` ${prefix}-bgPosition-fixed`;
	} else {
		classBgPosition = ` ${prefix}-bgPosition-normal`;
	}

	//classPaddingLRのクラス切り替え
	classPaddingLR = "";
	if ( padding_left_and_right === "0") {
		classPaddingLR = ` ${prefix}-paddingLR-none`;
	} else if ( padding_left_and_right === "1") {
		classPaddingLR = ` ${prefix}-paddingLR-use`;
	} else if ( padding_left_and_right === "2") {
		// Fit to content area width
		classPaddingLR = ` ${prefix}-paddingLR-zero`;
	}

	//classPaddingVerticalのクラス切り替え
	if (padding_top_and_bottom === "1") {
		classPaddingVertical = ` ${prefix}-paddingVertical-use`;
	} else {
		classPaddingVertical = ` ${prefix}-paddingVertical-none`;
	}

	//編集画面とサイト上の切り替え
	if (for_ === `edit`) {
		elm = <InnerBlocks />;
	} else if (`save`) {
		elm = <InnerBlocks.Content />;
		if ( classPaddingLR === ` ${prefix}-paddingLR-none` || classPaddingLR === `` ) {
			containerClass = `${prefix}_container container`;
		} else {
			containerClass = `${prefix}_container`;
		}
	}

    let containerClass = classNames(className, `vk_align-${verticalAlignment} ${prefix}-${clientId}`, `${prefix}${classWidth}${classPaddingLR}${classPaddingVertical}${classBgPosition}`)

    return(
        <div className={containerClass}>
            {/* <GenerateBgImage prefix={prefix} clientId={clientId} {...props} /> */}
			{elm}
		</div>
    )


}

export default SliderItem;
