import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

export default function save() {
	return (
		<dd
			{...useBlockProps.save({
				className: `vk_faq_content`,
			})}
		>
			<InnerBlocks.Content />
		</dd>
	);
}
