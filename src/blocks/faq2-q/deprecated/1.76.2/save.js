import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

export default function save() {
	return (
		<dt
			{...useBlockProps.save({
				className: `vk_faq_title`,
			})}
		>
			<InnerBlocks.Content />
		</dt>
	);
}
