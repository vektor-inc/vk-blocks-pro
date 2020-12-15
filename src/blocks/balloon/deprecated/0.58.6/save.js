import { RichText, InnerBlocks } from '@wordpress/block-editor';

export default function save({ attributes }) {
	const {
		balloonName,
		balloonType,
		balloonBorder,
		balloonImageBorder,
		balloonBorderWidth,
		balloonBorderColor,
		balloonBgColor,
		balloonAlign,
		IconImage,
		balloonImageType,
		balloonAnimation
	} = attributes;

	let class_content_border;
	let class_icon_image_border;
	let border_color_style;
	let background_color_style;

	if ( balloonBorder === true ) {
		class_content_border = "vk_balloon_content-border-true";

		if ( balloonImageBorder === true ) {
			class_icon_image_border = "vk_balloon_icon_image-border-true";
		}
		else {
			class_icon_image_border = "";
		}


		border_color_style     = balloonBorderColor;
		background_color_style = balloonBgColor;
	}
	else {
		class_content_border          = "";
		class_icon_image_border     = "";
		border_color_style     = balloonBgColor;
		background_color_style = balloonBgColor;
	}

	let triangle_border_color_style;
	if ( balloonAlign === 'position-right' ) {
		triangle_border_color_style = `transparent transparent transparent ${background_color_style}`;
	} else {
		triangle_border_color_style = `transparent ${background_color_style} transparent transparent`;
	}

	return (
		<div
			className={ `vk_balloon vk_balloon-${balloonAlign} vk_balloon-${balloonType} vk_balloon-animation-${balloonAnimation}` }
		>
			<div
				className={ `vk_balloon_icon` }
			>
				{ IconImage ? (
					<figure>
						<img
							className={ `vk_balloon_icon_image vk_balloon_icon_image-type-${balloonImageType} ${class_icon_image_border}` }
							style={ { borderColor: border_color_style, } }
							src={ IconImage }
							alt=""
						/>
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
				<div
					className={ `vk_balloon_content ${class_content_border}` }
					style={ {
						backgroundColor: background_color_style,
						borderColor: border_color_style,
					} }
				>
					<span
						className = { `vk_balloon_content_before`}
						style     = { {
							borderColor: triangle_border_color_style,
						} }
					>
					</span>
					<span
						className={ `vk_balloon_content_after` }
						style     = { {
							borderColor: triangle_border_color_style,
						} }
					>
					</span>
					<InnerBlocks.Content />
				</div>
			</div>

		</div>
	);

}
