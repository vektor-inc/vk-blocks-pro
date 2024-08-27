import { Component } from '@wordpress/element';
import classNames from 'classnames';

export class SpacerComponent extends Component {

    render() {
        const {
			anchor,
			spaceType,
            unit,
            pc,
            tablet,
            mobile,
        } = this.props.attributes;
        const className = this.props.className;
			if ( spaceType === 'height') {
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
