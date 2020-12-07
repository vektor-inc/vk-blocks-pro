/**
 * Pr-Content block type
 *
 */
import { schema,example } from "./schema";
import { PRcontent } from "./component";
import { deprecated } from "./deprecated/deprecated";
import { FontAwesome } from "./../../utils/font-awesome-new"
import BlockIcon from "./icon.svg";

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const {
	RadioControl,
	PanelBody,
	BaseControl,
	CheckboxControl,
	TextControl
} = wp.components;
const { Fragment } = wp.element;
const { InspectorControls, ColorPalette } =
	wp.blockEditor && wp.blockEditor.BlockEdit ? wp.blockEditor : wp.editor;


registerBlockType("vk-blocks/pr-content", {
	title: __("PR Content", "vk-blocks"), // Block title.
	icon: <BlockIcon />, // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: "vk-blocks-cat", // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	attributes: schema,
	example,

	edit (props) {
		const { attributes, className, setAttributes } = props
		const {
			titleColor,
			contentColor,
			url,
			buttonType,
			buttonColor,
			buttonColorCustom,
			buttonText,
			buttonTarget,
			ImageBorderColor,
			layout,
			fontAwesomeIconBefore,
			fontAwesomeIconAfter
		} = attributes;
		return (
			<Fragment>
				<InspectorControls>
					<PanelBody
						title={ __("Color Setting", "vk-blocks") }
						initialOpen={ false }
					>
						<BaseControl label={ __("Title Color", "vk-blocks") }>
							<ColorPalette
								value={ titleColor }
								onChange={ value => setAttributes({ titleColor: value }) }
							/>
						</BaseControl>
						<BaseControl label={ __("Content Color", "vk-blocks") }>
							<ColorPalette
								value={ contentColor }
								onChange={ value => setAttributes({ contentColor: value }) }
							/>
						</BaseControl>
						<BaseControl label={ __("Image Border Color", "vk-blocks") }>
							<ColorPalette
								value={ ImageBorderColor }
								onChange={ value => setAttributes({ ImageBorderColor: value }) }
							/>
						</BaseControl>
					</PanelBody>
					<PanelBody
						title={ __("Button Setting", "vk-blocks") }
						initialOpen={ false }
					>
						<BaseControl label={ __("Button Text", "vk-blocks") }>
							<TextControl
								value={ buttonText }
								onChange={ value => setAttributes({ buttonText: value }) }
								placeholder={ "Input button text." }
							/>
						</BaseControl>
						<BaseControl label={ __("Link URL", "vk-blocks") }>
							<TextControl
								value={ url }
								onChange={ value => setAttributes({ url: value }) }
								placeholder={ "https://vektor-inc.co.jp/" }
							/>
						</BaseControl>
						<CheckboxControl
							label={ __("Open link new tab.", "vk-blocks") }
							checked={ buttonTarget }
							onChange={ checked => setAttributes({ buttonTarget: checked }) }
						/>
						<BaseControl label={ __("Button Type", "vk-blocks") }>
							<RadioControl
								selected={ buttonType }
								options={ [
									{ label: __("Solid", "vk-blocks"), value: "0" },
									{ label: __("Ghost", "vk-blocks"), value: "1" }
								] }
								onChange={ value => setAttributes({ buttonType: value }) }
							/>
						</BaseControl>
						<RadioControl
							label={ __("Default Color:", "vk-blocks") }
							selected={ buttonColor }
							options={ [
								{ label: __("Primary", "vk-blocks"), value: "primary" },
								{ label: __("Secondary", "vk-blocks"), value: "secondary" },
								{ label: __("Success", "vk-blocks"), value: "success" },
								{ label: __("Info", "vk-blocks"), value: "info" },
								{ label: __("Warning", "vk-blocks"), value: "warning" },
								{ label: __("Danger", "vk-blocks"), value: "danger" },
								{ label: __("Light", "vk-blocks"), value: "light" },
								{ label: __("Dark", "vk-blocks"), value: "dark" }
							] }
							onChange={ value => setAttributes({ buttonColor: value }) }
						/>
						<BaseControl label={ __("Button Color", "vk-blocks") }>
							<ColorPalette
								value={ buttonColorCustom }
								onChange={ value => setAttributes({ buttonColorCustom: value }) }
							/>
						</BaseControl>
						<BaseControl>
							<h4 className="mt-0 mb-2">{ __('Icon ( Font Awesome )', 'vk-blocks') }</h4>
							<BaseControl
								label={ __("Before text", "vk-blocks") }
							>
								<FontAwesome
									attributeName={ "fontAwesomeIconBefore" }
									{ ...props }
								/>
							</BaseControl>
							<BaseControl
								label={ __("After text", "vk-blocks") }
							>
								<FontAwesome
									attributeName={ "fontAwesomeIconAfter" }
									{ ...props }
								/>
							</BaseControl>
						</BaseControl>
					</PanelBody>
					<PanelBody
						title={ __("Layout Setting", "vk-blocks") }
						initialOpen={ false }
					>
						<RadioControl
							label={ __("Layout Type", "vk-blocks") }
							selected={ layout }
							options={ [
								{ label: __("Right", "vk-blocks"), value: "right" },
								{ label: __("Left", "vk-blocks"), value: "left" }
							] }
							onChange={ value => setAttributes({ layout: value }) }
						/>
					</PanelBody>
				</InspectorControls>
				<PRcontent
					attributes={ attributes }
					setAttributes={ setAttributes }
					className={ className }
					for_={ "edit" }
				/>
			</Fragment>
		);
	},

	save(props) {
		const { attributes, className } = props
		return (
			<PRcontent attributes={ attributes } className={ className } for_={ "save" } />
		);
	},

	deprecated
});
