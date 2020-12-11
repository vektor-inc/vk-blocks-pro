import { RichText, InnerBlocks } from '@wordpress/block-editor';

export default function save({ attributes }) {
	let {
		balloonName,
		balloonType,
		balloonBgColor,
		balloonAlign,
		IconImage,
		balloonImageType,
		balloonAnimation
	} = attributes;

	//For recovering
	balloonImageType = balloonImageType ? balloonImageType : "normal"
	balloonAnimation = balloonAnimation ? balloonAnimation : "none";

	return (
		<div
			className={ `vk_balloon vk_balloon-${balloonAlign} vk_balloon-${balloonType} vk_balloon-animation-${balloonAnimation}` }
		>
			<div className={ `vk_balloon_icon` }>
				{ IconImage ? (
					<figure>
						<img className={ `vk_balloon_icon_image vk_balloon-image-${balloonImageType}` } src={ IconImage } alt="" />
						<RichText.Content
							tagName="figcaption"
							className={ "vk_balloon_icon_name" }
							value={ balloonName }
					/>
					</figure>
				) : (
				""
				) }
			</div>
			<div className={ `vk_balloon_content_outer` }>
				<div className={ "vk_balloon_content" } style={ { background: balloonBgColor,
														border: balloonBgColor, } } >
					<InnerBlocks.Content />
				</div>
			</div>

		</div>
	);
}
