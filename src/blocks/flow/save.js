import { RichText, useBlockProps } from '@wordpress/block-editor';

export default function save({ attributes }) {
	const { heading, content, insertImage, insertImageAlt, arrowFlag } =
		attributes;

	return (
		<div {...useBlockProps.save({ className: `${arrowFlag} vk_flow` })}>
			<div className={'vk_flow_frame'}>
				<dl className={'vk_flow_frame_text'}>
					<RichText.Content
						tagName="dt"
						className={'vk_flow_frame_text_title'}
						value={heading}
					/>
					<RichText.Content
						tagName="dd"
						className={'vk_flow_frame_text_content'}
						value={content}
					/>
				</dl>
				{insertImage && (
					<div className={'vk_flow_frame_image'}>
						<img src={insertImage} alt={insertImageAlt} />
					</div>
				)}
			</div>
		</div>
	);
}
