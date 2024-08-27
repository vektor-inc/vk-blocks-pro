import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

export default function save() {
	return (
		<dt
			{...useBlockProps.save({
				className: `vk_faq_title`,
				'aria-label': __('Question', 'vk-blocks-pro'),
			})}
		>
			<InnerBlocks.Content />
		</dt>
	);
}
