import { RichText, InnerBlocks } from '@wordpress/block-editor';

export default function save({ attributes }) {
	const { heading } = attributes;
	return (
		<dl className={`vk_faq`}>
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
