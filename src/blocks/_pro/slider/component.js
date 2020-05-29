// const { InnerBlocks } = wp.editor;
// const { __ } = wp.i18n; // Import __() from wp.i18n
// const { Component } = wp.element;
import React from 'react';
import Swiper from 'react-id-swiper';
import 'swiper/css/swiper.css'

export class ColumnResponsive extends React.Component {

  render() {

    return(
      <Swiper>
        <div>Slide 1</div>
        <div>Slide 2</div>
        <div>Slide 3</div>
        <div>Slide 4</div>
        <div>Slide 5</div>
      </Swiper>
		)

  };
}

// export const ColumnResponsive = () => {
//   return(<Swiper>
//     <div>Slide 1</div>
//     <div>Slide 2</div>
//     <div>Slide 3</div>
//     <div>Slide 4</div>
//     <div>Slide 5</div>
//   </Swiper>)
// }
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
// };
