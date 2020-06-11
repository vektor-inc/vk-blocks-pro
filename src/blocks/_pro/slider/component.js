const { InnerBlocks } = wp.editor;
const { __ } = wp.i18n; // Import __() from wp.i18n
const { Component, Fragment } = wp.element;
import classNames from "classnames";

export const ColumnResponsive = (props) => {

	const for_ = props.for_;
	const attributes = props.attributes;
	const {navigation,clientId,width,verticalAlignment} = attributes;
  let innerClass = "";
  const className = props.className;
  const containerClass = " vk_grid-column";
	let elm;
	let alignClass;
	let alignClassVertical;
  const ALLOWED_BLOCKS = [["vk-blocks/slider-item"]];
	const TEMPLATE = ALLOWED_BLOCKS;

	if("full" === width){
		alignClass = "vk_width-full"
	}else if("wide" === width){
		alignClass = "vk_width-wide"
	}else{
		alignClass = "vk_width"
	}

	if("top" === verticalAlignment){
		alignClassVertical = "vk_align-top"
	}else if("center" === verticalAlignment){
		alignClassVertical = "vk_align-center"
	}else if("bottom" === verticalAlignment){
		alignClassVertical = "vk_align-bottom"
	}

  //編集画面とサイト上の切り替え
  if (for_ === "edit") {
    innerClass = "editting";
    innerClass = innerClass + " vk_posts-edit";

    elm = (
      <div>
        <InnerBlocks
          //編集画面の追加タグ用に2回目のClassを挿入
          className={`${containerClass} row`}
          template={TEMPLATE}
          allowedBlocks={ALLOWED_BLOCKS}
        />
      </div>
    );
  } else if ("save") {
    elm = (
        <InnerBlocks.Content />
    );
	}
  return (
		<div className={classNames(`swiper-container vk_slider_${clientId}`, alignClass, alignClassVertical)}>
			<div className={`swiper-wrapper`}>
				{elm}
			</div>
			<div className="swiper-button-next"></div>
			<div className="swiper-button-prev"></div>
			{navigation && <div className="swiper-pagination"></div>}
		</div>);
};
