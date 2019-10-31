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
        let containerClass = " vk_timeline-item";
        let elm;
        let styleClass;
        let inlineStyle;
        let marker;
        const TEMPLATE = [['core/heading']];

        //編集画面とサイト上の切り替え
        if (for_ === "edit") {
            elm = <InnerBlocks template={TEMPLATE}/>;
        } else if ("save") {
            elm = <InnerBlocks.Content/>;
        }

        if (style === "solid") {
            styleClass = ' vk_timeline-item_style-default';
            inlineStyle = {backgroundColor:`${color}`};
        }else if(style === "outlined"){
            styleClass = ' vk_timeline-item_style-outlined'
            inlineStyle = {border:`3px solid ${color}`};
        }

        return (
            <div className={className + containerClass}>
                {label}
                {elm}
                <div
                    className={'vk_timeline-item_style' + styleClass}
                    style={inlineStyle}
                />
            </div>
        );
    }
}
