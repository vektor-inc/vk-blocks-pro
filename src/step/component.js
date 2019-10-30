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
    const ALLOWED_BLOCKS = ['core/image'];


    //編集画面とサイト上の切り替え
    if (for_ === "edit") {

      heading = <RichText
          className={"vk_step_heading"}
          tagName="p"
          onChange={(value) => setAttributes({content: value})}
          value={content}
          placeholder={__('Input text', 'vk-blocks')}
      />;
      elm = <InnerBlocks
          allowedBlocks={ALLOWED_BLOCKS}
      />;
    } else if ("save") {
      heading = <RichText.Content
          tagName="p"
          value={content}
      />;
      elm = <InnerBlocks.Content/>;
    }
    return (
        <div className={"vk_step"}>
          <i className={`vk_step_icon vk_step_icon-${iconStyle} ${faIcon} btn-${dcpColor} `}></i>
          <div className="vk_step_content">
            {heading}
            {elm}
          </div>
          <div className="inserter">
          </div>
        </div>
    );
  }
}
