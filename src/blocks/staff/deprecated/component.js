const { Component } = wp.element;
export class NewComponent extends Component {

    render() {
        let {
            heading,
            content,
            insertImage,
            arrowFlag,
        } = this.props.attributes;

        let for_ = this.props.for_;

        return (
            <div className={"vk_staff"}>hello</div>
        );
    }
}
