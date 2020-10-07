import React from 'react';
import classNames from 'classnames';

export class SpacerComponent extends React.Component {

    render() {
        const {
			anchor,
			space,
            unit,
            pc,
            tablet,
            mobile,
        } = this.props.attributes;
        const className = this.props.className;

			if ( space === 'height') {
				return (
					<div id={ anchor } className={ classNames('vk_spacer', className) }>
						<div className={ 'vk_spacer-display-pc' } style={ {height: pc + unit} }></div>
						<div className={ 'vk_spacer-display-tablet' } style={ {height: tablet + unit} }></div>
						<div className={ 'vk_spacer-display-mobile' } style={ {height: mobile + unit} }></div>
					</div>
				);
			} else if ( spaceType === 'margin-top') {
				return (
					<div id={ anchor } className={ classNames('vk_spacer', className) }>
						<div className={ 'vk_spacer-display-pc' } style={ {marginTop: pc + unit} }></div>
						<div className={ 'vk_spacer-display-tablet' } style={ {marginTop: tablet + unit} }></div>
						<div className={ 'vk_spacer-display-mobile' } style={ {marginTop: mobile + unit} }></div>
					</div>
				);
			}
    }
}
