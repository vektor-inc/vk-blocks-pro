/**
 * Baloon block type
 *
 */
import { deprecated } from './deprecated';
import { vkbBlockEditor } from "./../_helper/depModules";
<<<<<<< HEAD
import { iconPicture, content, iconName, baseColor } from "../_helper/example-data"
=======
const apiFetch = wp.apiFetch;
>>>>>>> 87526d6699f503c0d75533caefabd7de71a4fbc5
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const {  ButtonGroup, PanelBody, Button,SelectControl } = wp.components;
const { Fragment, useState, useEffect } = wp.element;
const { RichText, InspectorControls, MediaUpload, ColorPalette } = vkbBlockEditor;
const BlockIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="576"
    height="512"
    viewBox="0 0 576 512"
  >
    <path d="M544 450.583c0 22.75 13.014 42.454 32 52.092v7.969c-5.313 0.727-10.736 1.112-16.25 1.112-34.004 0-64.674-14.264-86.361-37.132-13.111 3.491-27.001 5.376-41.389 5.376-79.529 0-144-57.308-144-128s64.471-128 144-128c79.529 0 144 57.308 144 128 0 27.674-9.882 53.296-26.678 74.233-3.412 7.412-5.322 15.656-5.322 24.35zM115.339 110.593c-33.107 26.899-51.339 61.492-51.339 97.407 0 20.149 5.594 39.689 16.626 58.075 11.376 18.96 28.491 36.293 49.494 50.126 15.178 9.996 25.39 25.974 28.088 43.947 0.9 5.992 1.464 12.044 1.685 18.062 3.735-3.097 7.375-6.423 10.94-9.988 12.077-12.076 28.39-18.745 45.251-18.745 2.684 0 5.381 0.168 8.078 0.512 10.474 1.331 21.172 2.008 31.797 2.010v64c-13.564-0.001-26.877-0.869-39.871-2.521-54.989 54.989-120.625 64.85-184.088 66.298v-13.458c34.268-16.789 64-47.37 64-82.318 0-4.877-0.379-9.665-1.082-14.348-57.898-38.132-94.918-96.377-94.918-161.652 0-114.875 114.615-208 256-208 139.229 0 252.496 90.307 255.918 202.76-20.548-9.158-42.92-14.711-66.131-16.289-5.765-28.034-22.701-54.408-49.126-75.878-17.661-14.349-38.458-25.695-61.814-33.722-24.853-8.54-51.38-12.871-78.847-12.871s-53.994 4.331-78.847 12.871c-23.356 8.027-44.153 19.372-61.814 33.722z" />
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
			content: content,
			balloonName: iconName,
			balloonType: "type-serif",
			balloonBgColor: baseColor,
			balloonAlign: "position-left",
			IconImage: iconPicture,
			balloonImageType: "normal"
		},
	},

  edit({ attributes, className, setAttributes }) {
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
		if(blockMeta && blockMeta["default_icons"]){
			defautIconButtons = Object.keys(blockMeta["default_icons"]).map( (index)=> {
				const defaultIcon= blockMeta["default_icons"][index];
				if(defaultIcon.src){
					return(
						<div key={index}>
							<Button
								onClick={()=>{
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

			<p className={ 'mb-1' }><label>{ __( 'Position', 'vk-blocks' ) }</label></p>
			<p className={ 'mb-1' }>{ __("Please specify the layout of the balloon.", "vk-blocks")} </p>
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
			<p className={ 'mb-1' }>{ __("Please select the type of balloon.", "vk-blocks")} </p>
			<ButtonGroup className="mb-3">
				<Button
					isSmall
					isPrimary={ balloonType === 'type-serif' }
					isSecondary={ balloonType !== 'type-serif' }
					onClick={ () => setAttributes({ balloonType: 'type-serif' }) }
				>
					{ __("Serif", "vk-blocks") }
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
			<p className={ 'mb-1' }><label>{ __( 'Background color of speech balloon', 'vk-blocks' ) }</label></p>
            <ColorPalette
              value={balloonBgColor}
              onChange={value => setAttributes({ balloonBgColor: value })}
            />
          </PanelBody>
		  	<PanelBody title={__("Default Icon Setting", "vk-blocks")}>
				<div className="icon-image-list mb-2">
					{defautIconButtons}
				</div>
				<div>{__( 'You can register default icons from Settings > VK Blocks in Admin.', 'vk-blocks' ) }</div>
          	</PanelBody>
		  	<PanelBody title={__("Animation setting", "vk-blocks")}>
				<p className={ 'mb-1' }>{ __("Please select the type of animation.", "vk-blocks")} </p>
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
          className={`${className} vk_balloon vk_balloon-${balloonAlign} vk_balloon-${balloonType} vk_balloon-animation-${balloonAnimation}`}
        >
          <div className={ `vk_balloon_icon` }>
            <MediaUpload
              onSelect={value =>
                setAttributes({ IconImage: value.sizes.full.url })
              }
              type="image"
              className={`vk_balloon_icon_image vk_balloon-image-${balloonImageType}`}
              value={IconImage}
              render={({ open }) => (
                <Button
                  onClick={open}
                  className={IconImage ? "image-button" : "button button-large"}
                >
                  {!IconImage ? (
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
          <RichText
            style={{ background: balloonBgColor, border: balloonBgColor }}
            tagName="p"
            className={"vk_balloon_content"}
            onChange={value => setAttributes({ content: value })}
            value={content}
            placeholder={__("Input text", "vk-blocks")}
          />
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
        <div className={ `vk_balloon_icon` }>
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
        <RichText.Content
          className={"vk_balloon_content"}
          style={{ background: balloonBgColor, border: balloonBgColor }}
          tagName="p"
          value={content}
        />
      </div>
    );
  },
  deprecated: deprecated,
});
