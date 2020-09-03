/**
 * table-of-contents-new-new block type
 */

import { schema } from "./schema";
import {
	isAllowedBlock,
	getBlocksByName,
	returnHtml,
	getAllHeadings,
	removeUnnecessaryElements,
	asyncGetBlocksByName,
} from "./toc-utils";
import BlockIcon from "./icon.svg";

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const {
	PanelBody,
	SelectControl,
	BaseControl,
} = wp.components;
const { Fragment } = wp.element;
import { vkbBlockEditor } from "../../_helper/depModules";
const { InspectorControls } = vkbBlockEditor;
const { addFilter } = wp.hooks;
const { createHigherOrderComponent } = wp.compose;
const { dispatch } = wp.data;
import { hiddenNewBlock } from "../../_helper/hiddenNewBlock"
const inserterVisible = hiddenNewBlock(5.3);
import TocBody from './TocBody'

registerBlockType("vk-blocks/table-of-contents-new", {
	title: __("Table of Contents", "vk-blocks"),
	icon: <BlockIcon />,
	category: "vk-blocks-cat",
	attributes: schema,
	supports: {
		inserter: inserterVisible
	},

	edit(props) {
		const { attributes, setAttributes } = props;
		const { style, open } = attributes;
		return (
			<Fragment>
				<InspectorControls>
					<PanelBody>
						<BaseControl label={ __("Style", "vk-blocks") }>
							<SelectControl
								value={ style }
								onChange={ (value) => setAttributes({ style: value }) }
								options={ [
									{
										value: "default",
										label: __("Default", "vk-blocks"),
									},
									{
										value: "",
										label: __("No frame", "vk-blocks"),
									},
								] }
							/>
						</BaseControl>
						<BaseControl label={ __("Default Display Status", "vk-blocks") }>
							<SelectControl
								value={ open }
								onChange={ (value) => setAttributes({ open: value }) }
								options={ [
									{
										value: "open",
										label: __("OPEN", "vk-blocks"),
									},
									{
										value: "close",
										label: __("CLOSE", "vk-blocks"),
									},
								] }
							/>
						</BaseControl>
					</PanelBody>
				</InspectorControls>
				<TocBody { ...props } />
			</Fragment>
		);
	},

	save(props) {
		return <TocBody { ...props } />;
	},
});

const getHeadings = (props) => {
	const { className, name, clientId, attributes } = props;
	const { anchor } = attributes;

	const tocs = getBlocksByName("vk-blocks/table-of-contents-new");
	const tocClientId = tocs[0] ? tocs[0].clientId : "";
	const tocAttributes = tocs[0] ? tocs[0].attributes : "";
	const { updateBlockAttributes } = dispatch("core/block-editor") ? dispatch("core/block-editor") : dispatch("core/editor");
	const headingList = ["core/heading", "vk-blocks/heading"];

	if (
		anchor === undefined &&
		isAllowedBlock(name, headingList) != undefined
	) {
		updateBlockAttributes(clientId, {
	anchor: `vk-htags-${clientId}`,
		});
	}

	const asyncToc = asyncGetBlocksByName("vk-blocks/table-of-contents-new");
	const open = asyncToc[0] ? asyncToc[0].attributes.open : "";

	const headingsRaw = getAllHeadings(headingList);
	const headings = removeUnnecessaryElements(headingsRaw);
	const render = returnHtml(headings, tocAttributes, className, open);

	if (isAllowedBlock(name, headingList) != undefined) {
		updateBlockAttributes(tocClientId, {
			renderHtml: render,
		});
	}
};

const updateTableOfContents = createHigherOrderComponent((BlockListBlock) => {
	return (props) => {
		const allowedBlocks = [
			"vk-blocks/heading",
			"vk-blocks/outer",
			"core/heading",
			"core/cover",
			"core/group",
		];
		if (isAllowedBlock(props.name, allowedBlocks)) {
			getHeadings(props);
		}
		return <BlockListBlock { ...props } />;
	};
}, "updateTableOfContents");

if (5.3 <= parseFloat(wpVersion)) {
	addFilter(
		"editor.BlockListBlock",
		"vk-blocks/table-of-contents-new",
		updateTableOfContents
	);
}
