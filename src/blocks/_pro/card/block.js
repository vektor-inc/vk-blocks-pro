/**
 * card block type
 *
 */
import { Component } from "./component";
import { schema } from "./schema";
import { ColumnLayoutControl } from "../../../components/column-layout-control";
import { CardAlignControls } from "../../../components/card-align-control";
import { deprecated } from "./deprecated";
import { hiddenNewBlock } from "../../../utils/hiddenNewBlock"
import removeProperty from "../../../utils/removeProperty"
import { vkbBlockEditor } from "./../../../utils/depModules";
import AdvancedViewportControl from "../../../components/advanced-viewport-control"
import AdvancedUnitControl from "../../../components/advanced-unit-control"
import { title, content, pictureJson } from "../../../utils/example-data";
import { ReactComponent as Icon } from './icon.svg';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { useEffect } = wp.element;
const { PanelBody, BaseControl, TextControl, CheckboxControl } = wp.components;
const { addFilter } = wp.hooks;
const { InspectorControls } = vkbBlockEditor;
const { select, dispatch } = wp.data;
const { createHigherOrderComponent } = wp.compose;

const inserterVisible = hiddenNewBlock(5.3);
export const prefix =  "vk_card_"

registerBlockType("vk-blocks/card", {
	title: __("Card", "vk-blocks"),
	icon: <Icon />,
	category: "vk-blocks-cat",
	attributes: schema,
	supports: {
		className: true,
		inserter: inserterVisible
	},
	example: {
		attributes: {
			layout: 'card',
			col_xs: 1,
			col_sm: 1,
			col_md: 1,
			col_lg: 1,
			col_xl: 1,
			col_xxl: 1,
			display_title: true,
			display_excerpt: true,
			display_image: true,
			display_btn: true,
			btn_text: "Read more",
			activeControl: '{"title": "left", "text":"left", "button":"right"}',
		},
		innerBlocks: [
			{
				name: 'vk-blocks/card-item',
				attributes: {
					layout: 'card',
					col_xs: 1,
					col_sm: 1,
					col_md: 1,
					col_lg: 1,
					col_xl: 1,
					col_xxl: 1,
					display_title: true,
					display_excerpt: true,
					display_image: true,
					display_btn: true,
					btn_text: "Read more",
					activeControl: '{"title": "left", "text":"left", "button":"right"}',
					title: title,
					excerpt_text: content,
					image: pictureJson,
				},
			},
		],
	},
  edit(props) {
	const { attributes, setAttributes, className, clientId, name } = props;
	attributes.name = name;
	setAttributes({ clientId })

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
				const updateAttributes = removeProperty(attributes,"className")
				updateBlockAttributes(innerBlocks[i].clientId, updateAttributes);

            }
          }
        }
        afterLength = beforeLength;
      }
	}

    return (
	<>
		<InspectorControls>
			<ColumnLayoutControl { ...props } />
			<DisplayItemsControlForCards { ...props } />
			<PanelBody
				title={ __("Image Height", "vk-blocks") }
				initialOpen={ false }
			>
				<AdvancedUnitControl { ...props } />
				<BaseControl label={ __('Slide Height for each device.', 'vk-blocks') }>
					<AdvancedViewportControl { ...props } initial={ { iPc:150, iTablet:150, iMobile:150 } } />
				</BaseControl>
			</PanelBody>
			<CardAlignControls { ...props } />
		</InspectorControls>
		<Component
			attributes={ attributes }
			className={ className }
			setAttributes={ setAttributes }
			for_={ "edit" }
        />
	</>
    );
  },
  save({ attributes }) {
    return (<Component attributes={ attributes } for_={ "save" } />);
  },
  deprecated,
});

export const DisplayItemsControlForCards = (props) => {
  const { setAttributes, attributes } = props;
  const { display_title, display_excerpt, display_image, display_btn, btn_text } = attributes;
  return (
	<PanelBody title={ __("Display item", "vk-blocks") } initialOpen={ false }>
		<CheckboxControl
			label={ __("Title", "vk-blocks") }
			className={ "mb-1" }
			checked={ display_title }
			onChange={ (checked) => setAttributes({ display_title: checked }) }
			/>
		<p className="alert alert-danger">{ __("Warning! When you hidden this item, you will lose the content.", "vk-blocks") }</p>
		<CheckboxControl
			label={ __("Excerpt Text", "vk-blocks") }
			className={ "mb-1" }
			checked={ display_excerpt }
			onChange={ (checked) => setAttributes({ display_excerpt: checked }) }
      />
		<p className="alert alert-danger">{ __("Warning! When you hidden this item, you will lose the content.", "vk-blocks") }</p>
		<CheckboxControl
			label={ __("Image", "vk-blocks") }
			checked={ display_image }
			onChange={ (checked) => setAttributes({ display_image: checked }) }
      />
		<CheckboxControl
			label={ __("Button", "vk-blocks") }
			checked={ display_btn }
			onChange={ (checked) => setAttributes({ display_btn: checked }) }
      />
		<h4 className={ "postList_itemCard_button-option" }>
			{ __("Button option", "vk-blocks") }
		</h4>
		<p>
			{ __(
          "Click each card block to set the target url. You can find the url form at it's sidebar.",
          "vk-blocks"
        ) }
		</p>
		<TextControl
			label={ __("Button text", "vk-blocks") }
			value={ btn_text }
			onChange={ (value) => setAttributes({ btn_text: value }) }
      />
	</PanelBody>
  );
};

const generateInlineCss = (attributes) =>{
	let { clientId, mobile, tablet, pc, unit } = attributes

	//For recovering block.
	if( undefined === unit ){
		unit = "px"
	}
	if( undefined === mobile ){
		mobile = 150
	}
	if( undefined === tablet ){
		tablet = 150
	}
	if( undefined === pc ){
		pc = 150
	}

	const cardImgSelector = `.${prefix}${clientId} .vk_card_item .vk_post_imgOuter::before`
	return <style type='text/css'>{ `@media (max-width: 576px) {
		${cardImgSelector}{
			padding-top:${mobile}${unit}!important;
		}
	}
	@media (min-width: 577px) and (max-width: 768px) {
		${cardImgSelector}{
			padding-top:${tablet}${unit}!important;
		}
	}
	@media (min-width: 769px) {
		${cardImgSelector}{
			padding-top:${pc}${unit}!important;
		}
	}` }</style>
}

addFilter( 'editor.BlockEdit', "vk-blocks/card-addInlineEditorsCss", createHigherOrderComponent( ( BlockEdit ) => {

    return ( props ) => {

		const { attributes, setAttributes, clientId } = props
		const { unit, pc, tablet, mobile } = attributes

		if ("vk-blocks/card" === props.name && ( unit || pc || tablet || mobile )) {

			useEffect(()=>{
				setAttributes({clientId})
			},[])

			const cssTag = generateInlineCss(attributes)

			return (
				<>
					{ cssTag }
					<BlockEdit { ...props } />
				</>
			);
		}
			return <BlockEdit { ...props } />;

	};

}, "addInlineEditorsCss" ));

addFilter(
  "blocks.getSaveElement",
  "vk-blocks/card-addInlineFrontCss",
  (el, type, attributes) => {

	const { unit, pc, tablet, mobile } = attributes
	if ("vk-blocks/card" === type.name && ( unit || pc || tablet || mobile )) {
		const cssTag = generateInlineCss(attributes)
		return<div>
			{ cssTag }
			{ el }
		  </div>
	}
		return el

});
