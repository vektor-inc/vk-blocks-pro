const { __ } = wp.i18n;
const { Fragment } = wp.element;
const { addFilter } = wp.hooks;
const { PanelBody, BaseControl } = wp.components;
const { InspectorControls } =
  wp.blockEditor && wp.blockEditor.BlockEdit ? wp.blockEditor : wp.editor;
const { createHigherOrderComponent } = wp.compose;
import { AdvancedToggleControl } from "../../components/advanced-toggle-control";
import classnames from "classnames";

// Check the keyword including str or not
export const in_string = (str, keyword) => {
  // If keyword was included that return ( true or false )
  return str.indexOf(keyword) !== -1;
};

// The checking block is hidden function target or not
export const is_hidden = blockName => {
  // Target of hidden function active
  const allowed = ["core","vk-blocks"];
  // name には allowed の項目が一つずつ入る
  // 判断中のブロック名の中にname( core or vk-blocks )がある（ undefinedじゃない ）場合
  // true を返す
  let hiddenReturn = allowed.find(name => in_string(blockName, name)) !== undefined;

  const excludes = ["core/block"];
  const excludeBlock = excludes.find(excludeName => in_string(blockName, excludeName)) !== undefined; 
  if ( excludeBlock ){
	hiddenReturn = false;
  }

  return hiddenReturn;
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
          },
          vkb_hidden_xl: {
            type: "boolean",
            default: false
          },
          vkb_hidden_lg: {
            type: "boolean",
            default: false
          },
          vkb_hidden_md: {
            type: "boolean",
            default: false
          },
          vkb_hidden_sm: {
            type: "boolean",
            default: false
          },
          vkb_hidden_xs: {
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
				title={ __("Hidden Settings", "vk-blocks") }
				initialOpen={ false }
              >
				<BaseControl
					label={ __("Hidden at screel size", "vk-blocks") }
                >
					<p>{ __("Note : This function is display hidden only. Actually Block is output to HTML.Pleade don't use you must not bisible item.Don't use it for blocks you really don't want to display.", "vk-blocks") }</p>
					<AdvancedToggleControl
						label={ __("Hidden ( Screen size : all )", "vk-blocks") }
						initialFixedTable={ props.attributes.vkb_hidden }
						schema={ "vkb_hidden" }
						{ ...props }
                  />
					<AdvancedToggleControl
						label={ __("Hidden ( Screen size : xs )", "vk-blocks") }
						initialFixedTable={ props.attributes.vkb_hidden_xs }
						schema={ "vkb_hidden_xs" }
						{ ...props }
                  />
					<AdvancedToggleControl
						label={ __("Hidden ( Screen size : sm )", "vk-blocks") }
						initialFixedTable={ props.attributes.vkb_hidden_sm }
						schema={ "vkb_hidden_sm" }
						{ ...props }
                  />
					<AdvancedToggleControl
						label={ __("Hidden ( Screen size : md )", "vk-blocks") }
						initialFixedTable={ props.attributes.vkb_hidden_md }
						schema={ "vkb_hidden_md" }
						{ ...props }
                  />
					<AdvancedToggleControl
						label={ __("Hidden ( Screen size : lg )", "vk-blocks") }
						initialFixedTable={ props.attributes.vkb_hidden_lg }
						schema={ "vkb_hidden_lg" }
						{ ...props }
                  />
					<AdvancedToggleControl
						label={ __("Hidden ( Screen size : xl )", "vk-blocks") }
						initialFixedTable={ props.attributes.vkb_hidden_xl }
						schema={ "vkb_hidden_xl" }
						{ ...props }
                  />
					<p>{ __("If you want to hide multiple blocks, that first you set to group block and the next, hide for the that group block.", "vk-blocks") }</p>
				</BaseControl>
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
    const {
      vkb_hidden,
      vkb_hidden_xl,
      vkb_hidden_lg,
      vkb_hidden_md,
      vkb_hidden_sm,
      vkb_hidden_xs
    } = attributes;

    if (
      vkb_hidden ||
      vkb_hidden_xl ||
      vkb_hidden_lg ||
      vkb_hidden_md ||
      vkb_hidden_sm ||
      vkb_hidden_xs
    ) {
      const custom = vkb_hidden && "vk_hidden";
      const customXl = vkb_hidden_xl && "vk_hidden-xl";
      const customLg = vkb_hidden_lg && "vk_hidden-lg";
      const customMd = vkb_hidden_md && "vk_hidden-md";
      const customSm = vkb_hidden_sm && "vk_hidden-sm";
      const customXs = vkb_hidden_xs && "vk_hidden-xs";

      if (element && !element.props.for_) {
        element.props = {
          ...element.props,
          ...{
            className: classnames(
              element.props.className,
              custom,
              customXl,
              customLg,
              customMd,
              customSm,
              customXs
            )
          }
        };
      }
    }
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

		// Add hidden common class
		const hiddenSomething =
        props.attributes.vkb_hidden_xl ||
        props.attributes.vkb_hidden_lg ||
        props.attributes.vkb_hidden_md ||
        props.attributes.vkb_hidden_sm ||
        props.attributes.vkb_hidden_xs ||
        props.attributes.vkb_hidden
          ? "vk_edit_hidden_warning"
		  : "";

		// Add hidden all class
		const hiddenClassName =         props.attributes.vkb_hidden
		? hiddenSomething + " vk_edit_hidden_all"
		: hiddenSomething;
		  
      return <BlockListBlock { ...props } className={ hiddenClassName } />;
    };
  }, "addHiddenWarning")
);
