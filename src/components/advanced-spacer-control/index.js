
const { __ } = wp.i18n;
const { SelectControl } = wp.components;

const AdvancedSpacerControl = (props) => {
  const { attributes, setAttributes } = props;
  const { space } = attributes
  return (
	<SelectControl
		label={ __('Unit Type', 'vk-blocks') }
		value={ space }
		onChange={ (value) => setAttributes({ space: value }) }
		options={ [
			{
				value: 'height',
				label: __('height', 'vk-blocks'),
			},
		] }
	/>
  );
};

export default AdvancedSpacerControl
