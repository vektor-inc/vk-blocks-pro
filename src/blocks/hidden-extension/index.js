const { __ } = wp.i18n;
const { Fragment } = wp.element;
const { addFilter } = wp.hooks;
const { PanelBody } = wp.components;
const { InspectorControls } =
  wp.blockEditor && wp.blockEditor.BlockEdit ? wp.blockEditor : wp.editor;
const { createHigherOrderComponent } = wp.compose;
import { AdvancedToggleControl } from "../../components/advanced-toggle-control";

// Check the keyword including str or not
export const in_string = (str, keyword) => {
	// If keyword was included that return ( true or false )
  	return str.indexOf(keyword) !== -1;
};

// The checking block is hidden function target or not
export const is_hidden = blockName => {

	// Target of hidden function active
	const allowed = ["core", "vk-blocks"];
	  
	// name には allowed の項目が一つずつ入る
	// 判断中のブロック名の中にname( core or vk-blocks )がある（ undefinedじゃない ）場合
	// true を返す
	return allowed.find(name => in_string(blockName, name)) !== undefined;
};


/* Filter of blocks.registerBlockType
/*-----------------------------------*/
addFilter(
  "blocks.registerBlockType",
  "vk-blocks/hidden-extension",
  settings => {
	// If hidden function target block...
    if (is_hidden(settings.name)) {

      settings.attributes = {
		// Deploy original settings.attributes to array and...
		...settings.attributes,
		// Add hidden attributes
        ...{
          vkb_hidden: {
            type: "boolean",
            default: false
          }
        }
      };
    }
    return settings;
  }
);

/* Filter of editor.BlockEdit
/*-----------------------------------*/
wp.hooks.addFilter(
  "editor.BlockEdit",
  "vk-blocks/hidden-extension",
  createHigherOrderComponent(BlockEdit => {
    return props => {
      if (is_hidden(props.name)) {
        return (
	<Fragment>
		<BlockEdit { ...props } />
		<InspectorControls>
			<PanelBody
				title={ __("Display Settings", "vk-blocks") }
				initialOpen={ false }
              >
				<AdvancedToggleControl
					initialFixedTable={ props.attributes.vkb_hidden }
					helpYes={ __("Hidden", "vk-blocks") }
					helpNo={ __("Visible", "vk-blocks") }
					schema={ "vkb_hidden" }
					{ ...props }
                />
			</PanelBody>
		</InspectorControls>
	</Fragment>
        );
	  }
		// IF not hidden function target block that return original BlockEdit
		return <BlockEdit { ...props } />;
      
    };
  }, "addHiddenSection")
);

/* Filter of blocks.getSaveElement
/*-----------------------------------*/
wp.hooks.addFilter(
  "blocks.getSaveElement",
  "vk-blocks/hidden-extension",
  (element, blockType, attributes) => {
	// If attributes.vkb_hidden is true
	attributes.vkb_hidden &&
		// Overwrite the fists object(element.props.style) property by second object property
		lodash.assign(element.props.style, { display: "none", speak: "none" });
    return element;
  }
);

/* Filter of editor.BlockListBlock
/*-----------------------------------*/
wp.hooks.addFilter(
  "editor.BlockListBlock",
  "vk-blocks/hidden-extension",
  createHigherOrderComponent(BlockListBlock => {
    return props => {
      const hiddenClass =
        props.attributes.vkb_hidden_xl ||
        props.attributes.vkb_hidden_lg ||
        props.attributes.vkb_hidden_md ||
        props.attributes.vkb_hidden_sm ||
        props.attributes.vkb_hidden_xs ||
        props.attributes.vkb_hidden
          ? "vkb_hidden_warning"
          : "";
      return <BlockListBlock { ...props } className={ hiddenClass } />;
    };
  }, "addHiddenWarning")
);
