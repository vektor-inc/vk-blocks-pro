/**
 * FAQ Answer Block
 */
import { vkbBlockEditor } from "./../../_helper/depModules";
import classNames from "classnames";
import { content } from "./../../_helper/example-data";

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { InnerBlocks } = vkbBlockEditor;

const BlockIcon = (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
		<path d="M358.1,393.5H214l-20,67.8H64.6L218.8,50.7h138.4l154.2,410.7H378.5L358.1,393.5z M331.8,304.7l-45.4-147.6l-44.8,147.6
		L331.8,304.7L331.8,304.7z" />
	</svg>
);

registerBlockType("vk-blocks/accordion-trigger", {
	title: __("Accordion Trigger", "vk-blocks"),
	icon: BlockIcon,
	category: "vk-blocks-cat",
	attributes: {
		content:{
			type: "string"
		}
	},
	parent: ["vk-blocks/accordion"],
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
			<div className={ classNames(className,`vk_accordion-trigger`) }>
				<InnerBlocks
					templateLock={ false }
					template={ [
						[ 'core/paragraph', { content: content} ],
					] }
				/>
				<span className={ classNames(className,`vk_accordion-toggle vk_accordion-toggle-close`) } ></span>
			</div>
		);
	  },

	save() {
		return (
			<div className={ `vk_accordion-trigger` }>
				<InnerBlocks.Content />
				<span className={ `vk_accordion-toggle vk_accordion-toggle-close` } ></span>
			</div>

	 	);
	},
});
