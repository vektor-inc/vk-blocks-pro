import { vkbBlockEditor } from "../../_helper/depModules";
const { InnerBlocks } = vkbBlockEditor;
const { __ } = wp.i18n;
const {Component} = wp.element
import { convertToGrid } from "../../_helper/convert-to-grid";
import React from "react";

export class PRCard extends Component {
  render() {
    let for_ = this.props.for_;
    let attributes = this.props.attributes;
    let innerClass = "";
    let className = this.props.className;
    let elm;
    const ALLOWED_BLOCKS = ["vk-blocks/icon-card-item"];
		const TEMPLATE = [ALLOWED_BLOCKS];

    //編集画面とサイト上の切り替え
    if (for_ === "edit") {
      innerClass = "editting";
      innerClass = innerClass + " vk_posts-edit";
      innerClass =
        innerClass +
        " vk_posts-edit-col-xs-" +
        convertToGrid(attributes.col_xs);
      innerClass =
        innerClass +
        " vk_posts-edit-col-sm-" +
        convertToGrid(attributes.col_sm);
      innerClass =
        innerClass +
        " vk_posts-edit-col-md-" +
        convertToGrid(attributes.col_md);
      innerClass =
        innerClass +
        " vk_posts-edit-col-lg-" +
        convertToGrid(attributes.col_lg);
      innerClass =
        innerClass +
        " vk_posts-edit-col-xl-" +
        convertToGrid(attributes.col_xl);

      elm = (
        <div className={innerClass}>
          <InnerBlocks template={TEMPLATE} allowedBlocks={ALLOWED_BLOCKS} />
        </div>
      );
    } else if ("save") {
      elm = <InnerBlocks.Content />;
    }
    return <div className={`vk_posts ${className}`}>{elm}</div>;
  }
}
