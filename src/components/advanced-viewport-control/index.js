/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { TextControl } from '@wordpress/components';

const AdvancedViewportControl = (props) => {
	const { attributes, setAttributes, initial } = props;
	let { pc, tablet, mobile } = attributes;
	const { iPc, iTablet, iMobile } = initial;

	if (isNaN(pc)) {
		pc = iPc;
	}
	if (isNaN(tablet)) {
		tablet = iTablet;
	}
	if (isNaN(mobile)) {
		mobile = iMobile;
	}

	return (
		<>
			<TextControl
				label={__('PC', 'vk-blocks-pro')}
				value={pc}
				onChange={(value) => setAttributes({ pc: parseFloat(value) })}
				type={'number'}
				min={0}
			/>
			<TextControl
				label={__('Tablet', 'vk-blocks-pro')}
				value={tablet}
				onChange={(value) =>
					setAttributes({ tablet: parseFloat(value) })
				}
				type={'number'}
				min={0}
			/>
			<TextControl
				label={__('Mobile', 'vk-blocks-pro')}
				value={mobile}
				onChange={(value) =>
					setAttributes({ mobile: parseFloat(value) })
				}
				type={'number'}
				min={0}
			/>
		</>
	);
};
export default AdvancedViewportControl;
