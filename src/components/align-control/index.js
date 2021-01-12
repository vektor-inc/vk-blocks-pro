import { __, sprintf } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import { Toolbar } from '@wordpress/components';

export const AlignControl = (props) => {
	const { setAttributes, schema, initial, component } = props;
	const [activeControl, setActiveControl] = useState(initial);

	function createAlignControl(align) {
		return {
			icon: `editor-align${align}`,
			// translators: %s is align.
			title: sprintf(__(`Align %s`, 'vk-blocks'), align),
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
