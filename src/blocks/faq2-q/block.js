/**
 * FAQ Question Block
 */
import { vkbBlockEditor } from "./../_helper/depModules";
import classNames from "classnames";
import { title } from "./../_helper/example-data";

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { InnerBlocks } = vkbBlockEditor;

const BlockIcon = (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
		<path d="M432.6,369.7c14.3,9.9,23.8,16.2,28.1,18.6c6.5,3.8,15.5,7.9,26.6,12.9l-31.9,64.2c-16.1-7.7-31.9-17-47.6-27.7
		c-15.7-10.7-26.6-18.8-32.9-24.2c-25.4,10.9-57.1,16.4-95.1,16.4c-56.3,0-100.9-14.7-133.4-44c-38.4-34.7-57.7-83.6-57.7-146.4
		c0-61,16.8-108.4,50.5-142.3s80.7-50.7,141.1-50.7c61.6,0,109,16.4,142.5,49.5S473,176.5,473,238C473,292.9,459.5,336.9,432.6,369.7
		z M344.8,310.9c9.1-16.4,13.7-40.8,13.7-73.3c0-37.5-6.9-64.2-20.8-80.3c-13.9-16.1-33.1-24-57.5-24c-22.8,0-41.2,8.1-55.5,24.6
		c-14.1,16.4-21.2,42-21.2,76.7c0,40.4,6.9,69,20.8,85.2c13.9,16.4,32.9,24.6,56.9,24.6c7.7,0,15.1-0.8,22-2.2
		c-9.7-9.3-24.8-18-45.6-26.4l18-41.2c10.1,1.8,18,4.2,23.6,6.7c5.7,2.8,16.6,9.7,33.1,21.2C335.9,305.3,340.2,308.1,344.8,310.9z" />
	</svg>
);

registerBlockType("vk-blocks/faq2-q", {
	title: __("FAQ Question", "vk-blocks"),
	icon: BlockIcon,
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
