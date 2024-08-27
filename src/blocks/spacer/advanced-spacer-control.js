import { __ } from '@wordpress/i18n';
import { SelectControl } from '@wordpress/components';

const AdvancedSpacerControl = (props) => {
	const { attributes, setAttributes } = props;
	const { spaceType } = attributes;
	return (
		<SelectControl
			label={__('Space Type', 'vk-blocks-pro')}
			value={spaceType}
			onChange={(value) => setAttributes({ spaceType: value })}
			options={[
				{
					value: 'height',
					label: __('height', 'vk-blocks-pro'),
				},
				{
					value: 'margin-top',
					label: __('margin-top', 'vk-blocks-pro'),
				},
				{
					value: 'margin-bottom',
					label: __('margin-bottom', 'vk-blocks-pro'),
				},
			]}
		/>
	);
};

export default AdvancedSpacerControl;
