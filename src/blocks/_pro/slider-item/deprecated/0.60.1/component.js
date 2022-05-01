import classNames from "classnames";
import { InnerBlocks } from '@wordpress/block-editor';
import GenerateBgImage from '@vkblocks/utils/GenerateBgImage';
const prefix = "vk_slider_item";

const SliderItem = ( props )=>{
	const { className, attributes, for_ } = props;
	const {
		verticalAlignment,
		padding_left_and_right,
		clientId
	} = attributes;
	let classPaddingLR;
	let elm;
	let baseClass;
	let containerClass;

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

	//編集画面とサイト上の切り替え
	if (for_ === `edit`) {
		elm = <InnerBlocks />;
	} else if (`save`) {
		elm = <InnerBlocks.Content />;
	}

	if ( classPaddingLR === ` ${prefix}-paddingLR-none` || classPaddingLR === "" ) {
		containerClass = `${prefix}_container container`;
	} else {
		containerClass = `${prefix}_container`;
	}

	baseClass = classNames(className, `vk_slider_item swiper-slide vk_valign-${verticalAlignment} ${prefix}-${clientId}`, `${classPaddingLR}`, `${prefix}-paddingVertical-none`)

    return(
	<div className={ baseClass }>
		<GenerateBgImage prefix={ prefix } clientId={ clientId } { ...props } />
		<div className={ containerClass }>
			{ elm }
		</div>
	</div>
    )


}

export default SliderItem;
