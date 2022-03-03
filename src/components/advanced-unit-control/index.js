/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { SelectControl } from '@wordpress/components';

const AdvancedUnitControl = ( props ) => {
	const { attributes, setAttributes } = props;
	const { unit } = attributes;
	return (
		<SelectControl
			label={ __( 'Unit Type', 'vk-blocks' ) }
			value={ unit }
			onChange={ ( value ) => setAttributes( { unit: value } ) }
			options={ [
				{
					value: 'px',
					label: __( 'px', 'vk-blocks' ),
				},
				{
					value: 'em',
					label: __( 'em', 'vk-blocks' ),
				},
				{
					value: 'rem',
					label: __( 'rem', 'vk-blocks' ),
				},
				{
					value: 'vw',
					label: __( 'vw', 'vk-blocks' ),
				},
			] }
		/>
	);
};

export default AdvancedUnitControl;
