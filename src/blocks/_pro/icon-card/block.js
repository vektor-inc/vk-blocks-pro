/**
 * Pr Card block type
 *
 */
import { PRCard } from "./component";
import { schema } from "./schema";
import { deprecated } from "./deprecated";
import { ColumnLayout } from "../../../components/column-layout";
import { AlignControl } from "../../../components/align-control";
import { hiddenNewBlock } from "../../_helper/hiddenNewBlock"
import removeProperty from "../../_helper/removeProperty"

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { Fragment } = wp.element;
const { PanelBody,BaseControl} = wp.components;
const { InspectorControls } =
  wp.blockEditor && wp.blockEditor.BlockEdit ? wp.blockEditor : wp.editor;
const { select, dispatch } = wp.data;
const BlockIcon = (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">

		<path d="M288,511.9c68.9,0,125-56.2,125-125s-56.1-125-125-125c-68.9,0-125,56.1-125,125S219.1,511.9,288,511.9z
	 M288,302.6c46.5,0,84.3,37.8,84.3,84.3s-37.8,84.3-84.3,84.3s-84.3-37.8-84.3-84.3S241.5,302.6,288,302.6z" />
		<polygon points="270.2,449.9 305.8,449.9 305.8,404.8 351,404.8 351,369.1 305.8,369.1 305.8,323.9 270.2,323.9
	270.2,369.1 225,369.1 225,404.8 270.2,404.8 " />
		<ellipse transform="matrix(0.1602 -0.9871 0.9871 0.1602 188.3588 329.8069)" cx="288" cy="54.2" rx="51.2" ry="51.2" />
		<rect x="224.4" y="133.3" width="127.2" height="91.4" />
		<ellipse transform="matrix(0.9239 -0.3827 0.3827 0.9239 -12.6969 44.5861)" cx="105.7" cy="54.2" rx="51.2" ry="51.2" />
		<rect x="42.1" y="133.3" width="127.2" height="91.4" />
		<path d="M470.3,3c28.3,0,51.2,22.9,51.2,51.2c0,28.3-22.9,51.2-51.2,51.2c-28.3,0-51.2-22.9-51.2-51.2
	C419,25.9,442,3,470.3,3z" />
		<rect x="406.7" y="133.3" width="127.2" height="91.4" />
	</svg>
);
const inserterVisible = hiddenNewBlock(5.3);

registerBlockType("vk-blocks/icon-card", {
  title: __("Icon Card", "vk-blocks"),
  icon: BlockIcon,
  category: "vk-blocks-cat",
  attributes: schema,
  supports: {
    className: true,
    inserter: inserterVisible
  },

  edit(props) {
    const { attributes, setAttributes, className, clientId, name } = props;
    attributes.name = name;

    const selectEditor = select("core/block-editor")
      ? select("core/block-editor")
      : select("core/editor");
    const dispatchEditor = dispatch("core/block-editor")
      ? dispatch("core/block-editor")
      : dispatch("core/editor");

    const { getBlocksByClientId } = selectEditor;
    const { updateBlockAttributes } = dispatchEditor;

    const currentBlock = getBlocksByClientId(clientId);
    let beforeLength;
    let afterLength;

    if (
      currentBlock !== undefined &&
      currentBlock[0] !== null &&
      currentBlock[0].innerBlocks !== undefined
    ) {
      const innerBlocks = currentBlock[0].innerBlocks;
      beforeLength = innerBlocks.length;

      if (beforeLength !== undefined) {
        if (beforeLength !== afterLength) {
          for (let i = 0; i < innerBlocks.length; i++) {
            if (innerBlocks[i] !== undefined) {

							//className以外の値で、子要素のattributesをアップデート
							let updateAttributes = removeProperty(attributes,"className")
							updateAttributes = removeProperty(attributes,"faIcon")
							updateAttributes = removeProperty(attributes,"color")
							updateAttributes = removeProperty(attributes,"bgType")

							updateBlockAttributes(innerBlocks[i].clientId, updateAttributes);

            }
          }
        }
        afterLength = beforeLength;
      }
		}

		const align = JSON.parse(attributes.activeControl)

    return (
	<Fragment>
		<InspectorControls>
			<PanelBody
				title={ __("Columns", "vk-blocks") }
				initialOpen={ false }
					>
				<ColumnLayout { ...props } />
			</PanelBody>
			<PanelBody title={ __("Align", "vk-blocks") } initialOpen={ false }>
				<BaseControl label={ __("Title", "vk-blocks") }>
					<AlignControl { ...props } schema={ align } component={ "title" } initial={ align.title } />
				</BaseControl>
				<BaseControl label={ __("Text", "vk-blocks") }>
					<AlignControl { ...props } schema={ align } component={ "text" } initial={ align.text } />
				</BaseControl>
			</PanelBody>
		</InspectorControls>
		<PRCard
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
	<PRCard attributes={ attributes } className={ className } for_={ "save" } />
    );
  },
  deprecated
});
