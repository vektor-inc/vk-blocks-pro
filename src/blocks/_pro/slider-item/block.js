/**
 * Slider Item block
 *
 */
import { schema } from "./schema";
import { deprecated } from "./deprecated";
import { ReactComponent as Icon } from './icon.svg';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { InspectorControls, BlockControls, BlockVerticalAlignmentToolbar, ColorPalette} = wp.blockEditor;
const {
	RangeControl,
	RadioControl,
	PanelBody,
	BaseControl,
} = wp.components;
import { AdvancedMediaUpload } from "../../../components/advanced-media-upload";
import SliderItem from "./SliderItem"



registerBlockType("vk-blocks/slider-item", {
	title: __("Slider Item", "vk-blocks"),
	icon: <Icon />,
	category: "vk-blocks-cat",
	attributes: schema,
	parent: ["vk-blocks/slider"],
	supports: {
		className: true,
	},

	edit(props) {
		const { attributes, setAttributes, clientId } = props;
		const {
			verticalAlignment,
			bgColor,
			opacity,
			padding_left_and_right,
			bgSize
		} = attributes;

		setAttributes({clientId})

		return (
			<>
				<BlockControls>
					<BlockVerticalAlignmentToolbar
						onChange={  ( alignment ) => setAttributes( { verticalAlignment: alignment } ) }
						value={ verticalAlignment }
					/>
				</BlockControls>
				<InspectorControls>
					<PanelBody
						title={ __("Layout Setting", "vk-blocks") }
						initialOpen={ true }
				>
						<BaseControl>
							<RadioControl
								label={ __(
								"Padding (Left and Right)",
								"vk-blocks"
							) }
								selected={ padding_left_and_right }
								options={ [
								{
									label: __("Fit to the Container area", "vk-blocks"),
									value: "0",
								},
								{
									label: __("Add padding to the Slider area", "vk-blocks"),
									value: "1",
								},
								{
									label: __("Remove padding from the Slider area", "vk-blocks"),
									value: "2",
								},
							] }
								onChange={ (value) =>
								setAttributes({ padding_left_and_right: value })
							}
						/>
						</BaseControl>
						<BaseControl>
							<p className="mt-0 mb-2">{ __('Vertical align', 'vk-blocks') }</p>
							<BlockVerticalAlignmentToolbar
								onChange={  ( alignment ) => setAttributes( { verticalAlignment: alignment } ) }
								value={ verticalAlignment }
							/>
						</BaseControl>
					</PanelBody>
					<PanelBody
						title={ __("Background Setting", "vk-blocks") }
						initialOpen={ false }
					>
						<BaseControl
							label={ __("Color Setting", "vk-blocks") }
							help={ __(
								"Color will overcome background image. If you want to display image, clear background color or set opacity 0.",
								"vk-blocks"
							) }
						>
							<ColorPalette
								value={ bgColor }
								onChange={ (value) => setAttributes( { bgColor: value } ) }
							/>
						</BaseControl>
						<BaseControl label={ __("Opacity Setting", "vk-blocks") }>
							<RangeControl
								value={ opacity }
								onChange={ (value) => {
									setAttributes({ opacity: value });
								} }
								min={ 0 }
								max={ 1 }
								step={ 0.1 }
							/>
						</BaseControl>
						<BaseControl
							label={ __("Background Image Size", "vk-blocks") }
						>
							<RadioControl
								selected={ bgSize }
								options={ [
									{ label: __("cover", "vk-blocks"), value: "cover" },
									{ label: __("repeat", "vk-blocks"), value: "repeat" },
								] }
								onChange={ (value) => setAttributes({ bgSize: value }) }
							/>
						</BaseControl>
						<BaseControl
							label={ __("Background Image PC", "vk-blocks") }
							className={ "vk_slider_item_sidebar_bgImage" }
						>
							<div className={ "vk_slider_item_sidebar_bgImage_button_container" }>
								<AdvancedMediaUpload schema={ "bgImage" } { ...props } />
							</div>
						</BaseControl>
						<BaseControl
							label={ __("Background Image Tablet", "vk-blocks") }
							className={ "vk_slider_item_sidebar_bgImage" }
						>
							<AdvancedMediaUpload schema={ "bgImageTablet" } { ...props } />
						</BaseControl>
						<BaseControl
							label={ __("Background Image Mobile", "vk-blocks") }
							className={ "vk_slider_item_sidebar_bgImage" }
						>
							<AdvancedMediaUpload schema={ "bgImageMobile" } { ...props } />
						</BaseControl>
					</PanelBody>
				</InspectorControls>
				<SliderItem { ...props } for_={ "edit" } />
			</>
		);
	},

	save(props) {
		return (
			<SliderItem { ...props } for_={ "save" } />
		);
	},
	deprecated
});
