/**
 * outer block type
 */
import { OuterBlock } from "./component";
import { schema } from "./schema";
import { deprecated } from "./deprecated/block";
import toNumber from "../../_helper/to-number";
import { AdvancedMediaUpload } from "../../../components/advanced-media-upload";
import { hiddenNewBlock } from "../../_helper/hiddenNewBlock"
import formatNum from "../../_helper/formatNum";
const inserterVisible = hiddenNewBlock(5.3);

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const {
	RangeControl,
	RadioControl,
	PanelBody,
	BaseControl,
	SelectControl,
	ButtonGroup,
	Button
} = wp.components;
const { Fragment } = wp.element;
const { InspectorControls, ColorPalette } =
	wp.blockEditor && wp.blockEditor.BlockEdit ? wp.blockEditor : wp.editor;
const BlockIcon = (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="576"
		height="512"
		viewBox="0 0 576 512"
	>
		<g>
			<path
				d="M288,390.2c74,0,134.2-60.3,134.2-134.2S362,121.8,288,121.8S153.8,182,153.8,256S214,390.2,288,390.2z M288,165.5
			c49.9,0,90.5,40.6,90.5,90.5s-40.6,90.5-90.5,90.5s-90.5-40.6-90.5-90.5S238.1,165.5,288,165.5z"
			/>
			<polygon
				points="266.1,333.3 309.9,333.3 309.9,277.9 365.3,277.9 365.3,234.1 309.9,234.1 309.9,178.7 266.1,178.7 266.1,234.1
			210.7,234.1 210.7,277.9 266.1,277.9 	"
			/>
		</g>
		<path
			d="M529,31H49C22.5,31,1,52.5,1,79v352c0,26.5,21.5,48,48,48h480c26.5,0,48-21.5,48-48V79C577,52.5,555.5,31,529,31z M529,431
		H49V79h480V431z"
		/>
	</svg>
);

