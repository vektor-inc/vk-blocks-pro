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
const { registerBlockType, createBlock } = wp.blocks; // Import registerBlockType() from wp.blocks
const { PanelBody } = wp.components;
const { Fragment } = wp.element;
import { vkbBlockEditor } from "../../_helper/depModules"
const { InspectorControls } = vkbBlockEditor;
const { useSelect } = wp.data;
import { selectEditor, dispatchEditor } from "../../_helper/depModules";
const { getBlocksByClientId } = selectEditor;
const { updateBlockAttributes, insertBlock } = dispatchEditor;
const { createHigherOrderComponent } = wp.compose;



registerBlockType("vk-blocks/step", {
	title: __("Step", "vk-blocks"), // Block title.
	icon: <BlockIcon />, // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: "vk-blocks-cat", // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	attributes: schema,
	supports: {
		inserter: inserterVisible
	},

	edit({ attributes, setAttributes, className, clientId }) {
		const { firstDotNum } = attributes;
		const currentBlock = getBlocksByClientId(clientId);
		let beforeLength;
		let afterLength;

		if (
			currentBlock != undefined &&
			currentBlock[0] != null &&
			currentBlock[0].innerBlocks != undefined
		) {
			const innerBlocks = currentBlock[0].innerBlocks;
			beforeLength = innerBlocks.length;

			if (
				beforeLength !== undefined &&
				beforeLength !== 0 &&
				beforeLength !== 1
			) {
				if (beforeLength !== afterLength) {
					for (let i = 0; i < innerBlocks.length; i++) {
						if (innerBlocks[i] !== undefined) {
							updateBlockAttributes(innerBlocks[i].clientId, {
								dotNum: firstDotNum + i
							});
						}
					}
				}
				afterLength = beforeLength;
			}
		}

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody title={ __("First Dot Number", "vk-blocks") }>
						<input
							type="number"
							id={ "dot-number" }
							onChange={ event => {
								const value = parseInt(event.target.value, 10);
								setAttributes({
									firstDotNum: value
								});
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


if (5.3 <= parseFloat(wpVersion)) {
	/* Filter of editor.BlockEdit
	/*-----------------------------------*/
	wp.hooks.addFilter(
		"editor.BlockEdit",
		"vk-blocks/step",
		createHigherOrderComponent((BlockEdit) => {
			let preClientId;
			const clientIdList = [];
			return (props) => {

				if (props.name === "vk-blocks/step-item" && -1 === clientIdList.indexOf(props.clientId)) {

					const preAttributes = useSelect(
						select => {
							return select("core/block-editor").getBlockAttributes(preClientId);
						},
						[]
					);

					if (null !== preAttributes) {
						updateBlockAttributes(props.clientId, {
							dotNum: preAttributes.dotNum + 1
						})
					}
					preClientId = props.clientId;
					clientIdList.push(props.clientId);
				}
				return <BlockEdit { ...props } />;
			};
		}, "addAutoStepIndexUpdate")
	);
}
