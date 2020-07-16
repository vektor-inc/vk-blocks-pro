/**
 * Slider Item block
 *
 */
import { schema } from "./schema";
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { Fragment } = wp.element;
const { InspectorControls, InnerBlocks, BlockControls, BlockVerticalAlignmentToolbar, ColorPalette} = wp.blockEditor;
const {
	RangeControl,
	RadioControl,
	PanelBody,
	BaseControl,
	ButtonGroup,
	Button
} = wp.components;
import GenerateBgImage from "../../_helper/GenerateBgImage"
import { AdvancedMediaUpload } from "../../../components/advanced-media-upload";
import formatNum from "../../_helper/formatNum";
import SliderItem from "./SliderItem"

const BlockIcon = (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 576">
		<path d="M456.1,1320.7H118.4v36.6H533V945.2h-35.5v334C497.6,1302.1,479,1320.7,456.1,1320.7z" />
		<g>
			<g>
				<circle cx="240.3" cy="195.8" r="23.8" />
				<path d="M181.7,311.7h56h36.7h120c10.6,0,16.4-13.7,9.5-22.6l-64.9-83.6c-5-6.4-13.9-6.4-18.9,0l-52.1,67.1
				c-5.2,6.7-14.9,6.3-19.6-1l-22.3-34.3c-5-7.6-15.3-7.6-20.3,0L171.5,290C165.7,299.1,171.5,311.7,181.7,311.7z" />
				<path d="M392.7,404H183.3c-7.8,0-14.1-6.3-14.1-14.1v-24.1c0-7.8,6.3-14.1,14.1-14.1h209.3c7.8,0,14.1,6.3,14.1,14.1v24.1
				C406.8,397.7,400.5,404,392.7,404z" />
			</g>
			<path d="M436.1,87.8H139.9c-25.4,0-46,20.6-46,46v308.3c0,25.4,20.6,46,46,46h296.2c25.4,0,46-20.6,46-46V133.8
			C482.1,108.5,461.5,87.8,436.1,87.8z M436.1,442.2H139.9V133.8h296.2V442.2z" />
		</g>
	</svg>
);


registerBlockType("vk-blocks/slider-item", {
	title: __("Slider Item", "vk-blocks"),
	icon: BlockIcon,
	category: "vk-blocks-cat",
	attributes: schema,
	parent: ["vk-blocks/slider"],
	supports: {
		className: true,
	},

	edit(props) {
		const { className, attributes, setAttributes, clientId } = props;
		const {
			verticalAlignment,
			bgColor,
			opacity,
			outerWidth,
			padding_left_and_right,
			padding_top_and_bottom,

		} = attributes;

		setAttributes({clientId:clientId})

		return (
			<Fragment>
				<BlockControls>
					<BlockVerticalAlignmentToolbar
						onChange={  ( alignment ) => setAttributes( { verticalAlignment: alignment } ) }
						value={ verticalAlignment }
					/>
				</BlockControls>
				<InspectorControls>
				<PanelBody
						title={ __("Background Setting", "vk-blocks") }
						initialOpen={ true }
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
									setAttributes({ opacity: formatNum(value, opacity) });
								} }
								min={ 0 }
								max={ 1 }
								step={ 0.1 }
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
						{/* <BaseControl
							label={ __("Background image Position", "vk-blocks") }
							help=""
						>
							<RadioControl
								selected={ bgPosition }
								options={ [
									{ label: __("normal", "vk-blocks"), value: "normal" },
									{ label: __("Fixed (Not fixed on iPhone)", "vk-blocks"), value: "fixed" },
									{
										label: __(
											"Parallax (Non-guaranteed)",
											"vk-blocks"
										),
										value: "parallax",
									},
								] }
								onChange={ (value) => setAttributes({ bgPosition: value }) }
							/>
						</BaseControl> */}
					</PanelBody>
					<PanelBody
						title={ __("Layout Setting", "vk-blocks") }
						initialOpen={ false }
					>
						<p className={ 'mb-1' }><label>{ __( 'Width', 'vk-blocks' ) }</label></p>
						<BaseControl>
							<ButtonGroup className="mb-3">
								<Button
									isSmall
									isPrimary={ outerWidth === 'normal' }
									isSecondary={ outerWidth !== 'normal' }
									onClick={ () => setAttributes({ outerWidth: 'normal' }) }
								>
									{ __('Normal', 'vk-blocks') }
								</Button>
								<Button
									isSmall
									isPrimary={ outerWidth === 'full' }
									isSecondary={ outerWidth !== 'full' }
									onClick={ () => setAttributes({ outerWidth: 'full' }) }
								>
									{ __('Full Wide', 'vk-blocks') }
								</Button>
							</ButtonGroup>

							<RadioControl
								label={ __(
									"Padding (Left and Right)",
									"vk-blocks"
								) }
								selected={ padding_left_and_right }
								options={ [
									{
										label: __("Fit to the Content area", "vk-blocks"),
										value: "0",
									},
									{
										label: __("Add padding to the Outer area", "vk-blocks"),
										value: "1",
									},
									{
										label: __("Remove padding from the Outer area", "vk-blocks"),
										value: "2",
									},
								] }
								onChange={ (value) =>
									setAttributes({ padding_left_and_right: value })
								}
							/>
							<RadioControl
								label={ __("Padding (Top and Bottom)", "vk-blocks") }
								className={ 'mb-1' }
								selected={ padding_top_and_bottom }
								options={ [
									{ label: __("Use default padding", "vk-blocks"), value: "1" },
									{
										label: __(
											"Do not use default padding",
											"vk-blocks"
										),
										value: "0",
									},
								] }
								onChange={ (value) =>
									setAttributes({ padding_top_and_bottom: value })
								}
							/>
							<p>{ __( '* If you select "Do not use" that, please set yourself it such as a spacer block.', "vk-blocks" ) }</p>
						</BaseControl>
					</PanelBody>
					<PanelBody
						title={ __('Align', 'vk-blocks') }
						initialOpen={ false }
					>
						<BaseControl>
						<h4 className="mt-0 mb-2">{ __('Vertical align', 'vk-blocks') }</h4>
							<BlockVerticalAlignmentToolbar
								onChange={  ( alignment ) => setAttributes( { verticalAlignment: alignment } ) }
								value={ verticalAlignment }
							/>
						</BaseControl>
					</PanelBody>
				</InspectorControls>
				<SliderItem {...props} for_={"edit"}/>
			</Fragment>
		);
	},

	save(props) {
		return (
			<SliderItem {...props} for_={"save"}/>
		);
	},
});