registerBlockType("vk-blocks/outer", {
	title: __("Outer", "vk-blocks"),
	icon: BlockIcon,
	category: "vk-blocks-cat-layout",
	attributes: schema,
	supports: {
		anchor: true,
		inserter: inserterVisible
	},

	edit(props) {
		const { attributes, setAttributes, className, clientId } = props;
		const {
			bgColor,
			defaultBgColor,
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
			borderRadius,
		} = attributes;

		//save clientId for using in Class.
		setAttributes({ clientId });

		const setColorIfUndefined = (bgColor) => {
			if (bgColor === undefined) {
				bgColor = defaultBgColor;
			}
			return bgColor;
		};

		const setBgColor = (bgColor) => {
			bgColor = setColorIfUndefined(bgColor);
			setAttributes({ bgColor });
		};

		return (
			<Fragment>
				<InspectorControls>
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
								onChange={ (value) => setBgColor(value) }
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
							className={ "vk_outer_sidebar_bgImage" }
						>
							<div className={ "vk_outer_sidebar_bgImage_button_container" }>
								<AdvancedMediaUpload schema={ "bgImage" } { ...props } />
							</div>
						</BaseControl>
						<BaseControl
							label={ __("Background Image Tablet", "vk-blocks") }
							className={ "vk_outer_sidebar_bgImage" }
						>
							<AdvancedMediaUpload schema={ "bgImageTablet" } { ...props } />
						</BaseControl>
						<BaseControl
							label={ __("Background Image Mobile", "vk-blocks") }
							className={ "vk_outer_sidebar_bgImage" }
						>
							<AdvancedMediaUpload schema={ "bgImageMobile" } { ...props } />
						</BaseControl>
						<BaseControl
							label={ __("Background image Position", "vk-blocks") }
							help=""
						>
							<RadioControl
								selected={ bgPosition }
								options={ [
									{ label: __("normal", "vk-blocks"), value: "normal" },
									{ label: __("Fixed", "vk-blocks"), value: "fixed" },
									{
										label: __(
											"Parallax (It will not work in preview)",
											"vk-blocks"
										),
										value: "parallax",
									},
								] }
								onChange={ (value) => setAttributes({ bgPosition: value }) }
							/>
						</BaseControl>
					</PanelBody>

					<PanelBody
						title={ __("Layout Setting", "vk-blocks") }
						initialOpen={ false }
					>
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
									"Padding (Horizontal)",
									"vk-blocks"
								) }
								selected={ padding_left_and_right }
								options={ [
									{
										label: __("Contents area fit", "vk-blocks"),
										value: "0",
									},
									{
										label: __("Contents area width and padding", "vk-blocks"),
										value: "1",
									},
									{
										label: __("Full wide width and padding", "vk-blocks"),
										value: "2",
									},
								] }
								onChange={ (value) =>
									setAttributes({ padding_left_and_right: value })
								}
							/>
							<RadioControl
								label={ __("Padding (Vertical)", "vk-blocks") }
								selected={ padding_top_and_bottom }
								options={ [
									{ label: __("Use default padding", "vk-blocks"), value: "1" },
									{
										label: __(
											"Do not use default padding (Set it yourself using a spacer block etc.).",
											"vk-blocks"
										),
										value: "0",
									},
								] }
								onChange={ (value) =>
									setAttributes({ padding_top_and_bottom: value })
								}
							/>
						</BaseControl>
					</PanelBody>
					<PanelBody
						title={ __("Divider Setting", "vk-blocks") }
						initialOpen={ false }
					>
						<BaseControl>
							<SelectControl
								label={ __("Type", "vk-blocks") }
								value={ dividerType }
								onChange={ (value) => setAttributes({ dividerType: value }) }
								options={ [
									{
										value: "tilt",
										label: __("Tilt", "vk-blocks"),
									},
									{
										value: "curve",
										label: __("Curve", "vk-blocks"),
									},
									{
										value: "wave",
										label: __("Wave", "vk-blocks"),
									},
									{
										value: "triangle",
										label: __("Triangle", "vk-blocks"),
									},
								] }
							/>
						</BaseControl>
						<BaseControl label={ __("Upper Divider Level", "vk-blocks") }>
							<RangeControl
								value={ upper_level }
								onChange={ (value) =>
									setAttributes({ upper_level: toNumber(value, -100, 100) })
								}
								min="-100"
								max="100"
							/>
						</BaseControl>
						<BaseControl>
							<ColorPalette
								value={ upperDividerBgColor }
								onChange={ (value) =>
									setAttributes({ upperDividerBgColor: value })
								}
							/>
						</BaseControl>
						<BaseControl label={ __("Lower Divider Level", "vk-blocks") }>
							<RangeControl
								value={ lower_level }
								onChange={ (value) =>
									setAttributes({ lower_level: toNumber(value, -100, 100) })
								}
								min="-100"
								max="100"
							/>
						</BaseControl>
						<BaseControl>
							<ColorPalette
								value={ lowerDividerBgColor }
								onChange={ (value) =>
									setAttributes({ lowerDividerBgColor: value })
								}
							/>
						</BaseControl>
					</PanelBody>
					<PanelBody
						title={ __("Border Setting", "vk-blocks") }
						initialOpen={ false }
					>
						<BaseControl>
							<p>
								{ __(
									"Border will disappear when divider effect is applied.",
									"vk-blocks"
								) }
							</p>
							<SelectControl
								label={ __("Border type", "vk-blocks") }
								value={ borderStyle }
								onChange={ (value) => setAttributes({ borderStyle: value }) }
								options={ [
									{
										value: "none",
										label: __("None", "vk-blocks"),
									},
									{
										value: "solid",
										label: __("Solid", "vk-blocks"),
									},
									{
										value: "dotted",
										label: __("Dotted", "vk-blocks"),
									},
									{
										value: "dashed",
										label: __("Dashed", "vk-blocks"),
									},
									{
										value: "double",
										label: __("Double", "vk-blocks"),
									},
									{
										value: "groove",
										label: __("Groove", "vk-blocks"),
									},
									{
										value: "ridge",
										label: __("Ridge", "vk-blocks"),
									},
									{
										value: "inset",
										label: __("Inset", "vk-blocks"),
									},
									{
										value: "outset",
										label: __("Outset", "vk-blocks"),
									},
								] }
							/>
						</BaseControl>
						<BaseControl>
							<ColorPalette
								value={ borderColor }
								onChange={ (value) => setAttributes({ borderColor: value }) }
							/>
						</BaseControl>
						<BaseControl label={ __("Border width", "vk-blocks") }>
							<RangeControl
								value={ borderWidth }
								onChange={ (value) => setAttributes({ borderWidth: formatNum(value, borderWidth) }) }
								min="0"
							/>
						</BaseControl>
						<BaseControl label={ __("Border radius", "vk-blocks") }>
							<RangeControl
								value={ borderRadius }
								onChange={ (value) =>
									setAttributes({ borderRadius: toNumber(value, -100, 100) })
								}
								min="-100"
								max="100"
							/>
						</BaseControl>
					</PanelBody>
				</InspectorControls>
				<OuterBlock
					clientId={ clientId }
					attributes={ attributes }
					className={ className }
					for_={ "edit" }
				/>
			</Fragment>
		);
	},

	save(props) {
		const { attributes } = props;
		return (
			<OuterBlock
				clientId={ attributes.clientId }
				attributes={ attributes }
				for_={ "save" }
			/>
		);
	},

	deprecated,
});
