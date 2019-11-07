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
        const TEMPLATE = [['vk-blocks/step-item-numbering'],['core/heading']];

        //編集画面とサイト上の切り替え
        if (for_ === "edit") {
            elm = <InnerBlocks template={TEMPLATE} />;
        } else if ("save") {
            elm = <InnerBlocks.Content/>;
        }
        return (
            <div className={"vk_step"}>
                {elm}
            </div>
        );
    }
}
