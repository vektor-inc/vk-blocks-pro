/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { NumberControl } from '@wordpress/components';

const AdvancedViewportControl = (props) => {
	const { attributes, setAttributes, initial } = props;
	let { pc, tablet, mobile } = attributes;
	const { iPc, iTablet, iMobile } = initial;

	if (!pc) {
		pc = iPc;
	}
	if (!tablet) {
		tablet = iTablet;
	}
	if (!mobile) {
		mobile = iMobile;
	}

	return (
		<>
			<NumberControl
				label={__('PC', 'vk-blocks')}
				value={pc}
				onChange={(value) =>
					setAttributes({ pc: parseFloat(value) })
				}
				type={'number'}
			/>
			<NumberControl
				label={__('Tablet', 'vk-blocks')}
				value={tablet}
				onChange={(value) =>
					setAttributes({ tablet: parseFloat(value) })
				}
				type={'number'}
			/>
			<NumberControl
				label={__('Mobile', 'vk-blocks')}
				value={mobile}
				onChange={(value) =>
					setAttributes({ mobile: parseFloat(value) })
				}
				type={'number'}
			/>
		</>
	);
};
export default AdvancedViewportControl;
