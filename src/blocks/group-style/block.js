/**
 * group-style block type
 *
 */
import { convertColorClass } from "../_helper/color-code-to-class.js";
import { vkbBlockEditor } from "./../_helper/depModules";

const { assign } = lodash;
const { __ } = wp.i18n;
const { Fragment } = wp.element;
const { addFilter } = wp.hooks;
const { PanelBody } = wp.components;
const { InspectorControls, ColorPalette } = vkbBlockEditor;

const { createHigherOrderComponent } = wp.compose;

const isValidBlockType = name => {
	const validBlockTypes = ["core/group"];
	return validBlockTypes.includes(name);
};

export const addAttribute = settings => {
	if (isValidBlockType(settings.name)) {
		settings.attributes = assign(settings.attributes, {
			color: {
				type: "string"
			},
			clientId: {
				type: "string"
			}
		});
	}
	return settings;
};
addFilter("blocks.registerBlockType", "vk-blocks/group-style", addAttribute);

export const addBlockControl = createHigherOrderComponent(BlockEdit => {
	let activeColor = "";
	return props => {
		if (isValidBlockType(props.name) && props.isSelected) {
			if (props.attributes.color) {
				activeColor = props.attributes.color;
			} else {
				activeColor = "#fffd6b";
			}
			return (
				<Fragment>
					<BlockEdit {...props} />
					<InspectorControls>
						<PanelBody
							title={__("Border Color", "vk-blocks")}
							initialOpen={false}
							className="group-border-color-controle"
						>
							<ColorPalette
								value={activeColor}
								onChange={newColor => {
									props.setAttributes({
										color: newColor,
										clientId: props.clientId
									});
								}}
							/>
						</PanelBody>
					</InspectorControls>
				</Fragment>
			);
		}
		return <BlockEdit {...props} />;
	};
}, "addMyCustomBlockControls");

addFilter("editor.BlockEdit", "vk-blocks/group-style", addBlockControl);

const addGroupBorderStyleOnEdit = createHigherOrderComponent((BlockListBlock) => {
	return (props) => {

		if (!isValidBlockType(props.name)) {
			return <BlockListBlock {...props} />
		}

		const editStye = `
			.block-${props.clientId} .wp-block-group, .block-${props.clientId} .wp-block-group.is-style-vk-group-stitch .wp-block-group__inner-container{
				border-color:${props.attributes.color}!important;
			}`;
		return <div className={props.className}>
			<style>
				{editStye}
			</style>
			<BlockListBlock {...props} className={"block-" + props.clientId} />
		</div>;
	};
}, 'addGroupBorderStyleOnEdit');
wp.hooks.addFilter('editor.BlockListBlock', 'core/group', addGroupBorderStyleOnEdit);

const addGroupBorderStyleOnSave = (element, blockType, attributes) => {
	if (blockType.name !== 'core/group') {
		return element;
	}
	const saveStyle = `
			.block-${attributes.clientId}.wp-block-group, .block-${attributes.clientId}.wp-block-group .wp-block-group__inner-container{
				border-color:${attributes.color}!important;
			}`
	return (
		<div className={attributes.className}>
			<style>
				{saveStyle}
			</style>
			{element}
		</div>
	);
}
wp.hooks.addFilter(
	'blocks.getSaveElement',
	'core/group',
	addGroupBorderStyleOnSave
);

const addGroupBorderStyleClass = (props, blockType, attributes) => {
	if ('core/group' === blockType.name) {
		return assign(props, { className: `block-${attributes.clientId} ` + props.className });
	} else {
		return props;
	}
}
wp.hooks.addFilter(
	'blocks.getSaveContent.extraProps',
	'core/group',
	addGroupBorderStyleClass
);

wp.blocks.registerBlockStyle("core/group", [
	{
		name: "vk-group-solid",
		label: __("Solid", "vk-blocks")
	},
	{
		name: "vk-group-solid-roundcorner",
		label: __("Solid Roundcorner", "vk-blocks")
	},
	{
		name: "vk-group-dotted",
		label: __("Dotted", "vk-blocks")
	},
	{
		name: "vk-group-dashed",
		label: __("Dashed", "vk-blocks")
	},
	{
		name: "vk-group-double",
		label: __("Double", "vk-blocks")
	},
	{
		name: "vk-group-stitch",
		label: __("Stitch", "vk-blocks")
	},
	{
		name: "vk-group-top-bottom-border",
		label: __("Border Top Bottom", "vk-blocks")
	},
	{
		name: "vk-group-shadow",
		label: __("Shadow", "vk-blocks")
	},
	{
		name: "vk-group-alert-success",
		label: __("Success", "vk-blocks")
	},
	{
		name: "vk-group-alert-info",
		label: __("Info", "vk-blocks")
	},
	{
		name: "vk-group-alert-warning",
		label: __("Warning", "vk-blocks")
	},
	{
		name: "vk-group-alert-danger",
		label: __("Danger", "vk-blocks")
	}
]);
