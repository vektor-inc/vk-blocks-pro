import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

export default function GridColumnItemEdit() {
	const blockProps = useBlockProps({
		className: `vk_grid-column-item`,
	});

	return (
		<>
			<div {...blockProps}>
				<InnerBlocks />
			</div>
		</>
	);
}
