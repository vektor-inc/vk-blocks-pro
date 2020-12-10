const { InnerBlocks } = vkbBlockEditor;
const { Component } = wp.element;
const { __ } = wp.i18n;
import { schema0_37_4, schema0_40_0 } from "./depSchema"
import { vkbBlockEditor } from "./../../../utils/depModules";
import { convertToGrid } from "../../../utils/convert-to-grid";
import classNames from "classnames";
const prefix =  "vk_card_"

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
		attributes={ attributes }
		className={ className }
		for_={ "save" }
        />
      );
    },
  },
  {
    attributes: schema0_40_0,
    save({ attributes, className }) {
      return <Component0_40_0 attributes={ attributes } className={ className } for_={ "save" } />;
    },
  },
];

class DeprecatedComponent extends Component {
  render() {
    const for_ = this.props.for_;
    const attributes = this.props.attributes;
    let innerClass = "";
    const className = this.props.className;
    const containerClass = " vk_card";
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
	<div className={ innerClass }>
		<InnerBlocks template={ TEMPLATE } allowedBlocks={ ALLOWED_BLOCKS } />
	</div>
      );
    } else if ("save") {
      elm = <InnerBlocks.Content />;
    }
    return <div className={ "vk_posts" }>{ elm }</div>;
  }
}

class Component0_37_4 extends Component {

  render() {
    const for_ = this.props.for_;
    const attributes = this.props.attributes;
    let innerClass = "";
    const className = this.props.className;
    const containerClass = " vk_card";
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
	<div className={ innerClass }>
		<InnerBlocks template={ TEMPLATE } allowedBlocks={ ALLOWED_BLOCKS } />
	</div>
      );
    } else if ("save") {
      elm = <InnerBlocks.Content />;
    }
    return <div className={ `vk_posts ${className}` }>{ elm }</div>;
  }
}

export class Component0_40_0 extends Component {
	render() {
	  const for_ = this.props.for_;
		  const attributes = this.props.attributes;
		  const { clientId } = attributes;
	  let innerClass = "";
	  let className = this.props.className;
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
			<div className={ innerClass }>
				<InnerBlocks template={ TEMPLATE } allowedBlocks={ ALLOWED_BLOCKS } />
			</div>
		);
	  } else if ("save") {
		elm = <InnerBlocks.Content />;
		  }

		  if(className){
			  className = className.replace( /vk_card_undefined/g , "" )
		  }

		  return <div className={ classNames('vk_posts', className, `${prefix}${clientId}`) }>{ elm }</div>;

	}
  }
