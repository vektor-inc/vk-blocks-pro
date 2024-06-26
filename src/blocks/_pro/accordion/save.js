import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

export default function save(props) {
	const {
		containerClass,
		initialState,
		initialStateMobile,
		initialStateTablet,
		initialStateDesktop,
		isDeviceSpecific,
	} = props.attributes;
	const blockProps = useBlockProps.save({
		className: containerClass,
		'data-initial-state': initialState,
		'data-initial-state-mobile': initialStateMobile,
		'data-initial-state-tablet': initialStateTablet,
		'data-initial-state-desktop': initialStateDesktop,
		'data-device-specific': isDeviceSpecific,
	});

	return (
		<div {...blockProps}>
			<InnerBlocks.Content />
		</div>
	);
}
