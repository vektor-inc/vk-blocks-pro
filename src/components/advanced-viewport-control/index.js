
const { __ } = wp.i18n;
const { Fragment } = wp.element;
const { TextControl } = wp.components;

const AdvancedViewportControl = (props) => {
  const { attributes, setAttributes } = props;
  const { pc,tablet,mobile } = attributes

  return (
	  <Fragment>
		  <TextControl
		  	label={__('PC', 'vk-blocks')}
		  	value={pc}
			onChange={(value) => setAttributes({ pc: parseFloat(value) })}
			type={"number"}
		/>
		<TextControl
			label={__('Tablet', 'vk-blocks')}
			value={tablet}
			onChange={(value) => setAttributes({ tablet: parseFloat(value) })}
			type={"number"}
		/>
		<TextControl
			label={__('Mobile', 'vk-blocks')}
			value={mobile}
			onChange={(value) => setAttributes({ mobile: parseFloat(value) })}
			type={"number"}
		/>
	  </Fragment>
  );
};
export default AdvancedViewportControl
