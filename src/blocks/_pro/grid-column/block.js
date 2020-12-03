/**
 * Column Responsive block type
 *
 */
import { ColumnResponsive } from "./component";
import { schema } from "./schema";
import { ColumnLayout } from "../../../components/column-layout";
import classNames from "classnames";
import { convertToGrid } from "../../_helper/convert-to-grid";
import {vkbBlockEditor} from "../../_helper/depModules"
import BlockIcon from "./icon.svg";
import compareVersions from 'compare-versions';
import deprecated from "./deprecated/"

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { Fragment } = wp.element;
const { InspectorControls } =vkbBlockEditor;
const { select, dispatch } = wp.data;
const { PanelBody } = wp.components;
const { createHigherOrderComponent } = wp.compose;
const { addFilter } = wp.hooks;

let displayInserter = false;
if ( window.wpVersion && compareVersions( window.wpVersion, "5.4" ) > 0 ){
	displayInserter = true;
}

registerBlockType("vk-blocks/grid-column", {
	title: __("Grid Column", "vk-blocks"),
	icon: <BlockIcon />,
	category: "vk-blocks-cat-layout",
	attributes: schema,
	supports: {
		className: true,
		inserter: displayInserter,
	},

	edit(props) {
		const { attributes, setAttributes, className, clientId, name } = props;

		const { getBlocksByClientId } = select("core/block-editor");
		const { updateBlockAttributes } = dispatch("core/block-editor");

		const thisBlock = getBlocksByClientId(clientId);

		let beforeLength;
		let afterLength;

		if (
			thisBlock !== undefined &&
			thisBlock[0] !== null &&
			thisBlock[0].innerBlocks !== undefined
		) {
			const innerBlocks = thisBlock[0].innerBlocks;
			beforeLength = innerBlocks.length;

			if (beforeLength !== undefined) {
				if (beforeLength !== afterLength) {
					for (let i = 0; i < innerBlocks.length; i++) {
						if (innerBlocks[i] !== undefined) {
							updateBlockAttributes(innerBlocks[i].clientId, {
								name: attributes.name,
								layout: attributes.layout,
								col_xs: attributes.col_xs,
								col_sm: attributes.col_sm,
								col_md: attributes.col_md,
								col_lg: attributes.col_lg,
								col_xl: attributes.col_xl,
								col_xxl: attributes.col_xxl,
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
					<PanelBody
						title={ __("Layout Columns", "vk-blocks") }
						initialOpen={ false }
					>
						<ColumnLayout { ...props } />
					</PanelBody>
				</InspectorControls>
				<ColumnResponsive
					attributes={ attributes }
					className={ className }
					setAttributes={ setAttributes }
					for_={ "edit" }
				/>
			</Fragment>
		);
	},
	save({ attributes }) {
		return (
			<div>
				<ColumnResponsive
					attributes={ attributes }
					for_={ "save" }
				/>
			</div>
		);
	},
	deprecated
});

const vkbwithClientIdClassName = createHigherOrderComponent(
	(BlockListBlock) => {
		return (props) => {
			if (props.name === "vk-blocks/grid-column-item") {
				const { col_xs, col_sm, col_md, col_lg, col_xl, col_xxl } = props.attributes;
				const customClass = classNames(
					props.className,
					`col-${convertToGrid(col_xs)} col-sm-${convertToGrid(col_sm)} col-md-${convertToGrid(col_md)} col-lg-${convertToGrid(col_lg)} col-xl-${convertToGrid(col_xl)} col-xxl-${convertToGrid(col_xxl)}`
				);
				return (
					<BlockListBlock
						{ ...props }
						className={ customClass }
					/>
				);
			}
			return <BlockListBlock { ...props } />;

		};
	},
	"vkbwithClientIdClassName"
);

addFilter(
	"editor.BlockListBlock",
	"vk-blocks/grid-column",
	vkbwithClientIdClassName
);

addFilter(
	"blocks.getSaveElement",
	"vk-blocks/grid-column",
	(element, blockType, attributes) => {

		const post = select( 'core/editor' ).getCurrentPost();
		const { col_xs, col_sm, col_md, col_lg, col_xl, col_xxl } = attributes;

		if (blockType.name === "vk-blocks/grid-column-item" && element) {
			return {
				...element,
				...{
					props: {
						...element.props,
						...{
							className: classNames(
								element.props.className,
								`col-${convertToGrid(col_xs)} col-sm-${convertToGrid(col_sm)} col-md-${convertToGrid(col_md)} col-lg-${convertToGrid(col_lg)} col-xl-${convertToGrid(col_xl)} col-xxl-${convertToGrid(col_xxl)}`
							),
						},
					},
				},
			};
		}

		return element;
	}
);
