/**
 * step block type
 *
 */
import { Component } from "./component";
import { schema } from "./schema";
import { hiddenNewBlock } from "../../_helper/hiddenNewBlock"
import BlockIcon from "./icon.svg";
const inserterVisible = hiddenNewBlock(5.3);

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const { PanelBody } = wp.components;
const { Fragment, useEffect } = wp.element;
import { vkbBlockEditor, dispatchEditor } from "../../_helper/depModules"
const { InspectorControls } = vkbBlockEditor;
const { updateBlockAttributes } = dispatchEditor;
import { asyncGetInnerBlocks } from "../../_helper/asyncHooks";
import { title, content } from "../../_helper/example-data";


registerBlockType("vk-blocks/step", {
	title: __("Step", "vk-blocks"), // Block title.
	icon: <BlockIcon />, // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: "vk-blocks-cat", // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	attributes: schema,
	supports: {
		inserter: inserterVisible,
	},
	example: {
		attributes: {
			firstDotNum: 1,
		},
		innerBlocks: [
			{
				name: 'vk-blocks/step-item',
				attributes: {
					color: '#337ab7',
					style: 'solid',
					styleLine: 'default',
					dotCaption: 'STEP',
					dotNum: 1,
					faIcon: '',
				},
				innerBlocks: [
					{
						name: 'core/heading',
						attributes: {
							level: 4,
							content: title,
						},
					},
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
	edit({ attributes, setAttributes, className, clientId }) {
		const { firstDotNum } = attributes;

		const currentInnerBlocks = asyncGetInnerBlocks( clientId );

		const resetDotNum = useEffect( () => {
			currentInnerBlocks.forEach( function ( block, index ) {
				updateBlockAttributes( block.clientId, { dotNum: firstDotNum + index });
			})

		}, [ attributes.firstDotNum, currentInnerBlocks.length ] );

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody title={ __("First Dot Number", "vk-blocks") }>
						<input
							type="number"
							id={ "dot-number" }
							onChange={ event => {
								const value = parseInt( event.target.value, 10 );
								setAttributes({ firstDotNum: value });
							} }
							value={ firstDotNum }
							min="1"
							step="1"
						/>
					</PanelBody>
				</InspectorControls>
				<Component
					attributes={ attributes }
					className={ className }
					setAttributes={ setAttributes }
					resetDotNum={resetDotNum}
					for_={ "edit" }
				/>
			</Fragment>
		);
	},
	save({ attributes, className }) {
		return (
			<Component attributes={ attributes } className={ className } for_={ "save" } />
		);
	}
});
