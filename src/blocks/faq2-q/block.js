/**
 * FAQ Question Block
 */
import { vkbBlockEditor } from "./../../utils/depModules";
import classNames from "classnames";
import { title } from "./../../utils/example-data";
import BlockIcon from "./icon.svg";

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { InnerBlocks } = vkbBlockEditor;

registerBlockType("vk-blocks/faq2-q", {
	title: __("FAQ Question", "vk-blocks"),
	icon: <BlockIcon />,
	category: "vk-blocks-cat",
	attributes: {
		content:{
			type: "string"
		}
	},
	parent: ["vk-blocks/faq2"],
	supports: {
		anchor: true,
	},
	example:{
		innerBlocks: [
			{
				name: 'core/paragraph',
				attributes: {
					content: title,
				},
			},
		],
	},
	edit( { attributes, className } ) {
		const { content } = attributes;
		return (
			<dt className={ classNames(className,`vk_faq_title` ) }>
				<InnerBlocks
					templateLock={ false }
					template={ [
						[ 'core/paragraph', { content} ],
					] }
				/>
			</dt>
		);
	  },

	save() {
		return (
			<dt className={ `vk_faq_title` }>
				<InnerBlocks.Content />
			</dt>
	 	);
	},
});
