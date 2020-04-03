const { __ } = wp.i18n;
const { Fragment } = wp.element;
const { addFilter } = wp.hooks;
const { PanelBody } = wp.components;
const { InspectorControls } =
  wp.blockEditor && wp.blockEditor.BlockEdit ? wp.blockEditor : wp.editor;
const { createHigherOrderComponent } = wp.compose;
import { AdvancedToggleControl } from "../../components/advanced-toggle-control";

export const in_string = (str, keyword) => {
  return str.indexOf(keyword) !== -1;
};

export const is_hidden = blockName => {
  const allowed = ["core", "vk-blocks"];
  return allowed.find(name => in_string(blockName, name)) !== undefined;
};

addFilter(
  "blocks.registerBlockType",
  "vk-blocks/hidden-extension",
  settings => {
    if (is_hidden(settings.name)) {
      settings.attributes = {
        ...settings.attributes,
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
        return <BlockEdit { ...props } />;
      
    };
  }, "addHiddenSection")
);

wp.hooks.addFilter(
  "blocks.getSaveElement",
  "vk-blocks/hidden-extension",
  (element, blockType, attributes) => {
    attributes.vkb_hidden &&
      lodash.assign(element.props.style, { display: "none", speak: "none" });
    return element;
  }
);

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
