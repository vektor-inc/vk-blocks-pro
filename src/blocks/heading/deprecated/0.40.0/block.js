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
export const save = (props) => {
	return (
		<div>
			<VKBHeading {...props} for_={"save"}/>
		</div>
	);
},
