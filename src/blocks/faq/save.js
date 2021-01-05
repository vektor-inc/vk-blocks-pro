import { RichText, InnerBlocks, useBlockProps } from '@wordpress/block-editor';

export default function save({ attributes }) {
	const { heading } = attributes;
	return (
		<dl {...useBlockProps.save({ className: `vk_faq` })}>
			<RichText.Content
				tagName="dt"
				className={'vk_faq_title'}
				value={heading}
			/>
			<dd className={`vk_faq_content`}>
				<InnerBlocks.Content />
			</dd>
		</dl>
	);
}
