const { __ } = wp.i18n;
const { Fragment } = wp.element;
const { addFilter } = wp.hooks;
const { PanelBody } = wp.components;
const { InspectorControls } =
  wp.blockEditor && wp.blockEditor.BlockEdit ? wp.blockEditor : wp.editor;
const { createHigherOrderComponent } = wp.compose;

import { AdvancedToggleControl } from "../../components/advanced-toggle-control";

const withInspectorControls = createHigherOrderComponent(BlockEdit => {
  return props => {
    return (
      <Fragment>
        <BlockEdit {...props} />
        <InspectorControls>
          <PanelBody
            title={__("Display Settings", "vk-blocks")}
            initialOpen={false}
          >
            <AdvancedToggleControl
              initialFixedTable={props.attributes.vkb_hidden}
              helpYes={__("Visible", "vk-blocks")}
              helpNo={__("Hidden", "vk-blocks")}
              schema={"vkb_hidden"}
              {...props}
            />
          </PanelBody>
        </InspectorControls>
      </Fragment>
    );
  };
}, "withInspectorControl");

wp.hooks.addFilter(
  "editor.BlockEdit",
  "vk-blocks/hidden-extension",
  withInspectorControls
);

addFilter(
  "blocks.registerBlockType",
  "vk-blocks/hidden-extension",
  settings => {
    settings.attributes = {
      ...settings.attributes,
      ...{
        vkb_hidden: {
          type: "boolean",
          default: false
        }
      }
    };
    return settings;
  }
);

// function addBackgroundColorStyle(props) {
//   console.log("blocks.getSaveContent.extraProps");
//   console.log(props);
//   return lodash.assign(props, { hidden: props.hidden });
// }

// wp.hooks.addFilter(
//   "blocks.getSaveContent.extraProps",
//   "vk-blocks/hidden-extension",
//   addBackgroundColorStyle
// );
