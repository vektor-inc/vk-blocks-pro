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
			<fragment>
				<TextControl
					label={ __('Font Awesome', 'vk-blocks') }
					value={ faIcon }
					onChange={ (value) => setAttributes({ faIcon: value }) }
					placeholder={ 'fas fa-arrow-circle-right' }
					className="mb-0"
			/>
				<p className="mt-1">{ __('Enter Font Awesome Class.', 'vk-blocks') }<br />
					{ __('Ex) fas fa-arrow-circle-right', 'vk-blocks') }<br />
					<a href={ `https://fontawesome.com/icons?d=gallery&m=free` }
						target={ `_blank` }>{ __('Font Awesome icon list', 'vk-blocks') }</a></p>
			</fragment>

		);
	}
}
