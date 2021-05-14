import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

export default function AccordionEdit() {
	const blockProps = useBlockProps({
		className: `vk_accordion-container`,
	});
	return (
		<div {...blockProps}>
			<div className="vk_accordion-header"></div>
			<div className="vk_accordion-body">
				<InnerBlocks
					allowedBlocks={[
						['vk-blocks/accordion-trigger'],
						['vk-blocks/accordion-target'],
					]}
					template={[
						['vk-blocks/accordion-trigger'],
						['vk-blocks/accordion-target'],
					]}
					templateLock="all"
				/>
			</div>
			<div className="vk_accordion-footer"></div>
		</div>
	);
}
