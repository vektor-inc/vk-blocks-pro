/**
 * card block type
 *
 */
import { Component } from "./component";
import { schema } from "./schema";
import { ColumnLayoutControl } from "../../../components/column-layout-control";
import { CardAlignControls } from "../../../components/card-align-control";
import { deprecated } from "./deprecated";
import { hiddenNewBlock } from "../../_helper/hiddenNewBlock"
import removeProperty from "../../_helper/removeProperty"
import { vkbBlockEditor } from "./../../_helper/depModules";
import AdvancedViewportControl from "../../../components/advanced-viewport-control"
import AdvancedUnitControl from "../../../components/advanced-unit-control"

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { Fragment } = wp.element;
const { PanelBody, BaseControl, TextControl, CheckboxControl } = wp.components;
const { addFilter } = wp.hooks;
const { InspectorControls } = vkbBlockEditor;
const { select, dispatch } = wp.data;
const { createHigherOrderComponent } = wp.compose;

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
const inserterVisible = hiddenNewBlock(5.3);
export const prefix =  "vk_card_"

registerBlockType("vk-blocks/card", {
  title: __("Card", "vk-blocks"),
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
				const updateAttributes = removeProperty(attributes,"className")
				updateBlockAttributes(innerBlocks[i].clientId, updateAttributes);

            }
          }
        }
        afterLength = beforeLength;
      }
    }
    return (
	<Fragment>
		<InspectorControls>
			<ColumnLayoutControl { ...props } />
			<DisplayItemsControlForCards { ...props } />
			<PanelBody
			title={__("Height", "vk-blocks")}
			initialOpen={false}
			>
				<AdvancedUnitControl {...props} />
				<BaseControl label={__('Slide Height for each device.', 'vk-blocks')}>
					<AdvancedViewportControl {...props} />
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
	</Fragment>
    );
  },
  save({ attributes, className }) {
    return (
	<Component attributes={ attributes } className={ className } for_={ "save" } />
    );
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

	if( undefined === unit ){
		unit = "px"
	}
	let defaultValue = 150
	if( undefined === mobile ){
		mobile = defaultValue
	}
	if( undefined === tablet ){
		tablet = defaultValue
	}
	if( undefined === pc ){
		pc = defaultValue
	}


	const cardImgSelector = `.${prefix}${clientId} .vk_card_item .vk_post_imgOuter::before`
	return <style type='text/css'>{`@media (max-width: 576px) {
		${cardImgSelector}{
			height:${mobile}${unit}!important;
		}
	}
	@media (min-width: 577px) and (max-width: 768px) {
		${cardImgSelector}{
			height:${tablet}${unit}!important;
		}
	}
	@media (min-width: 769px) {
		${cardImgSelector}{
			height:${pc}${unit}!important;
		}
	}`}</style>
}

const addInlineEditorCss =  createHigherOrderComponent( ( BlockEdit ) => {
    return ( props ) => {

		const { attributes, setAttributes, clientId } = props
		const { unit, pc, tablet, mobile } = attributes

		if ("vk-blocks/card" === props.name && ( unit || pc || tablet || mobile )) {

			setAttributes({clientId:clientId})

			const cssTag = generateInlineCss(attributes)
			return (
				<Fragment>
					{cssTag}
					<BlockEdit { ...props } />
				</Fragment>
			);
		}else{
			return <BlockEdit { ...props } />;
		}
    };
}, "addInlineEditorCss" );
addFilter( 'editor.BlockEdit', "vk-blocks/card", addInlineEditorCss );

const addInlineFrontCss = (el, type, attributes) => {

	const { unit, pc, tablet, mobile } = attributes
	if ("vk-blocks/card" === type.name && ( unit || pc || tablet || mobile )) {
		const cssTag = generateInlineCss(attributes)
		return<div>
			{cssTag}
			{el}
		  </div>
	}else{
		return el
	}
}
addFilter(
  "blocks.getSaveElement",
  "vk-blocks/card",
  addInlineFrontCss
);
