import { vkbBlockEditor } from "./../../../utils/depModules";
const { RichText, InnerBlocks } = vkbBlockEditor;

export const deprecated_v1 = {
	attributes: {
		content: {
			source: "html",
			selector: "p"
		},
		balloonName: {
			source: "html",
			selector: "figcaption"
		},
		balloonType: {
			type: "string",
			default: "type-serif"
		},
		balloonBgColor: {
			type: "string"
		},
		balloonAlign: {
			type: "string",
			default: "position-left"
		},
		IconImage: {
			type: "string",
			default: null // no image by default!
		},
	},
	save({ attributes, className }) {
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
				className={ `vk_balloon vk_balloon-${balloonAlign} vk_balloon-${balloonType}` }
			>
				<div className={ `vk_balloon_icon` }>
					{ IconImage ? (
						<figure>
							<img className={ "vk_balloon_icon_image" } src={ IconImage } alt="" />
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
				<RichText.Content
					className={ "vk_balloon_content" }
					style={ { background: balloonBgColor, border: balloonBgColor } }
					tagName="p"
					value={ content }
				/>
			</div>
		);
	}
};
