/**
 * outer block type
 *
 */
import React from "react";
import {Component} from "./component";
import {schema} from './schema';
import {deprecated} from './deprecated/block';
import toNumber from "../_helper/to-number";

const {__} = wp.i18n; // Import __() from wp.i18n
const {registerBlockType} = wp.blocks; // Import registerBlockType() from wp.blocks
const {RangeControl, RadioControl, PanelBody, Button, BaseControl,SelectControl} = wp.components;
const {Fragment} = wp.element;
const {InspectorControls, MediaUpload, ColorPalette} = wp.blockEditor && wp.blockEditor.BlockEdit ? wp.blockEditor : wp.editor;
const BlockIcon = (
	<svg xmlns="http://www.w3.org/2000/svg" width="576" height="512" viewBox="0 0 576 512">
	<g>
		<path d="M288,390.2c74,0,134.2-60.3,134.2-134.2S362,121.8,288,121.8S153.8,182,153.8,256S214,390.2,288,390.2z M288,165.5
			c49.9,0,90.5,40.6,90.5,90.5s-40.6,90.5-90.5,90.5s-90.5-40.6-90.5-90.5S238.1,165.5,288,165.5z"/>
		<polygon points="266.1,333.3 309.9,333.3 309.9,277.9 365.3,277.9 365.3,234.1 309.9,234.1 309.9,178.7 266.1,178.7 266.1,234.1
			210.7,234.1 210.7,277.9 266.1,277.9 	"/>
	</g>
	<path d="M529,31H49C22.5,31,1,52.5,1,79v352c0,26.5,21.5,48,48,48h480c26.5,0,48-21.5,48-48V79C577,52.5,555.5,31,529,31z M529,431
		H49V79h480V431z"/>
	</svg>
);

