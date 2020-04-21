const { InnerBlocks } = wp.editor;
const { __ } = wp.i18n; // Import __() from wp.i18n
const { Component } = wp.element;

export const ColumnResponsive = (props) => {
  let for_ = props.for_;
  let attributes = props.attributes;
  let innerClass = "";
  let className = props.className;
  let containerClass = " vk_card";
  let elm;

  const ALLOWED_BLOCKS = [["vk-blocks/column-responsive-item"]];
  const TEMPLATE = ALLOWED_BLOCKS;

  //編集画面とサイト上の切り替え
  if (for_ === "edit") {
    innerClass = "editting";
    innerClass = innerClass + " vk_posts-edit";

    elm = (
      <InnerBlocks
        className={"container row"}
        template={TEMPLATE}
        allowedBlocks={ALLOWED_BLOCKS}
      />
    );
  } else if ("save") {
    elm = <InnerBlocks.Content className={"container row"} />;
  }
  return elm;
};
