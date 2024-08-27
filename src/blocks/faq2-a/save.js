import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

export default function save() {
	return (
		<dd
			{...useBlockProps.save({
				className: `vk_faq_content`,
				'aria-label': __('Answer', 'vk-blocks-pro'),
			})}
		>
			<InnerBlocks.Content />
		</dd>
	);
}
