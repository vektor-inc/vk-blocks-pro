import { RichText, InnerBlocks, useBlockProps } from '@wordpress/block-editor';

export default function save({ attributes }) {
	let {
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

	balloonType =
		balloonType !== undefined &&
		balloonType !== null &&
		balloonType !== 'type-serif'
			? balloonType
			: 'type-speech';

	balloonAlign =
		balloonAlign !== undefined && balloonAlign !== null
			? balloonAlign
			: 'position-left';

	balloonImageType =
		balloonImageType !== undefined && balloonImageType !== null
			? balloonImageType
			: 'normal';

	balloonAnimation =
		balloonAnimation !== undefined && balloonAnimation !== null
			? balloonAnimation
			: 'none';

	balloonBorder =
		balloonBorder !== undefined && balloonBorder !== null
			? balloonBorder
			: false;

	balloonImageBorder =
		balloonImageBorder !== undefined && balloonImageBorder !== null
			? balloonImageBorder
			: false;

	balloonBorderColor =
		balloonBorderColor !== undefined && balloonBorderColor !== null
			? balloonBorderColor
			: '#cccccc';

	balloonBgColor =
		balloonBgColor !== undefined && balloonBgColor !== null
			? balloonBgColor
			: '#f5f5f5';

	let contentBorderClass;
	let iconImageBorderClass;
	let borderColorStyle;
	let backgroundColorStyle;

	if (balloonBorder === true) {
		contentBorderClass = 'vk_balloon_content-border-true';

		if (balloonImageBorder === true) {
			iconImageBorderClass = 'vk_balloon_icon_image-border-true';
		} else {
			iconImageBorderClass = '';
		}

		borderColorStyle = balloonBorderColor;
		backgroundColorStyle = balloonBgColor;
	} else {
		contentBorderClass = '';
		iconImageBorderClass = '';
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
			{...useBlockProps.save({
				className: `vk_balloon vk_balloon-${balloonAlign} vk_balloon-${balloonType} vk_balloon-animation-${balloonAnimation}`,
			})}
		>
			<div className={`vk_balloon_icon`}>
				{IconImage ? (
					<figure>
						<img
							className={`vk_balloon_icon_image vk_balloon_icon_image-type-${balloonImageType} ${iconImageBorderClass}`}
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
					className={`vk_balloon_content ${contentBorderClass}`}
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
