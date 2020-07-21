const { InnerBlocks } = vkbBlockEditor;
const { Component } = wp.element;
const { __ } = wp.i18n;
import { schema0_37_4 } from "./depSchema"
import { vkbBlockEditor } from "./../../_helper/depModules";
import { convertToGrid } from "../../_helper/convert-to-grid";

export const deprecated = [
	{
		attributes : schema0_37_4,
		save({ attributes, className }) {
			return <Component0_37_4 attributes={ attributes } className={ className } for_={ "save" } />
		}
	},
  {
    attributes: schema0_37_4,
    save({ attributes, className }) {
      return (
        <DeprecatedComponent
          attributes={attributes}
          className={className}
          for_={"save"}
        />
      );
    },
  },
];

class DeprecatedComponent extends Component {
  render() {
    let for_ = this.props.for_;
    let attributes = this.props.attributes;
    let innerClass = "";
    let className = this.props.className;
    let containerClass = " vk_card";
    let elm;
    const ALLOWED_BLOCKS = ["vk-blocks/card-item"];
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
    return <div className={"vk_posts"}>{elm}</div>;
  }
}

class Component0_37_4 extends Component {

  render() {
    let for_ = this.props.for_;
    let attributes = this.props.attributes;
    let innerClass = "";
    let className = this.props.className;
    let containerClass = " vk_card";
    let elm;
    const ALLOWED_BLOCKS = ["vk-blocks/card-item"];
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
