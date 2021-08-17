import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

export default function AccordionEdit() {
	const blockProps = useBlockProps({
		className: `vk_accordion`,
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
			<InnerBlocks
				allowedBlocks={ALLOWED_BLOCKS}
				template={TEMPLATE}
				templateLock="all"
			/>
		</div>
	);
}
