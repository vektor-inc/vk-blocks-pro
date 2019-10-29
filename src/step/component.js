import React from "react";

const {RichText, InnerBlocks} = wp.editor;
const {__} = wp.i18n; // Import __() from wp.i18n

export class Component extends React.Component {
  render() {
    let {content, dcpColor, faIcon, iconStyle} = this.props.attributes;
    let className = this.props.className;
    let setAttributes = this.props.setAttributes;
    let for_ = this.props.for_;
    let elm;
    let heading;
    let containerClass = "vk_step";

    //編集画面とサイト上の切り替え
    if (for_ === "edit") {

      heading = <RichText
          // style={ { background: balloonBgColor, border: balloonBgColor } }
          tagName="p"
          onChange={(value) => setAttributes({content: value})}
          value={content}
          placeholder={__('Input text', 'vk-blocks')}
      />;
      elm = <InnerBlocks/>;
    } else if ("save") {
      heading = <RichText.Content
          // style={ { background: balloonBgColor, border: balloonBgColor } }
          tagName="p"
          value={content}
      />;
      elm = <InnerBlocks.Content/>;
    }
    return (
        <div className={containerClass}>
          <div className={"vk_step_header"}>
            <i className={`${faIcon} btn-${dcpColor} vk_step_icon-${iconStyle}`}></i>
            {heading}
          </div>
          {elm}
        </div>
    );
  }
}
