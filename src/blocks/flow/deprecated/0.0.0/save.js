import { RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
	const { heading, content, insertImage, arrowFlag } = attributes;

	return (
		<div className={`${arrowFlag} vk_flow`}>
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
				{insertImage ? (
					<div className={'vk_flow_frame_image'}>
						<img src={insertImage} alt="" />
					</div>
				) : (
					''
				)}
			</div>
		</div>
	);
}
