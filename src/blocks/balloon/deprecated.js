import { vkbBlockEditor } from "./../_helper/depModules";
const { RichText, InnerBlocks } = vkbBlockEditor;

export const deprecated = [
	{
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
	},
	{
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
			balloonImageType: {
				type: "string",
				default: "normal"
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
				balloonImageType
			} = attributes;

			return (
				<div
					className={ `vk_balloon vk_balloon-${balloonAlign} vk_balloon-${balloonType}` }
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
					<RichText.Content
						className={ "vk_balloon_content" }
						style={ { background: balloonBgColor, border: balloonBgColor } }
						tagName="p"
						value={ content }
					/>
				</div>
			);
		}
	},
	{
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
			balloonImageType: {
				type: "string",
				default: "normal" // no image by default!
			},
			balloonAnimation: {
				type: "string",
				default: "none" // no image by default!
			},
		},
		save({ attributes }) {
			let {
			  content,
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
						<RichText.Content
							className={ "vk_balloon_content" }
							style={ { background: balloonBgColor, border: balloonBgColor } }
							tagName="p"
							value={ content }
				/>
					</div>

				</div>
			);
		  }
	},
	{
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
			balloonImageType: {
				type: "string",
				default: "normal" // no image by default!
			},
			balloonAnimation: {
				type: "string",
				default: "none" // no image by default!
			},
		},
		save({ attributes }) {
			let {
				content,
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
	},
];
