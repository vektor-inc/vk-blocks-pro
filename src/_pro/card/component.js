const { RichText, InnerBlocks } = wp.editor;
const { __ } = wp.i18n; // Import __() from wp.i18n

export class Component extends React.Component {
  render() {
    let for_ = this.props.for_;
    let className = this.props.className;
    let containerClass = " vk_card";
    let elm;
    const ALLOWED_BLOCKS = ["vk-blocks/card-item"];
    const TEMPLATE = [ALLOWED_BLOCKS];

    //編集画面とサイト上の切り替え
    if (for_ === "edit") {
      elm = <InnerBlocks template={TEMPLATE} allowedBlocks={ALLOWED_BLOCKS} />;
    } else if ("save") {
      elm = <InnerBlocks.Content />;
    }
    return (
      <div className={`container`}>
        <div className={"row"}>{elm}</div>
      </div>
    );
  }
}
