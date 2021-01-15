import { Component } from '@wordpress/element';

export class NewComponent extends Component {

    render() {
        const {
            heading,
            content,
            insertImage,
            arrowFlag,
        } = this.props.attributes;

        const for_ = this.props.for_;

        return (
	<div className={ "vk_staff" }>hello</div>
        );
    }
}
