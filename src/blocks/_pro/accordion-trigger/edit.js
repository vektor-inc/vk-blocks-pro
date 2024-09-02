import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

export default function AccordionTriggerEdit() {
	const blockProps = useBlockProps({
		className: `vk_accordion-trigger`,
	});
	return (
		<>
			<div {...blockProps}>
				<InnerBlocks
					templateLock={false}
					template={[['core/paragraph']]}
				/>
				<span
					className={`vk_accordion-toggle vk_accordion-toggle-close`}
				></span>
			</div>
		</>
	);
}
