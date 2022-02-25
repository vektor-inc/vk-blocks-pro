/**
 * WordPress dependencies
 */
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

export default function save() {
	const blockProps = useBlockProps.save({
		className: `vk-query-pagination`,
	});
	return (
		<div {...blockProps}>
			<InnerBlocks.Content />
		</div>
	);
}
