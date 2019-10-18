import React from 'react';

export class NewComponent extends React.Component {

    render() {

        let {
            heading,
            content,
            insertImage,
            arrowFlag,
        } = this.props.attributes;

        let for_ = this.props.for_;

        return (
            <div className={"vk_your-block-slug"}>hello</div>
        );
    }
}
