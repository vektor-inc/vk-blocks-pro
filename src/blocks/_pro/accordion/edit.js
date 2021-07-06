import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

export default function AccordionEdit() {
	const blockProps = useBlockProps({
		className: `vk_accordion-container`,
	});

	const ALLOWED_BLOCKS = [
		'vk-blocks/accordion-trigger',
		'vk-blocks/accordion-target',
	];

	const TEMPLATE = [
		['vk-blocks/accordion-trigger'],
		['vk-blocks/accordion-target'],
	];

	return (
		<div {...blockProps}>
			<div className="vk_accordion-header"></div>
			<div className="vk_accordion-body">
				<InnerBlocks
					allowedBlocks={ALLOWED_BLOCKS}
					template={TEMPLATE}
					templateLock="all"
				/>
			</div>
			<div className="vk_accordion-footer"></div>
		</div>
	);
}
