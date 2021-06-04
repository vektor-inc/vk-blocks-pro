import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

export default function save() {
	const blockProps = useBlockProps.save({
		className: `vk_accordion-target vk_accordion-target-close`,
	});
	return (
		<div {...blockProps}>
			<InnerBlocks.Content />
		</div>
	);
}
