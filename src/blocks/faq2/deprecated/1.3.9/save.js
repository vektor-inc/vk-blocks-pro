import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

export default function save() {
	return (
		<dl
			{...useBlockProps.save({
				className: `vk_faq [accordion_trigger_switch]`,
			})}
		>
			<InnerBlocks.Content />
		</dl>
	);
}
