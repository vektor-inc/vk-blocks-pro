const { RichText, InnerBlocks } = wp.editor;
const { __ } = wp.i18n; // Import __() from wp.i18n

export class Component extends React.Component {
  render() {
    let for_ = this.props.for_;
    let attributes = this.props.attributes;
    let innerClass = '';
    let className = this.props.className;
    let containerClass = " vk_card";
    let elm;
    const ALLOWED_BLOCKS = ["vk-blocks/card-item"];
    const TEMPLATE = [ALLOWED_BLOCKS];

    //編集画面とサイト上の切り替え
    if (for_ === "edit") {

      innerClass = 'editting';
      innerClass = innerClass + ' vk_posts-edit-col-xs-' + attributes.col_xs;
      innerClass = innerClass + ' vk_posts-edit-col-sm-' + attributes.col_sm;
      innerClass = innerClass + ' vk_posts-edit-col-md-' + attributes.col_md;
      innerClass = innerClass + ' vk_posts-edit-col-lg-' + attributes.col_lg;
      innerClass = innerClass + ' vk_posts-edit-col-xl-' + attributes.col_xl;

      elm = <div className={innerClass}><InnerBlocks template={TEMPLATE} allowedBlocks={ALLOWED_BLOCKS} /></div>;
    } else if ("save") {
      elm = <InnerBlocks.Content />;
    }
    return <div className={"vk_posts"}>{elm}</div>;
  }
}
