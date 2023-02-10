/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { SelectControl } from '@wordpress/components';
import unitOptions from '@vkblocks/utils/unit-options';

const AdvancedUnitControl = (props) => {
	const { attributes, setAttributes } = props;
	const { unit } = attributes;
	return (
		<SelectControl
			label={__('Unit Type', 'vk-blocks')}
			value={unit}
			onChange={(value) => setAttributes({ unit: value })}
			options={unitOptions}
		/>
	);
};

export default AdvancedUnitControl;
