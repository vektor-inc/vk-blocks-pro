/**
 * FAQ Answer Block
 */
import { vkbBlockEditor } from "./../../utils/depModules";
import classNames from "classnames";
import { content } from "./../../utils/example-data";
import BlockIcon from "./icon.svg";

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { InnerBlocks } = vkbBlockEditor;


registerBlockType("vk-blocks/faq2-a", {
	title: __("FAQ Answer", "vk-blocks"),
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
					content: content,
				},
			},
		],
	},
	edit( { attributes, className } ) {
		const { content } = attributes;
		return (
			<dd className={ classNames(className,`vk_faq_content`) }>
				<InnerBlocks
					templateLock={ false }
					template={ [
						[ 'core/paragraph', { content} ],
					] }
				/>
			</dd>
		);
	  },

	save() {
		return (
			<dd className={ `vk_faq_content` }>
				<InnerBlocks.Content />
			</dd>
	 	);
	},
});
