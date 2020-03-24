const { __ } = wp.i18n;
const { Fragment } = wp.element;
const { addFilter } = wp.hooks;
const { PanelBody } = wp.components;
const { InspectorControls } =
  wp.blockEditor && wp.blockEditor.BlockEdit ? wp.blockEditor : wp.editor;
const { createHigherOrderComponent } = wp.compose;
import classnames from "classnames";
import { AdvancedToggleControl } from "../../components/advanced-toggle-control";

addFilter(
  "blocks.registerBlockType",
  "vk-blocks/hidden-extension-viewport",
  settings => {
    settings.attributes = {
      ...settings.attributes,
      ...{
        vkb_hidden_viewport: {
          type: "boolean",
          default: false
        }
      }
    };
    return settings;
  }
);

wp.hooks.addFilter(
  "editor.BlockEdit",
  "vk-blocks/hidden-extension-viewport",
  createHigherOrderComponent(BlockEdit => {
    return props => {
      return (
        <Fragment>
          <BlockEdit {...props} />
          <InspectorControls>
            <PanelBody
              title={__("Display Settings by View port", "vk-blocks")}
              initialOpen={false}
            >
              <AdvancedToggleControl
                label={__("Hidden at XL", "vk-blocks")}
                initialFixedTable={props.attributes.vkb_hidden_viewport}
                schema={"vkb_hidden_viewport"}
                {...props}
              />
            </PanelBody>
          </InspectorControls>
        </Fragment>
      );
    };
  }, "addHiddenSection")
);

wp.hooks.addFilter(
  "blocks.getSaveElement",
  "vk-blocks/hidden-extension-viewport",
  (element, blockType, attributes) => {
    if (attributes.vkb_hidden_viewport) {
      element.props.className = classnames(element.props.className, "hey");
    }
    return element;
  }
);

wp.hooks.addFilter(
  "editor.BlockListBlock",
  "vk-blocks/hidden-extension-viewport",
  createHigherOrderComponent(BlockListBlock => {
    return props => {
      let hiddenClass = props.attributes.vkb_hidden_viewport
        ? "vkb_hidden_warning"
        : "";
      return <BlockListBlock {...props} className={hiddenClass} />;
    };
  }, "addHiddenWarning")
);
