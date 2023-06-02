/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { SelectControl } from '@wordpress/components';
import { hightUnitOptions } from '@vkblocks/utils/unit-options';

const AdvancedUnitControl = (props) => {
	const { attributes, setAttributes } = props;
	const { unit } = attributes;
	return (
		<SelectControl
			label={__('Unit Type', 'vk-blocks-pro')}
			value={unit}
			onChange={(value) => setAttributes({ unit: value })}
			options={hightUnitOptions}
		/>
	);
};

export default AdvancedUnitControl;
