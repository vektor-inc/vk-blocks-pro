/**
 * Baloon block type
 *
 */
import { deprecated } from './deprecated';
import { vkbBlockEditor } from "./../_helper/depModules";
import { iconPicture, content, iconName, baseColor } from "../_helper/example-data"
const apiFetch = wp.apiFetch;
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { ButtonGroup, PanelBody, Button, SelectControl } = wp.components;
const { Fragment, useState, useEffect } = wp.element;
const { RichText, InspectorControls, MediaUpload, ColorPalette, InnerBlocks } = vkbBlockEditor;
const BlockIcon = (
	<svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path fill-rule="evenodd" clip-rule="evenodd" d="M18 1.2H8.714a1.8 1.8 0 00-1.8 1.8v.269a2.2 2.2 0 01-1.533 2.096l-.93.296 1.15.487a2.156 2.156 0 011.313 1.985c0 .92.747 1.667 1.668 1.667H18A1.8 1.8 0 0019.8 8V3A1.8 1.8 0 0018 1.2zM5.132 7.253c.353.15.582.496.582.88A2.867 2.867 0 008.582 11H18a3 3 0 003-3V3a3 3 0 00-3-3H8.714a3 3 0 00-3 3v.269a1 1 0 01-.697.953L1 5.5l4.132 1.753z" fill="#000" />
		<path fill-rule="evenodd" clip-rule="evenodd" d="M9.889 6.1H9V4.9h.889v1.2zm2.667 0h-1.778V4.9h1.778v1.2zm2.666 0h-1.778V4.9h1.778v1.2zM17 6.1h-.889V4.9H17v1.2zM21.214 16.695c0 .304.154.587.408.753L24 19l-2.225 1.09c-.343.167-.56.518-.56.9a3.009 3.009 0 01-3 3.01H14a3 3 0 01-3-3v-3.885l1.055-1.111a1.582 1.582 0 00.38-1.564c.456-.28.992-.44 1.565-.44h4.519a2.695 2.695 0 012.695 2.695zm-3 6.105H14a1.8 1.8 0 01-1.8-1.8v-4a1.8 1.8 0 011.8-1.8h4.519c.826 0 1.495.67 1.495 1.495 0 .71.358 1.37.952 1.758l.61.398-.329.16a2.203 2.203 0 00-1.233 1.979c0 1-.811 1.81-1.8 1.81z" fill="#000" />
		<path d="M10.89 14.778l-3.267.008a.11.11 0 00-.102.075l-.25.722c-.022.076.03.152.103.152h1.27c.095 0 .146.122.08.19L6.7 18.105h.007l1.042 3.397c.022.076-.03.145-.103.145h-1.02a.104.104 0 01-.102-.076L6 19.83c-.029-.107-.168-.107-.205-.008l-.426 1.223a.109.109 0 000 .069l.39 1.481c.014.046.058.084.102.084H9.15c.073 0 .125-.076.103-.145l-1.329-4.277c-.014-.038 0-.084.03-.114l3.016-3.176c.066-.069.015-.19-.08-.19z" fill="#000" />
		<path d="M7.022 13l-1.99.008a.11.11 0 00-.102.076l-.257.721c-.03.076.03.152.103.152h.836c.074 0 .125.076.103.152l-2.37 6.717a.108.108 0 01-.206 0l-1.703-4.848a.112.112 0 01.103-.152h.859a.11.11 0 01.103.076l.616 1.748a.108.108 0 00.206 0l.954-2.72a.112.112 0 00-.103-.152H.108c-.073 0-.125.076-.103.152l3.127 8.996a.108.108 0 00.205 0l3.787-10.774c.022-.076-.029-.152-.102-.152z" fill="#D8141C" />
	</svg>
);

