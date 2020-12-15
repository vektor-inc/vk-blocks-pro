import { RichText, InnerBlocks } from '@wordpress/block-editor';

export default function save({ attributes }) {
	const {
		balloonName,
		balloonType,
		balloonBorder,
		balloonImageBorder,
		balloonBorderColor,
		balloonBgColor,
		balloonAlign,
		IconImage,
		balloonImageType,
		balloonAnimation,
	} = attributes;

	let classContentBorder;
	let classIconImageBorder;
	let borderColorStyle;
	let backgroundColorStyle;

	if (balloonBorder === true) {
		classContentBorder = 'vk_balloon_content-border-true';

		if (balloonImageBorder === true) {
			classIconImageBorder = 'vk_balloon-image-border';
		} else {
			classIconImageBorder = '';
		}

		borderColorStyle = balloonBorderColor;
		backgroundColorStyle = balloonBgColor;
	} else {
		classContentBorder = '';
		classIconImageBorder = '';
		borderColorStyle = balloonBgColor;
		backgroundColorStyle = balloonBgColor;
	}

	let triangleBorderColorStyle;
	if (balloonAlign === 'position-right') {
		triangleBorderColorStyle = `transparent transparent transparent ${backgroundColorStyle}`;
	} else {
		triangleBorderColorStyle = `transparent ${backgroundColorStyle} transparent transparent`;
	}

	return (
		<div
			className={`vk_balloon vk_balloon-${balloonAlign} vk_balloon-${balloonType} vk_balloon-animation-${balloonAnimation}`}
		>
			<div className={`vk_balloon_icon`}>
				{IconImage ? (
					<figure>
						<img
							className={`vk_balloon_icon_image vk_balloon-image-${balloonImageType} ${classIconImageBorder}`}
							style={{ borderColor: borderColorStyle }}
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
			<div className={`vk_balloon_content_outer`}>
				<div
					className={`vk_balloon_content ${classContentBorder}`}
					style={{
						backgroundColor: backgroundColorStyle,
						borderColor: borderColorStyle,
					}}
				>
					<span
						className={`vk_balloon_content_before`}
						style={{
							borderColor: triangleBorderColorStyle,
						}}
					></span>
					<span
						className={`vk_balloon_content_after`}
						style={{
							borderColor: triangleBorderColorStyle,
						}}
					></span>
					<InnerBlocks.Content />
				</div>
			</div>
		</div>
	);
}
