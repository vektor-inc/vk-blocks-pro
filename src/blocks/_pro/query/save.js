/**
 * WordPress dependencies
 */
import { useInnerBlocksProps, useBlockProps } from '@wordpress/block-editor';

export default function QuerySave({ attributes: { tagName: Tag = 'div' } }) {
	const blockProps = useBlockProps.save({ className: `vk_query` });
	const innerBlocksProps = useInnerBlocksProps.save(blockProps);
	return <Tag {...innerBlocksProps} />;
}
