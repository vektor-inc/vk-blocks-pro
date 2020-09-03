import React from 'react';

export class SpacerComponentV1 extends React.Component {

    render() {
        const {
            unit,
            pc,
            tablet,
            mobile,
        } = this.props.attributes;

        return (
	<div className="vk_spacer">
		<div className={ 'vk_spacer-display-pc' } style={ {height: pc + unit} }></div>
		<div className={ 'vk_spacer-display-tablet' } style={ {height: tablet + unit} }></div>
		<div className={ 'vk_spacer-display-mobile' } style={ {height: mobile + unit} }></div>
	</div>
        );
    }
}

export class SpacerComponentV2 extends React.Component {

    render() {
        const {
            unit,
            pc,
            tablet,
            mobile,
        } = this.props.attributes;
        const className = this.props.className;

        return (
	<div className={ `${className} vk_spacer` }>
		<div className={ 'vk_spacer-display-pc' } style={ {height: pc + unit} }></div>
		<div className={ 'vk_spacer-display-tablet' } style={ {height: tablet + unit} }></div>
		<div className={ 'vk_spacer-display-mobile' } style={ {height: mobile + unit} }></div>
	</div>
        );
    }
}
