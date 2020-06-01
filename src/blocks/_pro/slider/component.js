const { InnerBlocks } = wp.editor;
const { __ } = wp.i18n; // Import __() from wp.i18n
const { Component, Fragment } = wp.element;

export const ColumnResponsive = (props) => {

	const for_ = props.for_;
  const attributes = props.attributes;
  let innerClass = "";
  const className = props.className;
  const containerClass = " vk_grid-column";
  let elm;
  const ALLOWED_BLOCKS = [["vk-blocks/slider-item"]];
  const TEMPLATE = ALLOWED_BLOCKS;

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
		<div className="swiper-container">
			<div className="swiper-wrapper">
				{elm}
			</div>
			<div className="swiper-button-next"></div>
			<div className="swiper-button-prev"></div>
		</div>);
};
