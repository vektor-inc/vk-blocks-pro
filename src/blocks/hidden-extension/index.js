const { __ } = wp.i18n;
const { Fragment } = wp.element;
const { addFilter } = wp.hooks;
const { PanelBody } = wp.components;
const { InspectorControls } =
  wp.blockEditor && wp.blockEditor.BlockEdit ? wp.blockEditor : wp.editor;
const { createHigherOrderComponent } = wp.compose;
import { AdvancedToggleControl } from "../../components/advanced-toggle-control";
import classnames from "classnames";

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

wp.hooks.addFilter(
  "editor.BlockEdit",
  "vk-blocks/hidden-extension",
  createHigherOrderComponent(BlockEdit => {
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
                helpYes={__("Hidden", "vk-blocks")}
                helpNo={__("Visible", "vk-blocks")}
                schema={"vkb_hidden"}
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
      let customXl = props.attributes.vkb_hidden_xl && "vkb-hidden-edit-xl";
      let customLg = props.attributes.vkb_hidden_lg && "vkb-hidden-edit-lg";
      let customMd = props.attributes.vkb_hidden_md && "vkb-hidden-edit-md";
      let customSm = props.attributes.vkb_hidden_sm && "vkb-hidden-edit-sm";
      let customXs = props.attributes.vkb_hidden_xs && "vkb-hidden-edit-xs";
      let hiddenBase;
      if (
        customXl ||
        customLg ||
        customMd ||
        customSm ||
        customXs ||
        props.attributes.vkb_hidden
      ) {
        hiddenBase = "vkb_hidden_warning";
      }
      return (
        <BlockListBlock
          {...props}
          className={classnames(
            hiddenBase,
            customXl,
            customLg,
            customMd,
            customSm,
            customXs
          )}
        />
      );
    };
  }, "addHiddenWarning")
);
