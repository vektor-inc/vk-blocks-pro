import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import React from 'react';

export default function save({ attributes }) {
	const { clientId } = attributes;
	const blockProps = useBlockProps.save({
		className: `vk_posts vk_card_${clientId}`,
	});

	return (
		<div {...blockProps}>
			<InnerBlocks.Content />
		</div>
	);
}
