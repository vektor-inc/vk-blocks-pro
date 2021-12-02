import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

export default function AccordionTargetEdit() {
	const blockProps = useBlockProps({
		className: `vk_accordion-target vk_accordion-target-open`,
	});
	return (
		<div {...blockProps}>
			<InnerBlocks templateLock={false} template={[['core/paragraph']]} />
		</div>
	);
}
