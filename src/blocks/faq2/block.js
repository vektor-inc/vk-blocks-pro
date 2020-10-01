/**
 * FAQ Outer Block
 */
import { vkbBlockEditor } from "./../_helper/depModules";
import classNames from "classnames";
import { content, title } from "./../_helper/example-data";
import BlockIcon from './icon.svg';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { InnerBlocks } = vkbBlockEditor;

registerBlockType("vk-blocks/faq2", {
	title: __("New FAQ", "vk-blocks"),
	icon: <BlockIcon />,
	category: "vk-blocks-cat",
	attributes: {
	  heading: {
		  type: "string",
		  source: "html",
		  selector: "dt"
	  },
	  content:{
		  type: "string"
	  }
	},
	supports: {
		anchor: true,
		className: true,
	},
	styles: [
		{
			name: 'vk_faq-normal',
			label: __( 'Normal', 'vk-blocks' ),
			isDefault:true
		},
		{
			name: 'vk_faq-bgfill-circle',
			label: __( 'Bgfill Circle', 'vk-blocks' )
		},
		{
			name: 'vk_faq-bgfill-square',
			label: __( 'Bgfill Square', 'vk-blocks' ),
		},
		{
			name: 'vk_faq-bgfill-rounded',
			label: __( 'Bgfill Rounded', 'vk-blocks' ),
		},
		{
			name: 'vk_faq-border-circle',
			label: __( 'Border Circle', 'vk-blocks' ),
		},
		{
			name: 'vk_faq-border-square',
			label: __( 'Border Square', 'vk-blocks' ),
		},
		{
			name: 'vk_faq-border-rounded',
			label: __( 'Border Rounded', 'vk-blocks' ),
		},
	],
	example: {
		innerBlocks: [
			{
				name: 'vk-blocks/faq2-q',
				innerBlocks: [
					{
						name: 'core/paragraph',
						attributes: {
							content: title,
						},
					},
				],
			},
			{
				name: 'vk-blocks/faq2-a',
				innerBlocks: [
					{
						name: 'core/paragraph',
						attributes: {
							content: content,
						},
					},
				],
			},
		],
	},
	edit( { className } ) {
		return (
			<dl className={ classNames(className,"vk_faq") }>
				<InnerBlocks
					allowedBlocks={ [
						[ 'vk-blocks/faq2-q' ],
						[ 'vk-blocks/faq2-a' ],
					] }
					template={ [
						[ 'vk-blocks/faq2-q' ],
						[ 'vk-blocks/faq2-a' ],
					] }
					templateLock='all'
				/>
			</dl>
		);
	  },

	save() {
		return (
			<dl className={ `vk_faq` }>
				<InnerBlocks.Content />
			</dl>
	 	);
	},
});
