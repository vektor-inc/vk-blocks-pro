const { InnerBlocks } = wp.editor;
const { __ } = wp.i18n; // Import __() from wp.i18n
const { Component } = wp.element;
import Swiper from 'swiper';

export const ColumnResponsive = (props) => {


	const mySwiper = new Swiper ('.swiper-container', {
    speed: 400,
    spaceBetween: 100
	})

	return(
		<div className="swiper-container">
    <div className="swiper-wrapper">
        <div className="swiper-slide">Slide 1</div>
        <div className="swiper-slide">Slide 2</div>
        <div className="swiper-slide">Slide 3</div>
        ...
    </div>
    <div className="swiper-pagination">Page nation</div>
    <div className="swiper-button-prev">Prev</div>
    <div className="swiper-button-next">Next</div>

    <div className="swiper-scrollbar">scrollbar</div>
</div>
	)

  // const for_ = props.for_;
  // const attributes = props.attributes;
  // let innerClass = "";
  // const className = props.className;
  // const containerClass = " vk_grid-column";
  // let elm;

  // const ALLOWED_BLOCKS = [["vk-blocks/grid-column-item"]];
  // const TEMPLATE = ALLOWED_BLOCKS;

  // //編集画面とサイト上の切り替え
  // if (for_ === "edit") {
  //   innerClass = "editting";
  //   innerClass = innerClass + " vk_posts-edit";

  //   elm = (
  //     <div>
  //       <InnerBlocks
  //         //編集画面の追加タグ用に2回目のClassを挿入
  //         className={`${containerClass} row`}
  //         template={TEMPLATE}
  //         allowedBlocks={ALLOWED_BLOCKS}
  //       />
  //     </div>
  //   );
  // } else if ("save") {
  //   elm = (
  //     <div className={"row"}>
  //       <InnerBlocks.Content />
  //     </div>
  //   );
  // }
  // return elm;
};
