import { RadioControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

export const dcpSchema = {
	dcpColor: {
		type: 'string',
		default: 'primary',
	},
};
// eslint-disable-next-line no-undef
export class DefaultColorPalette extends React.Component {
	render() {
		const { dcpColor } = this.props.attributes;
		const setAttributes = this.props.setAttributes;

		return (
			<RadioControl
				label={__('Default Color:', 'vk-blocks-pro')}
				selected={dcpColor}
				options={[
					{ label: __('Primary', 'vk-blocks-pro'), value: 'primary' },
					{
						label: __('Secondary', 'vk-blocks-pro'),
						value: 'secondary',
					},
					{ label: __('Success', 'vk-blocks-pro'), value: 'success' },
					{ label: __('Info', 'vk-blocks-pro'), value: 'info' },
					{ label: __('Warning', 'vk-blocks-pro'), value: 'warning' },
					{ label: __('Danger', 'vk-blocks-pro'), value: 'danger' },
					{ label: __('Light', 'vk-blocks-pro'), value: 'light' },
					{ label: __('Dark', 'vk-blocks-pro'), value: 'dark' },
				]}
				onChange={(value) => setAttributes({ dcpColor: value })}
			/>
		);
	}
}
