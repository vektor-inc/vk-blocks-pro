/**
 * FAQ Outer Block
 */
import { vkbBlockEditor } from "./../_helper/depModules";
import { deprecated } from "./deprecated";
import classNames from "classnames";
import { content, title } from "./../_helper/example-data";
import BlockIcon from "./icon.svg";

const { registerBlockType } = wp.blocks;
const { Fragment } = wp.element;
const { PanelBody, PanelRow } = wp.components;
const { InnerBlocks, InspectorControls } = vkbBlockEditor;
const { __ } = wp.i18n;

registerBlockType("vk-blocks/faq2", {
	title: __("New FAQ", "vk-blocks"),
	icon: <BlockIcon />,
	category: "vk-blocks-cat",
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
	edit( props ) {
		const { className } = props;

		let massage;
		if ( vk_blocks_check.is_pro ) {
			massage = __( 'If you want to be collapsing this block, you can set it at Setting > VK Blocks', 'vk-blocks' );
		} else {
			massage = __( 'You can be collapsing this block at VK Blocks Pro', 'vk-blocks' );
		}

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody title={ __('Accordion Setting', 'vk-blocks') }>
						<PanelRow>{ massage }</PanelRow>
					</PanelBody>
				</InspectorControls>
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
			</Fragment>

		);

	  },

	save() {
		return (
			<dl className={ `vk_faq [accordion_trigger_switch]` }>
				<InnerBlocks.Content />
			</dl>
	 	);
	},
	deprecated
});
