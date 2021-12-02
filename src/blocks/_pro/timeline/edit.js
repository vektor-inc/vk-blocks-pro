import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

export default function TilelineEdit() {
	const blockProps = useBlockProps({
		className: `vk_timeline`,
	});
	const ALLOWED_BLOCKS = ['vk-blocks/timeline-item'];
	const TEMPLATE = [['vk-blocks/timeline-item']];
	return (
		<>
			<div {...blockProps}>
				<InnerBlocks
					template={TEMPLATE}
					allowedBlocks={ALLOWED_BLOCKS}
				/>
			</div>
		</>
	);
}
