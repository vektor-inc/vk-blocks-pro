/**
 * heading block type
 *
 */
import { schema, example } from "./schema";
import HeadingToolbar from "./heading-toolbar";
import { VKBHeading } from "./component";
import { Deprecated } from "./deprecated/block";
import { vkbBlockEditor } from "./../_helper/depModules";
import { FontAwesome } from "./../_helper/font-awesome-new";

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { RangeControl, PanelBody, RadioControl, SelectControl, BaseControl } = wp.components;
const { Fragment } = wp.element;
const { InspectorControls, ColorPalette, BlockControls, AlignmentToolbar } = vkbBlockEditor;
const BlockIcon = (
	<svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M20 10V4h3v15h-3v-6h-6v6h-3v-1.885l1.055-1.111c.95-.994.289-2.637-1.055-2.723V4h3v6h6z" fill="#000" />
		<path d="M10.89 14.778l-3.267.008a.11.11 0 00-.102.075l-.25.722c-.022.076.03.152.103.152h1.27c.095 0 .146.122.08.19L6.7 18.105h.007l1.042 3.397c.022.076-.03.145-.103.145h-1.02a.104.104 0 01-.102-.076L6 19.83c-.029-.107-.168-.107-.205-.008l-.426 1.223a.109.109 0 000 .069l.39 1.481c.014.046.058.084.102.084H9.15c.073 0 .125-.076.103-.145l-1.329-4.277c-.014-.038 0-.084.03-.114l3.016-3.176c.066-.069.015-.19-.08-.19z" fill="#000" />
		<path d="M7.022 13l-1.99.008a.11.11 0 00-.102.076l-.257.721c-.03.076.03.152.103.152h.836c.074 0 .125.076.103.152l-2.37 6.717a.108.108 0 01-.206 0l-1.703-4.848a.112.112 0 01.103-.152h.859a.11.11 0 01.103.076l.616 1.748a.108.108 0 00.206 0l.954-2.72a.112.112 0 00-.103-.152H.108c-.073 0-.125.076-.103.152l3.127 8.996a.108.108 0 00.205 0l3.787-10.774c.022-.076-.029-.152-.102-.152z" fill="#D8141C" />
	</svg>
);

registerBlockType("vk-blocks/heading", {

	title: __("Heading", "vk-blocks"),
	icon: BlockIcon,
	category: "vk-blocks-cat",
	attributes: schema,
	supports: {
		className: true,
		customClassName: true,
		anchor: true
	},
	example,

	edit(props) {
		const { attributes, className, setAttributes } = props
		const {
			level,
			align,
			titleColor,
			titleSize,
			subTextFlag,
			subTextColor,
			subTextSize,
			titleStyle,
			titleMarginBottom,
			outerMarginBottom,
			fontAwesomeIconColor
		} = attributes;

		const setTitleFontSize = newLevel => {
			setAttributes({ level: newLevel });

			switch (newLevel) {
				case 1:
					setAttributes({ titleSize: 3.6 });
					break;
				case 2:
					setAttributes({ titleSize: 2.8 });
					break;
				case 3:
					setAttributes({ titleSize: 2.2 });
					break;
				case 4:
					setAttributes({ titleSize: 2.0 });
					break;
				case 5:
					setAttributes({ titleSize: 1.8 });
					break;
				case 6:
					setAttributes({ titleSize: 1.6 });
					break;
			}
		};
		return (
			<Fragment>
				<BlockControls>
					<HeadingToolbar
						minLevel={2}
						maxLevel={5}
						selectedLevel={level}
						onChange={setTitleFontSize}
					/>
				</BlockControls>
				<InspectorControls>
					<PanelBody title={__("Style Settings", "vk-blocks")}>
						<SelectControl
							label={__("Heading style", "vk-blocks")}
							value={titleStyle}
							onChange={value => setAttributes({ titleStyle: value })}
							options={[
								{ label: __("Default", "vk-blocks"), value: "default" },
								{ label: __("Plain", "vk-blocks"), value: "plain" }
							]}
						/>
					</PanelBody>
					<PanelBody title={__("Margin Setting", "vk-blocks")}>
						<label>{__("Margin bottom size of after hedding  (rem)", "vk-blocks")}</label>
						<RangeControl
							value={titleMarginBottom}
							onChange={value => {
								setAttributes({ titleMarginBottom: value });
							}}
							min={-1}
							max={3}
							step={0.1}
						/>
						<label>{__("Margin bottom size of after this block (rem)", "vk-blocks")}</label>
						<RangeControl
							value={outerMarginBottom}
							onChange={value => {
								setAttributes({ outerMarginBottom: value });
							}}
							min={-1}
							max={8}
							step={0.1}
						/>
					</PanelBody>
					<PanelBody title={__("Heading Settings", "vk-blocks")}>
						<label>{__("Level", "vk-blocks")}</label>
						<HeadingToolbar
							minLevel={1}
							maxLevel={7}
							selectedLevel={level}
							onChange={setTitleFontSize}
						/>
						<p>{__("Text Alignment")}</p>
						<AlignmentToolbar
							value={align}
							onChange={value => {
								setAttributes({ align: value });
							}}
						/>
						<RangeControl
							label={__("Text size (rem)", "vk-blocks")}
							value={titleSize}
							onChange={value => {
								setAttributes({ titleSize: value });
							}}
							min={0.5}
							max={4}
							step={0.1}
						/>
						<BaseControl label={__("Text Color", "vk-blocks")}>
							<ColorPalette value={titleColor} onChange={value => setAttributes({ titleColor: value })} />
						</BaseControl>
					</PanelBody>
					<PanelBody title={__("Font Awesome Icon Settings", "vk-blocks")}>
						<BaseControl label={__("Before text", "vk-blocks")}>
							<FontAwesome attributeName={"fontAwesomeIconBefore"} {...props} />
						</BaseControl>
						<BaseControl label={__("After text", "vk-blocks")}>
							<FontAwesome attributeName={"fontAwesomeIconAfter"} {...props} />
						</BaseControl>
						<BaseControl label={__("Icon Color", "vk-blocks")}>
							<ColorPalette value={fontAwesomeIconColor} onChange={value => setAttributes({ fontAwesomeIconColor: value })} />
						</BaseControl>
					</PanelBody>
					<PanelBody title={__("Sub Text Settings", "vk-blocks")}>
						<RadioControl
							label={__("Position", "vk-blocks")}
							selected={subTextFlag}
							options={[
								{ label: __("Display", "vk-blocks"), value: "on" },
								{ label: __("Hide", "vk-blocks"), value: "off" }
							]}
							onChange={value => setAttributes({ subTextFlag: value })}
						/>
						<label>{__("Text size (rem)", "vk-blocks")}</label>
						<RangeControl
							value={subTextSize}
							onChange={value => {
								setAttributes({ subTextSize: value });
							}}
							min={0.5}
							max={3}
							step={0.1}
						/>
						<ColorPalette
							value={subTextColor}
							onChange={value => setAttributes({ subTextColor: value })}
						/>
					</PanelBody>
				</InspectorControls>
				<div className={className}>
					<VKBHeading {...props} for_={"edit"} />
				</div>
			</Fragment>
		);
	},

	save(props) {
		return (
			<div>
				<VKBHeading {...props} for_={"save"} />
			</div>
		);
	},
	deprecated: Deprecated
});
