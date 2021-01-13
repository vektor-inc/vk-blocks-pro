import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

export default function save() {
	const blockProps = useBlockProps.save({
		className: `vk_grid-column-item`,
	});

	return (
		<>
			<div {...blockProps}>
				<InnerBlocks.Content />
			</div>
		</>
	);
}
