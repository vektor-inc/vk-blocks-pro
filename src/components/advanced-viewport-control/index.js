/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	__experimentalNumberControl as NumberControl // eslint-disable-line @wordpress/no-unsafe-wp-apis
} from '@wordpress/components';

const AdvancedViewportControl = (props) => {
	const { attributes, setAttributes, initial } = props;
	let { pc, tablet, mobile } = attributes;
	const { iPc, iTablet, iMobile } = initial;

	if (pc ?? true) {
		pc = iPc;
	}
	if (tablet ?? true) {
		tablet = iTablet;
	}
	if (mobile ?? true) {
		mobile = iMobile;
	}

	return (
		<>
			<NumberControl
				className={'components-base-control'}
				label={__('PC', 'vk-blocks')}
				value={pc}
				onChange={(value) =>
					setAttributes({ pc: parseFloat(value) })
				}
			/>
			<NumberControl
				className={'components-base-control'}
				label={__('Tablet', 'vk-blocks')}
				value={tablet}
				onChange={(value) =>
					setAttributes({ tablet: parseFloat(value) })
				}
			/>
			<NumberControl
				className={'components-base-control'}
				label={__('Mobile', 'vk-blocks')}
				value={mobile}
				onChange={(value) =>
					setAttributes({ mobile: parseFloat(value) })
				}
			/>
		</>
	);
};
export default AdvancedViewportControl;
