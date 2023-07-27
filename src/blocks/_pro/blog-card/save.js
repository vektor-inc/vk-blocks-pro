/**
 * WordPress dependencies
 */
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

export default function BlogCardSave() {
	const blockProps = useBlockProps.save();
	return (
		<div {...blockProps}>
			<InnerBlocks.Content />
		</div>
	);
}
