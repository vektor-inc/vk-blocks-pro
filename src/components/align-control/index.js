import { __, sprintf } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import { Toolbar } from '@wordpress/components';
import { alignLeft, alignRight, alignCenter } from '@wordpress/icons';

export const AlignControl = (props) => {
	const { setAttributes, schema, initial, component } = props;
	const [activeControl, setActiveControl] = useState(initial);

	function createAlignControl(align) {
		let alignIcon = '';
		if (align === 'left') {
			alignIcon = alignLeft;
		} else if (align === 'center') {
			alignIcon = alignCenter;
		} else if (align === 'right') {
			alignIcon = alignRight;
		}
		return {
			icon: alignIcon,
			// translators: %s is align.
			title: sprintf(__(`Align %s`, 'vk-blocks-pro'), align),
			isActive: activeControl === align,
			onClick: () => {
				schema[component] = align;
				setAttributes({ activeControl: JSON.stringify(schema) });
				setActiveControl(align);
			},
		};
	}
	return (
		<Toolbar
			controls={['left', 'center', 'right'].map(createAlignControl)}
		/>
	);
};
