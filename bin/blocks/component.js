import React from 'react';

export default class NewComponent extends React.Component {

    render() {

        let {
            heading,
            content,
            insertImage,
            arrowFlag,
        } = this.props.attributes;
        let className = this.props.className;
        let for_ = this.props.for_;

        return (
            <div className={"vk_your-block-slug"}>hello</div>
        );
    }
}
