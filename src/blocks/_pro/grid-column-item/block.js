/**
 * card-item block type
 *
 */
import { schema } from "./schema";
import {vkbBlockEditor} from "../../../utils/depModules"
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { InnerBlocks } = vkbBlockEditor;
import deprecated from "./deprecated"
import { ReactComponent as Icon } from './icon.svg';


registerBlockType("vk-blocks/grid-column-item", {
	title: __("Grid Column Item", "vk-blocks"),
	icon: <Icon />,
	category: "vk-blocks-cat",
	attributes: schema,
	parent: ["vk-blocks/grid-column"],
	supports: {
		className: true,
	},

	edit(props) {
		const { className } = props;
		return (
			<div className={ `${className}` }>
				<InnerBlocks />
			</div>
		);
	},

	save(props) {
		return (
			<div>
				<InnerBlocks.Content />
			</div>
		);
	},
	deprecated:deprecated
});
