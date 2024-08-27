/**
 * WordPress dependencies
 */
import { useInnerBlocksProps, useBlockProps } from '@wordpress/block-editor';

export default function BlogCardSave() {
	return <div {...useInnerBlocksProps.save(useBlockProps.save())} />;
}
