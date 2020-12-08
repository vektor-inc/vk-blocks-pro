/**
 * heading block type
 *
 */
import { schema, example } from "./schema";
import { VKBHeading } from "./component";
import { Deprecated } from "./deprecated/block";
import { vkbBlockEditor } from "./../../utils/depModules";
import { FontAwesome } from "./../../utils/font-awesome-new";
import { ReactComponent as Icon } from './icon.svg';

import HeadingLevelDropdown from './heading-level-dropdown';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const {
	RangeControl,
	PanelBody,
	RadioControl,
	SelectControl,
	BaseControl,
	ToolbarGroup,
} = wp.components;
const { Fragment } = wp.element;
const {
	InspectorControls,
	ColorPalette,
	BlockControls,
	AlignmentToolbar,
} = vkbBlockEditor;

registerBlockType("vk-blocks/heading", {

	title: __("Heading", "vk-blocks"),
	icon: <Icon />,
	category: "vk-blocks-cat",
	attributes: schema,
	supports: {
		className: true,
		customClassName: true,
		anchor: true
	},
	example,

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
			fontAwesomeIconColor,
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
					<ToolbarGroup>
						<HeadingLevelDropdown
							selectedLevel={ level }
							onChange={ setTitleFontSize }
						/>
					</ToolbarGroup>
					<AlignmentToolbar
						value={ align }
						onChange={ ( value ) => {
							setAttributes( { align: value } );
						} }
					/>
				</BlockControls>
				<InspectorControls>
					<PanelBody title={ __("Style Settings", "vk-blocks") }>
						<SelectControl
							label={ __("Heading style", "vk-blocks") }
							value={ titleStyle }
							onChange={ value => setAttributes({ titleStyle: value }) }
							options={ [
								{ label: __("Default", "vk-blocks"), value: "default" },
								{ label: __("Plain", "vk-blocks"), value: "plain" }
							] }
						/>
					</PanelBody>
					<PanelBody title={ __("Margin Setting", "vk-blocks") }>
						<label>{ __("Margin bottom size of after hedding  (rem)", "vk-blocks") }</label>
						<RangeControl
							value={ titleMarginBottom }
							onChange={ value => {
								setAttributes({ titleMarginBottom: value });
							} }
							min={ -1 }
							max={ 3 }
							step={ 0.1 }
						/>
						<label>{ __("Margin bottom size of after this block (rem)", "vk-blocks") }</label>
						<RangeControl
							value={ outerMarginBottom }
							onChange={ value => {
								setAttributes({ outerMarginBottom: value });
							} }
							min={ -1 }
							max={ 8 }
							step={ 0.1 }
						/>
					</PanelBody>
					<PanelBody title={ __("Heading Settings", "vk-blocks") }>
						<RangeControl
							label={ __("Text size (rem)", "vk-blocks") }
							value={ titleSize }
							onChange={ value => {
								setAttributes({ titleSize: value });
							} }
							min={ 0.5 }
							max={ 4 }
							step={ 0.1 }
						/>
						<BaseControl label={ __("Text Color", "vk-blocks") }>
							<ColorPalette value={ titleColor } onChange={ value => setAttributes({ titleColor: value }) } />
						</BaseControl>
					</PanelBody>
					<PanelBody title={ __("Font Awesome Icon Settings", "vk-blocks") }>
						<BaseControl label={ __("Before text", "vk-blocks") }>
							<FontAwesome attributeName={ "fontAwesomeIconBefore" } { ...props } />
						</BaseControl>
						<BaseControl label={ __("After text", "vk-blocks") }>
							<FontAwesome attributeName={ "fontAwesomeIconAfter" } { ...props } />
						</BaseControl>
						<BaseControl label={ __("Icon Color", "vk-blocks") }>
							<ColorPalette value={ fontAwesomeIconColor } onChange={ value => setAttributes({ fontAwesomeIconColor: value }) } />
						</BaseControl>
					</PanelBody>
					<PanelBody title={ __("Sub Text Settings", "vk-blocks") }>
						<RadioControl
							label={ __("Position", "vk-blocks") }
							selected={ subTextFlag }
							options={ [
								{ label: __("Display", "vk-blocks"), value: "on" },
								{ label: __("Hide", "vk-blocks"), value: "off" }
							] }
							onChange={ value => setAttributes({ subTextFlag: value }) }
						/>
						<label>{ __("Text size (rem)", "vk-blocks") }</label>
						<RangeControl
							value={ subTextSize }
							onChange={ value => {
								setAttributes({ subTextSize: value });
							} }
							min={ 0.5 }
							max={ 3 }
							step={ 0.1 }
						/>
						<ColorPalette
							value={ subTextColor }
							onChange={ value => setAttributes({ subTextColor: value }) }
						/>
					</PanelBody>
				</InspectorControls>
				<div className={ className }>
					<VKBHeading { ...props } for_={ "edit" } />
				</div>
			</Fragment>
		);
	},

	save(props) {
		return (
			<div>
				<VKBHeading { ...props } for_={ "save" } />
			</div>
		);
	},
	deprecated: Deprecated
});
