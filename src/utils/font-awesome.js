import { TextControl } from '@wordpress/components';
import { Component } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

export const faSchema = {
	faIcon: {
		type: 'string',
		default: '',
	},
};

export class FontAwesome extends Component {
	render() {
		const { faIcon } = this.props.attributes;
		const setAttributes = this.props.setAttributes;

		return (
			<>
				<TextControl
					label={__('Font Awesome', 'vk-blocks-pro')}
					value={faIcon}
					onChange={(value) => setAttributes({ faIcon: value })}
					placeholder={'fas fa-arrow-circle-right'}
					className="mb-0"
				/>
				<p className="mt-1">
					{__('Enter Font Awesome Class.', 'vk-blocks-pro')}
					<br />
					{__('Ex) fas fa-arrow-circle-right', 'vk-blocks-pro')}
					<br />
					<a
						href={`https://fontawesome.com/icons?d=gallery&m=free`}
						target={`_blank`}
					>
						{__('Font Awesome icon list', 'vk-blocks-pro')}
					</a>
				</p>
			</>
		);
	}
}
