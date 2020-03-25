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
                initialFixedTable={props.attributes.vkb_hidden_xl}
                schema={"vkb_hidden_xl"}
                {...props}
              />
              <AdvancedToggleControl
                label={__("Hidden at LG", "vk-blocks")}
                initialFixedTable={props.attributes.vkb_hidden_lg}
                schema={"vkb_hidden_lg"}
                {...props}
              />
              <AdvancedToggleControl
                label={__("Hidden at MD", "vk-blocks")}
                initialFixedTable={props.attributes.vkb_hidden_md}
                schema={"vkb_hidden_md"}
                {...props}
              />
              <AdvancedToggleControl
                label={__("Hidden at SM", "vk-blocks")}
                initialFixedTable={props.attributes.vkb_hidden_sm}
                schema={"vkb_hidden_sm"}
                {...props}
              />
              <AdvancedToggleControl
                label={__("Hidden at XS", "vk-blocks")}
                initialFixedTable={props.attributes.vkb_hidden_xs}
                schema={"vkb_hidden_xs"}
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
    let customXl = attributes.vkb_hidden_xl && "vkb-hidden-xl";
    let customLg = attributes.vkb_hidden_lg && "vkb-hidden-lg";
    let customMd = attributes.vkb_hidden_md && "vkb-hidden-md";
    let customSm = attributes.vkb_hidden_sm && "vkb-hidden-sm";
    let customXs = attributes.vkb_hidden_xs && "vkb-hidden-xs";
    element.props.className = classnames(
      element.props.className,
      customXl,
      customLg,
      customMd,
      customSm,
      customXs
    );
    return element;
  }
);
