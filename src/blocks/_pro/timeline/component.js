import { vkbBlockEditor } from "./../../../utils/depModules";
const { InnerBlocks } = vkbBlockEditor;

export class Component extends React.Component {
    render() {
        const for_ = this.props.for_;
        const className = this.props.className;
        const containerClass = " vk_timeline";
        let elm;
        const ALLOWED_BLOCKS = ['vk-blocks/timeline-item'];
        const TEMPLATE = [ALLOWED_BLOCKS];

        //編集画面とサイト上の切り替え
        if (for_ === "edit") {
            elm = <InnerBlocks template={ TEMPLATE } allowedBlocks={ ALLOWED_BLOCKS } />;
        } else if ("save") {
            elm = <InnerBlocks.Content />;
        }
        return (
	<div className={ className + containerClass }>
		{ elm }
	</div>
        );
    }
}
