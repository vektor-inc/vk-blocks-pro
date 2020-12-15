import { RichText } from '@wordpress/block-editor';

export default function save({ attributes, className }) {
	const { heading, content } = attributes;

	return (
		<dl className={`${className} vk_faq`}>
			<RichText.Content
				tagName="dt"
				className={'vk_faq_title'}
				value={heading}
			/>
			<RichText.Content
				tagName="dd"
				className={'vk_faq_content'}
				value={content}
			/>
		</dl>
	);
}
