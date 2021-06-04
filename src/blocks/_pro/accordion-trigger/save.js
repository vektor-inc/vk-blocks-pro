import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

export default function save() {
	const blockProps = useBlockProps.save({
		className: `vk_accordion-trigger`,
	});

	return (
		<div {...blockProps}>
			<InnerBlocks.Content />
			<button
				className={`vk_accordion-toggle vk_accordion-toggle-close`}
			></button>
		</div>
	);
}
