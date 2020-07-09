/**
 * heading block type
 *
 */
import { schema, example } from "./schema";
import HeadingToolbar from "./heading-toolbar";
import { VKBHeading } from "./component";
import { Deprecated } from "./deprecated/block";
import { vkbBlockEditor } from "./../_helper/depModules";
import formatNum from "../_helper/formatNum";
import { FontAwesome } from "./../_helper/font-awesome-new";

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { RangeControl, PanelBody, RadioControl, SelectControl, BaseControl } = wp.components;
const { Fragment } = wp.element;
const { InspectorControls, ColorPalette, BlockControls, AlignmentToolbar } = vkbBlockEditor;
const BlockIcon = (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="576"
		height="512"
		viewBox="0 0 576 512"
	>
		<g>
			<g>
				<path d="M242.1,366.7l0-281.4l-212.6,0l0-77.1l516.6,0v77.1l-213.2,0l0,281.4H242.1z" />
			</g>
			<g>
				<path
					d="M33,467.3l30.8-1.9c0.7,5,2,8.8,4.1,11.4c3.3,4.2,8.1,6.4,14.3,6.4c4.6,0,8.2-1.1,10.7-3.3c2.5-2.2,3.8-4.7,3.8-7.5
					c0-2.7-1.2-5.1-3.6-7.3c-2.4-2.1-7.9-4.2-16.6-6.1c-14.2-3.2-24.3-7.4-30.4-12.7c-6.1-5.3-9.1-12-9.1-20.2
					c0-5.4,1.6-10.5,4.7-15.3c3.1-4.8,7.8-8.6,14.1-11.3c6.3-2.7,14.8-4.1,25.8-4.1c13.4,0,23.6,2.5,30.6,7.5c7,5,11.2,12.9,12.5,23.8
					l-30.5,1.8c-0.8-4.7-2.5-8.1-5.1-10.3c-2.6-2.1-6.2-3.2-10.8-3.2c-3.8,0-6.6,0.8-8.5,2.4c-1.9,1.6-2.9,3.5-2.9,5.8
					c0,1.7,0.8,3.2,2.4,4.5c1.5,1.4,5.1,2.7,10.9,3.9c14.1,3,24.3,6.1,30.4,9.3c6.1,3.1,10.6,7,13.4,11.6c2.8,4.6,4.2,9.8,4.2,15.5
					c0,6.7-1.9,12.9-5.6,18.6c-3.7,5.7-8.9,10-15.6,12.9c-6.7,2.9-15.1,4.4-25.2,4.4c-17.8,0-30.2-3.4-37-10.3
					C37.8,486.6,33.9,477.8,33,467.3z"
				/>
				<path
					d="M215,501.9h-27.2v-12.3c-4,5-8.1,8.6-12.3,10.8c-4.1,2.1-9.2,3.2-15.2,3.2c-8,0-14.3-2.4-18.8-7.2
					c-4.5-4.8-6.8-12.2-6.8-22.1V426H164v41.7c0,4.8,0.9,8.1,2.6,10.1c1.8,2,4.2,3,7.4,3c3.5,0,6.3-1.3,8.5-4
					c2.2-2.7,3.3-7.5,3.3-14.4V426H215V501.9z"
				/>
				<path
					d="M225.5,397.2h29.4v36.3c2.9-3,6.2-5.3,9.9-6.9c3.7-1.5,7.8-2.3,12.3-2.3c9.2,0,16.9,3.3,22.9,10
					c6.1,6.6,9.1,16.2,9.1,28.6c0,8.3-1.4,15.6-4.1,21.9c-2.8,6.3-6.6,11-11.5,14.1c-4.9,3.1-10.3,4.7-16.3,4.7c-5.1,0-9.8-1.1-14-3.3
					c-3.2-1.7-6.7-4.9-10.4-9.6v11.2h-27.2V397.2z M254.6,463.8c0,6.5,1.2,11.3,3.7,14.2c2.5,2.9,5.6,4.4,9.3,4.4
					c3.5,0,6.4-1.4,8.8-4.3c2.4-2.9,3.5-7.7,3.5-14.5c0-6-1.2-10.4-3.5-13.2c-2.3-2.8-5.1-4.2-8.4-4.2c-4,0-7.2,1.5-9.7,4.4
					C255.9,453.4,254.6,457.8,254.6,463.8z"
				/>
				<path d="M304.4,397.2h98.4V423h-33v78.9h-32.4V423h-33V397.2z" />
				<path d="M395.8,426h34.5l12,21.2l14-21.2h32.1l-25.9,36.2l27.7,39.7h-33.9l-14-24.4l-16.5,24.4h-31.5l27.6-39.7L395.8,426z" />
				<path
					d="M530.6,397.2V426h16v21.3h-16v26.9c0,3.2,0.3,5.4,0.9,6.4c1,1.6,2.6,2.4,5,2.4c2.1,0,5.1-0.6,9-1.9l2.1,20.1
					c-7.2,1.6-13.9,2.4-20.1,2.4c-7.2,0-12.6-0.9-16-2.8c-3.4-1.9-6-4.7-7.6-8.5s-2.5-9.9-2.5-18.4v-26.7h-10.7V426h10.7v-13.9
					L530.6,397.2z"
				/>
			</g>
		</g>
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
	example:example,

	edit( props ) {
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

		let setTitleFontSize = newLevel => {
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
								setAttributes({ titleMarginBottom: formatNum(value, titleMarginBottom) });
							}}
							min={-1}
							max={3}
							step={0.1}
						/>
						<label>{__("Margin bottom size of after this block (rem)", "vk-blocks")}</label>
						<RangeControl
							value={outerMarginBottom}
							onChange={value => {
								setAttributes({ outerMarginBottom: formatNum(value, outerMarginBottom) });
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
						<label>{__("Text size (rem)", "vk-blocks")}</label>
						<RangeControl
							value={titleSize}
							onChange={value => {
								setAttributes({ titleSize: formatNum(value, titleSize) });
							}}
							min={0.5}
							max={4}
							step={0.1}
						/>
						<BaseControl label={ __("Text Color", "vk-blocks") }>
							<ColorPalette value={titleColor} onChange={value => setAttributes({ titleColor: value })}/>
						</BaseControl>
						<h4 className="mt-0 mb-2">{ __('Icon ( Font Awesome )', 'vk-blocks') }</h4>
						<BaseControl label={ __("Before text", "vk-blocks") }>
							<FontAwesome attributeName={ "fontAwesomeIconBefore" } { ...props } />
						</BaseControl>
						<BaseControl label={ __("After text", "vk-blocks") }>
							<FontAwesome attributeName={ "fontAwesomeIconAfter" } { ...props } />
						</BaseControl>
						<BaseControl label={ __("Icon Color", "vk-blocks") }>
							<ColorPalette value={fontAwesomeIconColor} onChange={value => setAttributes({ fontAwesomeIconColor: value })}/>
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
								setAttributes({ subTextSize: formatNum(value, subTextSize) });
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
					<VKBHeading {...props} for_={"edit"}/>
				</div>
			</Fragment>
		);
	},

	save(props) {
		return (
			<div>
				<VKBHeading {...props} for_={"save"}/>
			</div>
		);
	},
	deprecated: Deprecated
});
