const {RichText, InnerBlocks} = wp.editor;
const {__} = wp.i18n; // Import __() from wp.i18n

export class Component extends React.Component {
    render() {
        let {content, dcpColor, faIcon, iconStyle} = this.props.attributes;
        let className = this.props.className;
        let setAttributes = this.props.setAttributes;
        let for_ = this.props.for_;
        let elm;
        let containerClass = "vk_step";

        //編集画面とサイト上の切り替え
        if (for_ === "edit") {
            elm = <RichText
                tagName="div"
                onChange={(value) => setAttributes({content: value})}
                value={content}
                placeholder={__('Your Name', 'vk-blocks')}
            />
        } else if ("save") {
            elm = <RichText.Content
                tagName="div"
                className={faIcon}
                value={content}
            />
        }

        return (
            <div className={"vk_step"}>
                <i className={faIcon}>{elm}</i>
            </div>
        );
    }
}
