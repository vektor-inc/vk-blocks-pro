import { __ } from '@wordpress/i18n';
import {
	PanelBody,
	TextControl,
	RangeControl,
	__experimentalUnitControl as UnitControl
} from '@wordpress/components';

import {
	useBlockProps,
	InnerBlocks,
	InspectorControls
} from '@wordpress/block-editor';

export default function LayoutColumnItemEdit(props) {
	const { attributes, setAttributes } = props;
	let {

	} = attributes;

	const blockProps = useBlockProps({
		className: `vk_layoutColumnItem`,
	});

	return (
		<>
		<div {...blockProps}>
			<InnerBlocks />
		</div>
		</>
	);
}
