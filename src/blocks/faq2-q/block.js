/**
 * FAQ Question Block
 */
import { vkbBlockEditor } from "./../_helper/depModules";
import classNames from "classnames";
import { title } from "./../_helper/example-data";

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { RichText, InnerBlocks } = vkbBlockEditor;

const BlockIcon = (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="576"
		height="512"
		viewBox="0 0 576 512"
	>
		<path
			d="M178.9,191.6c7.2,5,12,8.2,14.2,9.4c3.3,1.9,7.8,4,13.4,6.5l-16.1,32.4c-8.1-3.9-16.1-8.6-24-14
			c-7.9-5.4-13.4-9.5-16.6-12.2c-12.8,5.5-28.8,8.3-48,8.3c-28.4,0-50.9-7.4-67.3-22.2c-19.4-17.5-29.1-42.2-29.1-73.9
			c0-30.8,8.5-54.7,25.5-71.8c17-17.1,40.7-25.6,71.2-25.6c31.1,0,55,8.3,71.9,25c16.9,16.7,25.3,40.6,25.3,71.6
			C199.3,152.8,192.5,175,178.9,191.6z M134.6,161.9c4.6-8.3,6.9-20.6,6.9-37c0-18.9-3.5-32.4-10.5-40.5c-7-8.1-16.7-12.1-29-12.1
			c-11.5,0-20.8,4.1-28,12.4c-7.1,8.3-10.7,21.2-10.7,38.7c0,20.4,3.5,34.8,10.5,43c7,8.3,16.6,12.4,28.7,12.4
			c3.9,0,7.6-0.4,11.1-1.1c-4.9-4.7-12.5-9.1-23-13.3l9.1-20.8c5.1,0.9,9.1,2.1,11.9,3.4c2.9,1.4,8.4,4.9,16.7,10.7
			C130.1,159.1,132.3,160.5,134.6,161.9z"
		/>
		<path
			d="M137.9,452.6H72.2l-9.1,30.9l-59,0l70.3-187.2h63.1l70.3,187.2h-60.6L137.9,452.6z M125.9,412.1l-20.7-67.3l-20.4,67.3
			H125.9z"
		/>
		<path
			d="M553.9,239.9h-303c-10,0-18.1-8.1-18.1-18.1c0-10,8.1-18.1,18.1-18.1h303c10,0,18.1,8.1,18.1,18.1
			C572,231.8,563.9,239.9,553.9,239.9z"
		/>
		<path
			d="M553.9,483.5h-303c-10,0-18.1-8.1-18.1-18.1c0-10,8.1-18.1,18.1-18.1h303c10,0,18.1,8.1,18.1,18.1
			C572,475.4,563.9,483.5,553.9,483.5z"
		/>
	</svg>
);

registerBlockType("vk-blocks/faq2-q", {
	title: __("FAQ Question", "vk-blocks"),
	icon: BlockIcon,
	category: "vk-blocks-cat",
	attributes: {
		heading: {
			type: "string",
			source: "html",
			selector: "dt"
		},
	},
	parent: ["vk-blocks/faq2"],
	supports: {
		anchor: true,
	},
	example:{
		attributes: {
			heading: title,
		},
	},
	edit( { attributes, setAttributes, className } ) {
		const { heading } = attributes;
		return (
			<dl className={ classNames(className,`vk_faq_question` ) }>
				<RichText
					tagName="dt"
					className={ `vk_faq_title` }
					onChange={ value => setAttributes({ heading: value }) }
					value={ heading }
					placeholder={ __("Please enter a question.", "vk-blocks") }
				/>
				<dd className={ `vk_faq_content` }>
					<InnerBlocks
						templateLock={ false }
					/>
				</dd>
			</dl>
		);
	  },

	save({ attributes }) {
		const { heading } = attributes;
		return (
			<dl className={ `vk_faq_question` }>
				<RichText.Content
					tagName="dt"
					className={ `vk_faq_title` }
					value={ heading }
        		/>
				<dd className={ `vk_faq_content` }>
					<InnerBlocks.Content />
				</dd>
			</dl>
	 	);
	},
});
