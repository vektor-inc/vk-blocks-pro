const {RichText, InnerBlocks} = wp.editor;
const {__} = wp.i18n; // Import __() from wp.i18n

export class Component extends React.Component {
    render() {
        let for_ = this.props.for_;
        let className = this.props.className;
        let containerClass = " vk_timeline";
        let elm;
        const TEMPLATE = [['core/heading']];

        //編集画面とサイト上の切り替え
        if (for_ === "edit") {
            elm = <InnerBlocks template={TEMPLATE}/>;
        } else if ("save") {
            elm = <InnerBlocks.Content/>;
        }
        return (
            <div className={className + containerClass}>
                {elm}
            </div>
        );
    }
}
