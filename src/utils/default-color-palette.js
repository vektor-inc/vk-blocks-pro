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
				label={ __( 'Default Color:', 'vk-blocks' ) }
				selected={ dcpColor }
				options={ [
					{ label: __( 'Primary', 'vk-blocks' ), value: 'primary' },
					{
						label: __( 'Secondary', 'vk-blocks' ),
						value: 'secondary',
					},
					{ label: __( 'Success', 'vk-blocks' ), value: 'success' },
					{ label: __( 'Info', 'vk-blocks' ), value: 'info' },
					{ label: __( 'Warning', 'vk-blocks' ), value: 'warning' },
					{ label: __( 'Danger', 'vk-blocks' ), value: 'danger' },
					{ label: __( 'Light', 'vk-blocks' ), value: 'light' },
					{ label: __( 'Dark', 'vk-blocks' ), value: 'dark' },
				] }
				onChange={ ( value ) => setAttributes( { dcpColor: value } ) }
			/>
		);
	}
}
