/**
 * Column Responsive block type
 *
 */
import { ColumnResponsive } from "./component";
import { schema } from "./schema";
import { ColumnLayout } from "../../../components/column-layout";
import classNames from "classnames";
import { convertToGrid } from "../../_helper/convert-to-grid";

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { Fragment } = wp.element;
const { InspectorControls } = wp.blockEditor;
const { select, dispatch } = wp.data;
const { PanelBody } = wp.components;

const BlockIcon = (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 576">
		<path
			className="st0"
			d="M456.1,1320.7H118.4v36.6H533V945.2h-35.5v334C497.6,1302.1,479,1320.7,456.1,1320.7z"
    />
		<g>
			<path d="M167.1,115.3c14.6,0,26.5-11.9,26.5-26.5s-11.9-26.5-26.5-26.5s-26.5,11.9-26.5,26.5S152.4,115.3,167.1,115.3z" />
			<path
				d="M101.8,217.7h62.3h40.8h133.5c11.8,0,18.2-15.2,10.6-25.1l-72.2-93c-5.5-7.1-15.5-7.1-21,0l-57.9,74.7
      c-5.8,7.5-16.6,7-21.8-1.1L151,135.1c-5.5-8.5-17-8.5-22.5,0l-38,58.5C84,203.7,90.6,217.7,101.8,217.7z"
      />
		</g>
		<path
			d="M336.5,372.1H103.7c-8.6,0-15.7-7-15.7-15.7v-26.8c0-8.6,7-15.7,15.7-15.7h232.8c8.6,0,15.7,7,15.7,15.7v26.8
    C352.2,365,345.2,372.1,336.5,372.1z"
    />
		<rect x="88" y="240.6" width="264.4" height="17.6" />
		<rect x="88" y="272.8" width="141.2" height="17.6" />
		<path
			d="M537.8,140h-30.9v-33.1c0-20.2-16.4-36.5-36.5-36.5h-31.3V37.5c0-20.2-16.4-36.5-36.5-36.5h-365C17.4,1.1,1,17.4,1,37.5
    v362.9C1,420.6,17.4,437,37.5,437h31.3v32.8c0,20.2,16.4,36.5,36.5,36.5h30.9v0.3v1.9v31c0,20.2,16.4,36.5,36.5,36.5h365
    c20.2,0,36.5-16.4,36.5-36.5V176.6C574.3,156.4,558,140,537.8,140z M37.5,400.4V37.5h365.2v362.9H37.5z M105.3,469.8V437h297.4
    c20.2,0,36.5-16.4,36.5-36.5V106.9h31.2v362.9H105.3z M537.8,539.5H172.7v-33.1h297.6c20.2,0,36.5-16.4,36.5-36.5V176.6h30.9V539.5z
    "
    />
	</svg>
);

let displayInserter = false;
if (window.wpVersion && 5.4 <= window.wpVersion) {
  displayInserter = true;
}

registerBlockType("vk-blocks/column-responsive", {
  title: __("Responsive Column", "vk-blocks"),
  icon: BlockIcon,
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
              updateBlockAttributes(innerBlocks[i].clientId, attributes);
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
  save({ attributes, className }) {
    return (
	<ColumnResponsive
		attributes={ attributes }
		className={ className }
		for_={ "save" }
      />
    );
  },
});

const { createHigherOrderComponent } = wp.compose;
const { addFilter } = wp.hooks;

const vkbwithClientIdClassName = createHigherOrderComponent(
  (BlockListBlock) => {
    return (props) => {
      if (props.name === "vk-blocks/column-responsive-item") {
        const { col_xs, col_sm, col_md, col_lg, col_xl } = props.attributes;
        const customClass = classNames(props.className, `col-${convertToGrid(col_xs)} col-sm-${convertToGrid(col_sm)} col-md-${convertToGrid(col_md)} col-lg-${convertToGrid(col_lg)} col-xl-${convertToGrid(col_xl)}`);
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
  "vk-blocks/column-responsive-item",
  vkbwithClientIdClassName
);

addFilter(
  "blocks.getSaveElement",
  "vk-blocks/hidden-extension",
  (element, blockType, attributes) => {
    const { col_xs, col_sm, col_md, col_lg, col_xl } = attributes;
    if (blockType.name === "vk-blocks/column-responsive-item" && element) {
      element = {
        ...element,
        ...{
          props: {
            ...element.props,
            ...{
              className: classNames(
                element.props.className,
                `col-${col_xs} col-sm-${col_sm} col-md-${col_md} col-lg-${col_lg} col-xl-${col_xl}`
              ),
            },
          },
        },
      };
    }
    return element;
  }
);