/**
 * Register: a Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType('vk-blocks/outer', {
    // Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
    title: __('Outer', 'vk-blocks'), // Block title.
    icon: BlockIcon, // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
    category: 'vk-blocks-cat-layout', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
    attributes: schema,
	supports:{
    	anchor:true,
	},

    /**
     * The edit function describes the structure of your block in the context of the editor.
     * This represents what the editor will render when the block is used.
     *
     * The "edit" property must be a valid function.
     *
     * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
     */
    edit({attributes, setAttributes,className}) {
        const {
            bgColor,
			defaultBgColor,
            bgImage,
            bgPosition,
            outerWidth,
            padding_left_and_right,
            padding_top_and_bottom,
            opacity,
            upper_level,
            lower_level,
			upperDividerBgColor,
			lowerDividerBgColor,
			dividerType,
			borderWidth,
			borderStyle,
			borderColor,
			borderRadius
        } = attributes;

		const setColorIfUndefined = (bgColor) => {
			if (bgColor === undefined) {
				bgColor = defaultBgColor;
			}
			return bgColor;
		};

		const setBgColor = (bgColor) => {
			bgColor = setColorIfUndefined(bgColor);
			setAttributes({bgColor: bgColor})
		};

        return (
            <Fragment>
                <InspectorControls>
                    <PanelBody
										title={__('Background Setting', 'vk-blocks')}
										initialOpen={false}
										>
                        <BaseControl
                            label={__('Color Setting', 'vk-blocks')}
                            help={__('Color will overcome background image. If you want to display image, clear background color or set opacity 0.', 'vk-blocks')}
                        >
                            <ColorPalette
                                value={bgColor}
                                onChange={(value) => setBgColor(value)}
                                // onChange={(value) => setAttributes({bgColor: value})}
                            />
                        </BaseControl>
                        <BaseControl
                            label={__('Opacity Setting', 'vk-blocks')}
                        >
                            <RangeControl
                                value={opacity}
                                onChange={(value) => {setAttributes({opacity: value});
                                }}
                                min={0}
                                max={1}
                                step={0.1}
                            />
                        </BaseControl>
                        <BaseControl
                            label={__('Background Image', 'vk-blocks')}
                            help=""
                        >
                            <MediaUpload
                                onSelect={(value) => setAttributes({bgImage: value.url})}
                                type="image"
                                value={bgImage}
                                render={({open}) => (
                                    <Button
                                        onClick={open}
                                        className={bgImage ? 'image-button' : 'button button-large'}
                                    >
                                        {!bgImage ? __('Select image', 'vk-blocks') :
                                            <img className={'icon-image'} src={bgImage}
                                                 alt={__('Upload image', 'vk-blocks')}/>}
                                    </Button>
                                )}
                            />
														</BaseControl>

														<BaseControl
																label={__('Background image Position', 'vk-blocks')}
																help=""
														>
                            <RadioControl
                                // label={__('Background Position', 'vk-blocks')}
                                selected={bgPosition}
                                options={[
                                    {label: __('normal', 'vk-blocks'), value: 'normal'},
                                    {label: __('Fixed', 'vk-blocks'), value: 'fixed'},
                                    {label: __('Parallax (It will not work in preview)', 'vk-blocks'), value: 'parallax'}
                                ]}
                                onChange={(value) => setAttributes({bgPosition: value})}
                            />
                        </BaseControl>
                    </PanelBody>

					<PanelBody
					title={__('Layout Setting', 'vk-blocks')}
					initialOpen={false}
					>
						<BaseControl>
							<RadioControl
								label={__('Outer width', 'vk-blocks')}
								selected={outerWidth}
								options={[
									{label: __('Normal', 'vk-blocks'), value: 'normal'},
									{label: __('Full Wide', 'vk-blocks'), value: 'full'}
								]}
								onChange={(value) => setAttributes({outerWidth: value})}
							/>
							<RadioControl
								label={__('Contents area padding (left and right)', 'vk-blocks')}
								selected={padding_left_and_right}
								options={[
									{
										label: __('Do not use padding', 'vk-blocks'),
										value: '0'
									},
									{
										label: __('Use padding', 'vk-blocks'),
										value: '1'
									}
								]}
								onChange={(value) => setAttributes({padding_left_and_right: value})}
							/>
							<RadioControl
								label={__('Padding (top and bottom)', 'vk-blocks')}
								selected={padding_top_and_bottom}
								options={[
									{label: __('Use default padding', 'vk-blocks'), value: '1'},
									{
										label: __('Do not use default padding (Set it yourself using a spacer block etc.).', 'vk-blocks'),
										value: '0'
									}
								]}
								onChange={(value) => setAttributes({padding_top_and_bottom: value})}
							/>
						</BaseControl>
					</PanelBody>
					<PanelBody
					title={__('Divider Setting', 'vk-blocks')}
					initialOpen={false}
					>
						<BaseControl>
							<SelectControl
								label={__('Type', 'vk-blocks')}
								value={dividerType}
								onChange={(value) => setAttributes({dividerType: value})}
								options={[
									{
										value: 'tilt',
										label: __('Tilt', 'vk-blocks'),
									},
									{
										value: 'curve',
										label: __('Curve', 'vk-blocks'),
									},
									{
										value: 'wave',
										label: __('Wave', 'vk-blocks'),
									},
									{
										value: 'triangle',
										label: __('Triangle', 'vk-blocks'),
									},
								]}
							/>
						</BaseControl>
						<BaseControl
							label={__('Upper Divider Level', 'vk-blocks')}
						>
							<RangeControl
								value={upper_level}
								onChange={(value) => setAttributes({upper_level: toNumber(value, -100, 100)})}
								min="-100"
								max="100"
							/>
						</BaseControl>
						<BaseControl>
							<ColorPalette
								value={upperDividerBgColor}
								onChange={(value) => setAttributes({upperDividerBgColor: value})}
							/>
						</BaseControl>
						<BaseControl
							label={__('Lower Divider Level', 'vk-blocks')}
						>
							<RangeControl
								value={lower_level}
								onChange={(value) => setAttributes({lower_level: toNumber(value, -100, 100)})}
								min="-100"
								max="100"
							/>
						</BaseControl>
						<BaseControl>
							<ColorPalette
								value={lowerDividerBgColor}
								onChange={(value) => setAttributes({lowerDividerBgColor: value})}
							/>
						</BaseControl>
					</PanelBody>
					<PanelBody
					title={__('Border Setting', 'vk-blocks')}
					initialOpen={false}
					>
						<BaseControl
							// label={__('Border will disappear when divider effect is applied.', 'vk-blocks')}
						>
						<p>{__('Border will disappear when divider effect is applied.', 'vk-blocks')}</p>
							<SelectControl
								label={__('Border type', 'vk-blocks')}
								value={borderStyle}
								onChange={(value) => setAttributes({borderStyle: value})}
								options={[
									{
										value: 'none',
										label: __('None', 'vk-blocks'),
									},
									{
										value: 'solid',
										label: __('Solid', 'vk-blocks'),
									},
									{
										value: 'dotted',
										label: __('Dotted', 'vk-blocks'),
									},
									{
										value: 'dashed',
										label: __('Dashed', 'vk-blocks'),
									},
									{
										value: 'double',
										label: __('Double', 'vk-blocks'),
									},
									{
										value: 'groove',
										label: __('Groove', 'vk-blocks'),
									},
									{
										value: 'ridge',
										label: __('Ridge', 'vk-blocks'),
									},
									{
										value: 'inset',
										label: __('Inset', 'vk-blocks'),
									},
									{
										value: 'outset',
										label: __('Outset', 'vk-blocks'),
									},
								]}
							/>
						</BaseControl>
						<BaseControl>
							<ColorPalette
								value={borderColor}
								onChange={(value) => setAttributes({borderColor: value})}
							/>
						</BaseControl>
						<BaseControl
							label={__('Border width', 'vk-blocks')}
						>
							<RangeControl
								value={borderWidth}
								onChange={(value) => setAttributes({borderWidth:value})}
								min="0"
							/>
						</BaseControl>
						<BaseControl
							label={__('Border radius', 'vk-blocks')}
						>
							<RangeControl
								value={borderRadius}
								onChange={(value) => setAttributes({borderRadius: toNumber(value, -100, 100)})}
								min="-100"
								max="100"
							/>
						</BaseControl>
					</PanelBody>
                </InspectorControls>
                {
                    vk_blocks_check.is_pro
                        ?
							<Component
								attributes={attributes}
								className={className}
								for_={'edit'}/>
                            :
                        <div>{__('This block is only for users who bought Lightning Pro.', 'vk-blocks')}</div>
                }
            </Fragment>
        );
    },

    /**
     * The save function defin className }> which the different attributes should be combined
     * into the final markup, which is then serialized by Gutenberg into post_content.
     *
     * The "save" property must be specified and must be a valid function.
     *
     * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
     */
    save({attributes,className}) {
        {
            if (vk_blocks_check.is_pro) {

                return (
						<Component
							attributes={attributes}
							className={className}
							for_={'save'}/>
                );
            }
        }

    },

	deprecated:deprecated
});