registerBlockType("vk-blocks/balloon", {
	title: __("Ballon", "vk-blocks"),
	icon: BlockIcon,
	category: "vk-blocks-cat",
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
	example: {
		attributes: {
			balloonName: iconName,
			balloonType: "type-serif",
			balloonBgColor: baseColor,
			balloonAlign: "position-left",
			IconImage: iconPicture,
			balloonImageType: "normal"
		},
		innerBlocks: [
			{
				name: 'core/paragraph',
				attributes: {
					content: content,
				},
			},
		],
	},

	edit({ attributes, className, setAttributes }) {
		const {
			content,
			balloonName,
			balloonType,
			balloonBgColor,
			balloonAlign,
			IconImage,
			balloonImageType,
			balloonAnimation
		} = attributes;
		const [blockMeta, setBlockMeta] = useState(null);

		useEffect(() => {
			apiFetch({
				path: '/vk-blocks/v1/block-meta/balloon/',
				method: 'GET',
				parse: true,
			}).then((result) => {
				setBlockMeta(result)
			})
		}, [])

		let defautIconButtons;
		if (blockMeta && blockMeta.default_icons) {
			defautIconButtons = Object.keys(blockMeta.default_icons).map((index) => {
				const defaultIcon = blockMeta.default_icons[index];
				if (defaultIcon.src) {
					return (
						<div key={index}>
							<Button
								onClick={() => {
									setAttributes({ IconImage: defaultIcon.src })
									setAttributes({ balloonName: defaultIcon.name })
								}}
								className={"button button-large components-button"}
							>
								<img className={"icon-image"} src={defaultIcon.src} />
							</Button>
						</div>
					)
				}
			})
		}


		return (
			<Fragment>
				<InspectorControls>
					<PanelBody title={__("Balloon setting", "vk-blocks")}>

						<p className={'mb-1'}><label>{__('Position', 'vk-blocks')}</label></p>
						<p className={'mb-1'}>{__("Please specify the layout of the balloon.", "vk-blocks")} </p>
						<ButtonGroup className="mb-3">
							<Button
								isSmall
								isPrimary={balloonAlign === 'position-left'}
								isSecondary={balloonAlign !== 'position-left'}
								onClick={() => setAttributes({ balloonAlign: 'position-left' })}
							>
								{__("Left", "vk-blocks")}
							</Button>
							<Button
								isSmall
								isPrimary={balloonAlign === 'position-right'}
								isSecondary={balloonAlign !== 'position-right'}
								onClick={() => setAttributes({ balloonAlign: 'position-right' })}
							>
								{__("Right", "vk-blocks")}
							</Button>
						</ButtonGroup>

						<p className={'mb-1'}><label>{__('Type', 'vk-blocks')}</label></p>
						<p className={'mb-1'}>{__("Please select the type of balloon.", "vk-blocks")} </p>
						<ButtonGroup className="mb-3">
							<Button
								isSmall
								isPrimary={balloonType === 'type-serif'}
								isSecondary={balloonType !== 'type-serif'}
								onClick={() => setAttributes({ balloonType: 'type-serif' })}
							>
								{__("Serif", "vk-blocks")}
							</Button>
							<Button
								isSmall
								isPrimary={balloonType === 'type-think'}
								isSecondary={balloonType !== 'type-think'}
								onClick={() => setAttributes({ balloonType: 'type-think' })}
							>
								{__("Thinking", "vk-blocks")}
							</Button>
						</ButtonGroup>

						<p className={'mb-1'}><label>{__('Image Style', 'vk-blocks')}</label></p>
						<ButtonGroup className="mb-3">
							<Button
								isSmall
								isPrimary={balloonImageType === 'normal'}
								isSecondary={balloonImageType !== 'normal'}
								onClick={() => setAttributes({ balloonImageType: 'normal' })}
							>
								{__('Normal', 'vk-blocks')}
							</Button>
							<Button
								isSmall
								isPrimary={balloonImageType === 'rounded'}
								isSecondary={balloonImageType !== 'rounded'}
								onClick={() => setAttributes({ balloonImageType: 'rounded' })}
							>
								{__('Rounded', 'vk-blocks')}
							</Button>
							<Button
								isSmall
								isPrimary={balloonImageType === 'circle'}
								isSecondary={balloonImageType !== 'circle'}
								onClick={() => setAttributes({ balloonImageType: 'circle' })}
							>
								{__('Circle', 'vk-blocks')}
							</Button>
						</ButtonGroup>
						<p className={'mb-1'}><label>{__('Background color of speech balloon', 'vk-blocks')}</label></p>
						<ColorPalette
							value={balloonBgColor}
							onChange={value => setAttributes({ balloonBgColor: value })}
						/>
					</PanelBody>
					<PanelBody title={__("Default Icon Setting", "vk-blocks")}>
						<div className="icon-image-list mb-2">
							{defautIconButtons}
						</div>
						<div>{__('You can register default icons from Settings > VK Blocks in Admin.', 'vk-blocks')}</div>
					</PanelBody>
					<PanelBody title={__("Animation setting", "vk-blocks")}>
						<p className={'mb-1'}>{__("Please select the type of animation.", "vk-blocks")} </p>
						<SelectControl
							value={balloonAnimation}
							onChange={value => setAttributes({ balloonAnimation: value })}
							options={[
								{
									value: "none",
									label: __("None", "vk-blocks")
								},
								{
									value: "trembling",
									label: __("Trembling", "vk-blocks")
								},
								{
									value: "trembling-x",
									label: __("Trembling X", "vk-blocks")
								},
								{
									value: "pounding",
									label: __("Pounding", "vk-blocks")
								},
								{
									value: "shaking",
									label: __("Shaking", "vk-blocks")
								},
							]}
						/>
					</PanelBody>
				</InspectorControls>
				<div
					className={`${className} vk_balloon vk_balloon-${balloonAlign} vk_balloon-${balloonType} vk_balloon-animation-${balloonAnimation}`}
				>
					<div className={`vk_balloon_icon`}>
						<MediaUpload
							onSelect={value => setAttributes({ IconImage: value.sizes.full.url })}
							type="image"
							className={`vk_balloon_icon_image vk_balloon-image-${balloonImageType}`}
							value={IconImage}
							render={({ open }) => (
								<Button
									onClick={open}
									className={IconImage ? "image-button" : "button button-large"}
								>
									{ !IconImage ? (
										__("Select image", "vk-blocks")
									) : (
											<img
												className={`vk_balloon_icon_image vk_balloon-image-${balloonImageType}`}
												src={IconImage}
												alt={__("Upload image", "vk-blocks")}
											/>
										)}
								</Button>
							)}
						/>
						<RichText
							tagName="figcaption"
							className={"vk_balloon_icon_name"}
							onChange={value => setAttributes({ balloonName: value })}
							value={balloonName}
							placeholder={__("Icon Name", "vk-blocks")}
						/>
					</div>
					<div className={`vk_balloon_content_outer`}>
						<div className={"vk_balloon_content"} style={{ background: balloonBgColor, border: balloonBgColor, }} >
							<InnerBlocks
								templateLock={false}
								template={[
									['core/paragraph', { content }],
								]}
							/>
						</div>
					</div>
				</div>
			</Fragment>
		);
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
				className={`vk_balloon vk_balloon-${balloonAlign} vk_balloon-${balloonType} vk_balloon-animation-${balloonAnimation}`}
			>
				<div className={`vk_balloon_icon`}>
					{IconImage ? (
						<figure>
							<img className={`vk_balloon_icon_image vk_balloon-image-${balloonImageType}`} src={IconImage} alt="" />
							<RichText.Content
								tagName="figcaption"
								className={"vk_balloon_icon_name"}
								value={balloonName}
							/>
						</figure>
					) : (
							""
						)}
				</div>
				<div className={`vk_balloon_content_outer`}>
					<div className={"vk_balloon_content"} style={{ background: balloonBgColor, border: balloonBgColor, }} >
						<InnerBlocks.Content />
					</div>
				</div>

			</div>
		);
	},
	deprecated,
});
