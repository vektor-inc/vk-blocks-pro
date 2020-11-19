/**
 * Baloon block type
 *
 */
import { deprecated } from './deprecated';
import { vkbBlockEditor } from "./../_helper/depModules";
import { iconPicture, content, iconName, baseColor } from "../_helper/example-data"
import BlockIcon from "./icon.svg";

const apiFetch = wp.apiFetch;
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { ButtonGroup, PanelBody, Button, SelectControl, BaseControl, ToggleControl } = wp.components;
const { Fragment, useState, useEffect } = wp.element;
const { RichText, InspectorControls, MediaUpload, ColorPalette, InnerBlocks } = vkbBlockEditor;

registerBlockType("vk-blocks/balloon", {
	title: __("Ballon", "vk-blocks"),
	icon: <BlockIcon />,
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
			default: "type-speech"
		},
		balloonBorder: {
			type: "boolean",
			default: false
		},
		balloonImageBorder: {
			type: "boolean",
			default: false
		},
		balloonBorderWidth: {
			type: "string",
			default: "thin"
		},
		balloonBorderColor: {
			type: "string",
			default: null
		},
		balloonBgColor: {
			type: "string",
			default: null
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
			balloonType: "type-speech",
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
		const [ blockMeta, setBlockMeta ] = useState(null);

		useEffect(() => {
			apiFetch( {
				path: '/vk-blocks/v1/block-meta/balloon/',
				method: 'GET',
				parse: true,
			} ).then( ( result ) => {
				setBlockMeta(result)
			} )
		}, [])

		let defautIconButtons;
		if(blockMeta && blockMeta.default_icons){
			defautIconButtons = Object.keys(blockMeta.default_icons).map( (index)=> {
				const defaultIcon= blockMeta.default_icons[index];
				if(defaultIcon.src){
					return(
						<div key={ index }>
							<Button
								onClick={ ()=>{
									setAttributes({ IconImage: defaultIcon.src })
									setAttributes({ balloonName: defaultIcon.name })
								} }
								className={ "button button-large components-button" }
							>
								<img className={ "icon-image" } src={ defaultIcon.src } />
							</Button>
						</div>
					)
				}
			})
		}

		if ( "type-serif" === balloonType ) {
			setAttributes({ balloonType: "type-speech" })
		}

		if ( balloonImageType === null || balloonImageType === undefined ) {
			setAttributes({ balloonImageType: "normal" })
		}

		if ( balloonAnimation === null || balloonAnimation === undefined ) {
			setAttributes({ balloonAnimation: "none" })
		}

		if ( balloonBorder === null || balloonBorder === undefined ) {
			setAttributes({ balloonBorder: false })
		}

		if ( balloonImageBorder === null || balloonImageBorder === undefined ) {
			setAttributes({ balloonImageBorder: false })
		}

		let BorderSetting;
		let class_content_border;
		let class_icon_image_border;
		let border_color_style;
		let background_color_style;
		if ( balloonBorder === true ) {
			BorderSetting = <BaseControl>
				<p className={ 'mb-1' }><label>{ __( 'Border', 'vk-blocks' ) }</label></p>
				<p className={ 'mb-1' }>{ __("Do you want to draw border around balloon?", "vk-blocks") } </p>
				<p className={ 'mb-1' }>{ __("You can change border width on Setting > VK Blocks", "vk-blocks") } </p>
				<ToggleControl
					label = { __( "Border on / off", "vk-blocks" ) }
					checked={ balloonBorder }
					onChange={ (checked) => setAttributes({ balloonBorder: checked }) }
				/>

				<p className={ 'mb-1' }><label>{ __( ' Image Border', 'vk-blocks' ) }</label></p>
				<p className={ 'mb-1' }>{ __("Do you want to draw border around image?", "vk-blocks") } </p>
				<ToggleControl
					label = { __( "Image Border on / off", "vk-blocks" ) }
					checked={ balloonImageBorder }
					onChange={ (checked) => setAttributes({ balloonImageBorder: checked }) }
				/>

				<p className={ 'mb-1' }><label>{ __( 'Border color of speech balloon', 'vk-blocks' ) }</label></p>
				<ColorPalette
					value={ balloonBorderColor }
					onChange={ value => setAttributes({ balloonBorderColor: value }) }
				/>
			</BaseControl>

			class_content_border = "vk_balloon_content-border-true";

			if ( balloonImageBorder === true ) {
				class_icon_image_border = "vk_balloon_icon_image-border-true";
			}
			else {
				class_icon_image_border = "";
			}

			border_color_style     = balloonBorderColor;
			background_color_style = balloonBgColor;
		} else {
			BorderSetting = <BaseControl>
				<p className={ 'mb-1' }><label>{ __( 'Border', 'vk-blocks' ) }</label></p>
				<p className={ 'mb-1' }>{ __("Do you want to draw border around balloon?", "vk-blocks") } </p>
				<ToggleControl
					label = { __( "Border on / off", "vk-blocks" ) }
					checked={ balloonBorder }
					onChange={ (checked) => setAttributes({ balloonBorder: checked }) }
				/>
			</BaseControl>

			class_content_border    = "";
			class_icon_image_border = "";
			border_color_style      = balloonBgColor;
			background_color_style  = balloonBgColor;

		}

		let triangle_border_color_style;
		if ( balloonAlign === 'position-right' ) {
			triangle_border_color_style = `transparent transparent transparent ${background_color_style}`;
		} else {
			triangle_border_color_style = `transparent ${background_color_style} transparent transparent`;
		}


		return (
			<Fragment>
				<InspectorControls>
					<PanelBody title={ __("Balloon setting", "vk-blocks") }>
						<p className={ 'mb-1' }><label>{ __( 'Position', 'vk-blocks' ) }</label></p>
						<p className={ 'mb-1' }>{ __("Please specify the layout of the balloon.", "vk-blocks") } </p>
						<ButtonGroup className="mb-3">
							<Button
								isSmall
								isPrimary={ balloonAlign === 'position-left' }
								isSecondary={ balloonAlign !== 'position-left' }
								onClick={ () => setAttributes({ balloonAlign: 'position-left' }) }
							>
								{ __("Left", "vk-blocks") }
							</Button>
							<Button
								isSmall
								isPrimary={ balloonAlign === 'position-right' }
								isSecondary={ balloonAlign !== 'position-right' }
								onClick={ () => setAttributes({ balloonAlign: 'position-right' }) }
							>
								{  __("Right", "vk-blocks") }
							</Button>
						</ButtonGroup>

						<p className={ 'mb-1' }><label>{ __( 'Type', 'vk-blocks' ) }</label></p>
						<p className={ 'mb-1' }>{ __("Please select the type of balloon.", "vk-blocks") } </p>
						<ButtonGroup className="mb-3">
							<Button
								isSmall
								isPrimary={ balloonType === 'type-speech' }
								isSecondary={ balloonType !== 'type-speech' }
								onClick={ () => setAttributes({ balloonType: 'type-speech' }) }
							>
								{ __("Speech", "vk-blocks") }
							</Button>
							<Button
								isSmall
								isPrimary={ balloonType === 'type-think' }
								isSecondary={ balloonType !== 'type-think' }
								onClick={ () => setAttributes({ balloonType: 'type-think' }) }
							>
								{  __("Thinking", "vk-blocks") }
							</Button>
						</ButtonGroup>

						<p className={ 'mb-1' }><label>{ __( 'Image Style', 'vk-blocks' ) }</label></p>
						<ButtonGroup className="mb-3">
							<Button
								isSmall
								isPrimary={ balloonImageType === 'normal' }
								isSecondary={ balloonImageType !== 'normal' }
								onClick={ () => setAttributes({ balloonImageType: 'normal' }) }
							>
								{ __('Normal', 'vk-blocks') }
							</Button>
							<Button
								isSmall
								isPrimary={ balloonImageType === 'rounded' }
								isSecondary={ balloonImageType !== 'rounded' }
								onClick={ () => setAttributes({ balloonImageType: 'rounded' }) }
							>
								{ __('Rounded', 'vk-blocks') }
							</Button>
							<Button
								isSmall
								isPrimary={ balloonImageType === 'circle' }
								isSecondary={ balloonImageType !== 'circle' }
								onClick={ () => setAttributes({ balloonImageType: 'circle' }) }
							>
								{ __('Circle', 'vk-blocks') }
							</Button>
						</ButtonGroup>

						{ BorderSetting }

						<p className={ 'mb-1' }><label>{ __( 'Background color of speech balloon', 'vk-blocks' ) }</label></p>
						<ColorPalette
							value={ balloonBgColor }
							onChange={ value => setAttributes({ balloonBgColor: value }) }
						/>

					</PanelBody>
					<PanelBody title={ __("Default Icon Setting", "vk-blocks") }>
						<div className="icon-image-list mb-2">
							{ defautIconButtons }
						</div>
						<div>{ __( 'You can register default icons from Settings > VK Blocks in Admin.', 'vk-blocks' ) }</div>
					</PanelBody>
					<PanelBody title={ __("Animation setting", "vk-blocks") }>
						<p className={ 'mb-1' }>{ __("Please select the type of animation.", "vk-blocks") } </p>
						<SelectControl
							value={ balloonAnimation }
							onChange={ value => setAttributes({ balloonAnimation: value }) }
							options={ [
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
							] }
							/>
					</PanelBody>
				</InspectorControls>
				<div
					className={ `${className} vk_balloon vk_balloon-${balloonAlign} vk_balloon-${balloonType} vk_balloon-animation-${balloonAnimation}` }
				>
					<div
						className={ `vk_balloon_icon` }
					>
						<MediaUpload
							onSelect={ value =>	setAttributes({ IconImage: value.sizes.full.url }) }
							type="image"
							className={ `vk_balloon_icon_image vk_balloon-image-${balloonImageType} ${class_icon_image_border}` }
							value={ IconImage }
							render={ ({ open }) => (
								<Button
									onClick={ open }
									className={ IconImage ? "image-button" : "button button-large" }
								>
									{ !IconImage ? (
									__("Select image", "vk-blocks")
									) : (
										<img
											className={ `vk_balloon_icon_image vk_balloon-image-${balloonImageType} ${class_icon_image_border}` }
											style={ { borderColor: border_color_style, } }
											src={ IconImage }
											alt={ __("Upload image", "vk-blocks") }
										/>
									) }
								</Button>
							) }
						/>
						<RichText
							tagName="figcaption"
							className={ "vk_balloon_icon_name" }
							onChange={ value => setAttributes({ balloonName: value }) }
							value={ balloonName }
							placeholder={ __("Icon Name", "vk-blocks") }
						/>
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
								style     = { { borderColor: triangle_border_color_style, } }
							>
							</span>
							<span
								className={ `vk_balloon_content_after` }
								style     = { { borderColor: triangle_border_color_style, } }
							>
							</span>
							<InnerBlocks
								templateLock={ false }
								template={ [
								[ 'core/paragraph', { content} ],
								] }
							/>
						</div>
					</div>
				</div>
			</Fragment>
		);

	},

 	save({ attributes }) {
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
				class_icon_image_border = "vk_balloon-image-border";
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
								className={ `vk_balloon_icon_image vk_balloon-image-${balloonImageType} ${class_icon_image_border}` }
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
				<div className={ `vk_balloon_content_outer ${class_content_border}` }>
					<div
						className={ "vk_balloon_content" }
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

	},
  	deprecated,
});
