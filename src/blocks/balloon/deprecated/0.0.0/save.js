import { RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
	const {
		content,
		balloonName,
		balloonType,
		balloonBgColor,
		balloonAlign,
		IconImage,
	} = attributes;

	return (
		<div
			className={`vk_balloon vk_balloon-${balloonAlign} vk_balloon-${balloonType}`}
		>
			<div className={`vk_balloon_icon`}>
				{IconImage ? (
					<figure>
						<img
							className={'vk_balloon_icon_image'}
							src={IconImage}
							alt=""
						/>
						<RichText.Content
							tagName="figcaption"
							className={'vk_balloon_icon_name'}
							value={balloonName}
						/>
					</figure>
				) : (
					''
				)}
			</div>
			<RichText.Content
				className={'vk_balloon_content'}
				style={{ background: balloonBgColor, border: balloonBgColor }}
				tagName="p"
				value={content}
			/>
		</div>
	);
}
