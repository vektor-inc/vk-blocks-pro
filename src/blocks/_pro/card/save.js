import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

export default function save({ attributes }) {
	const { blockId } = attributes;
	const blockProps = useBlockProps.save({
		className: `vk_posts vk_card_${blockId}`,
	});

	return (
		<div {...blockProps}>
			<InnerBlocks.Content />
		</div>
	);
}
