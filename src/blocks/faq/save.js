import { RichText, InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

export default function save({ attributes }) {
	const { heading } = attributes;
	return (
		<dl
			{...useBlockProps.save({
				className: `vk_faq [accordion_trigger_switch]`,
				'aria-label': __('Question', 'vk-blocks-pro'),
			})}
		>
			<RichText.Content
				tagName="dt"
				className={'vk_faq_title'}
				value={heading}
			/>
			<dd
				className={`vk_faq_content`}
				aria-label={__('Answer', 'vk-blocks-pro')}
			>
				<InnerBlocks.Content />
			</dd>
		</dl>
	);
}
