import React from 'react';

export class SpacerComponent extends React.Component {

    render() {
        let {
            unit,
            pc,
            tablet,
            mobile,
        } = this.props.attributes;

        return (
            <div className="vk_spacer">
                <div className={'vk_spacer-display-pc'} style={{height: pc + unit}}></div>
                <div className={'vk_spacer-display-tablet'} style={{height: tablet + unit}}></div>
                <div className={'vk_spacer-display-mobile'} style={{height: mobile + unit}}></div>
            </div>
        );
    }
}