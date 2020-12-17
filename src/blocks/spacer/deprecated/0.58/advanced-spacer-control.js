const { __ } = wp.i18n;
const { SelectControl } = wp.components;

const AdvancedSpacerControl = (props) => {
  const { attributes, setAttributes } = props;
  const { spaceType } = attributes
  return (
	<SelectControl
		label={ __('Space Type', 'vk-blocks') }
		value={ spaceType }
		onChange={ (value) => setAttributes({ spaceType: value }) }
		options={ [
			{
				value: 'height',
				label: __('height', 'vk-blocks'),
			},
			{
				value: 'margin-top',
				label: __('margin-top', 'vk-blocks'),
			}
		] }
	/>
  );
};

export default AdvancedSpacerControl
