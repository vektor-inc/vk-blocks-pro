
const { __ } = wp.i18n;
const { SelectControl } = wp.components;

const AdvancedSpacerControl = (props) => {
  const { attributes, setAttributes } = props;
  const { space } = attributes
  return (
	<SelectControl
		label={ __('Space Type', 'vk-blocks') }
		value={ space }
		onChange={ (value) => setAttributes({ space: value }) }
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
