
const { __ } = wp.i18n;
const { Fragment } = wp.element;
const { TextControl } = wp.components;
import formatNum from "../../blocks/_helper/formatNum";

const AdvancedViewportControl = (props) => {
  const { attributes, setAttributes } = props;
  const { pc,tablet,mobile } = attributes

  return (
	  <Fragment>
		  <TextControl
		  	label={__('PC', 'vk-blocks')}
		  	value={pc}
			onChange={(value) => setAttributes({ pc: formatNum(value, pc) })}
			type={"number"}
		/>
		<TextControl
			label={__('Tablet', 'vk-blocks')}
			value={tablet}
			onChange={(value) => setAttributes({ tablet: formatNum(value, tablet) })}
			type={"number"}
		/>
		<TextControl
			label={__('Mobile', 'vk-blocks')}
			value={mobile}
			onChange={(value) => setAttributes({ mobile: formatNum(value, mobile) })}
			type={"number"}
		/>
	  </Fragment>
  );
};
export default AdvancedViewportControl
