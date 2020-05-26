import React from "react";

const { TextControl } = wp.components;
const { __ } = wp.i18n;

export const faSchema = {
	faIcon: {
		type: 'string',
		default: '',
	},
};

export class FontAwesome extends React.Component {

	render() {
		const { faIcon } = this.props.attributes;
		const setAttributes = this.props.setAttributes;

		return (
			<TextControl
				label={ __('FontAwesome', 'vk-blocks') }
				help={
					<span>{ __('Enter Font Awesome Class. Ex) fas fa-arrow-circle-right ', 'vk-blocks') }
						<a href={ `https://fontawesome.com/icons?d=gallery&m=free` }
							target={ `_blank` }>{ __('Font Awesome icon list', 'vk-blocks') }</a></span> }
				value={ faIcon }
				onChange={ (value) => setAttributes({ faIcon: value }) }
				placeholder={ 'fas fa-arrow-circle-right' }
			/>
		);
	}
}
