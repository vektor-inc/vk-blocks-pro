const {InnerBlocks} = wp.editor;
const {__} = wp.i18n; // Import __() from wp.i18n

export class Component extends React.Component {
    render() {
        const {
            label,
            color,
            style
        } = this.props.attributes;
        let for_ = this.props.for_;
        let className = this.props.className;
        let containerClass = " vk_timeline";
        let elm;
        let styleClass;
        const TEMPLATE = [['core/heading']];

        //編集画面とサイト上の切り替え
        if (for_ === "edit") {
            elm = <InnerBlocks template={TEMPLATE}/>;
        } else if ("save") {
            elm = <InnerBlocks.Content/>;
        }

        if (style === "default") {
            styleClass = 'vk_timeline_style-default'
        }else if(style === "outlined"){
            styleClass = 'vk_timeline_style-outlined'
        }

        console.log(styleClass);

        return (
            <div className={className + containerClass}>
                {label}
                {elm}
            </div>
        );
    }
}
