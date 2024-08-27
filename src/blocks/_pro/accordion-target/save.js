import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

export default function save() {
	const blockProps = useBlockProps.save({
		className: `vk_accordion-target`,
	});
	return (
		<div {...blockProps}>
			<InnerBlocks.Content />
		</div>
	);
}
