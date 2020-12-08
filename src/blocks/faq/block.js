/**
 * Faq block type
 *
 */
import { deprecated } from "./deprecated";
import { vkbBlockEditor } from "./../../utils/depModules";
import classNames from "classnames";
import { content, title } from "./../../utils/example-data"
import { ReactComponent as Icon } from './icon.svg';

const { __ } = wp.i18n;
const { Fragment } = wp.element;
const { registerBlockType } = wp.blocks;
const { PanelBody, PanelRow } = wp.components;
const { RichText, InnerBlocks, InspectorControls } = vkbBlockEditor;


registerBlockType("vk-blocks/faq", {
  title: __("Classic FAQ", "vk-blocks"),
  icon: <Icon />,
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
	  anchor: true
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
	example:{
		attributes: {
			heading: title,
		},
		innerBlocks: [
			{
				name: 'core/paragraph',
				attributes: {
					content,
				},
			},
		],
	},

  	edit({ attributes, setAttributes, className }) {
		let massage;
		if ( vk_blocks_check.is_pro ) {
			massage = __( 'If you want to be collapsing this block, you can set it at Setting > VK Blocks', 'vk-blocks' );
		} else {
			massage = __( 'You can be collapsing this block at VK Blocks Pro', 'vk-blocks' );
		}
		const { heading, content } = attributes;
		const TEMPLATE = [
			[ 'core/paragraph', { content} ],
		];

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody title={ __('Accordion Setting', 'vk-blocks') }>
						<PanelRow>{ massage }</PanelRow>
					</PanelBody>
				</InspectorControls>
				<dl className={ classNames(className,"vk_faq") }>
					<RichText
						tagName="dt"
						className={ "vk_faq_title" }
						onChange={ value => setAttributes({ heading: value }) }
						value={ heading }
						placeholder={ __("Please enter a question.", "vk-blocks") }
					/>
					<dd className={ `vk_faq_content` }> <InnerBlocks template={ TEMPLATE } /></dd>
				</dl>
			</Fragment>
		);
	},

	save({ attributes }) {
		const { heading} = attributes;
		return (
			<dl className={ `vk_faq [accordion_trigger_switch]` }>
				<RichText.Content
					tagName="dt"
					className={ "vk_faq_title" }
					value={ heading }
				/>
				<dd className={ `vk_faq_content` }>
					<InnerBlocks.Content />
				</dd>
			</dl>
		);
  	},
  	deprecated
});
