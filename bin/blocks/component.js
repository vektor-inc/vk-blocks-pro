export default class Component extends React.Component {

    render() {

        const {
            heading,
            content,
            insertImage,
            arrowFlag,
        } = this.props.attributes;
        const className = this.props.className;
        const for_ = this.props.for_;

        return (
	<div className={ "vk_your-block-slug" }>hello</div>
        );
    }
}
