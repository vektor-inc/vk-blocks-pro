const { __ } = wp.i18n;
const { Fragment } = wp.element;
const { addFilter } = wp.hooks;
const { PanelBody } = wp.components;
const { InspectorControls } =
  wp.blockEditor && wp.blockEditor.BlockEdit ? wp.blockEditor : wp.editor;
const { createHigherOrderComponent } = wp.compose;
import classnames from "classnames";
import { capitalize } from "../_helper/capitalize";
import { AdvancedToggleControl } from "../../components/advanced-toggle-control";

addFilter(
  "blocks.registerBlockType",
  "vk-blocks/hidden-extension-viewport",
  settings => {
    settings.attributes = {
      ...settings.attributes,
      ...{
        vkb_hidden_viewport: {
          type: "string",
          default: "{}"
        }
      }
    };
    return settings;
  }
);

const ViewportSidebars = props => {
  let vkb_hidden_viewport = JSON.parse(props.attributes.vkb_hidden_viewport);
  const viewports = ["xs", "sm", "md", "lg", "xl"];

  return viewports.map(viewport => {
    // let vkb_hidden_viewport_item =
    //   vkb_hidden_viewport[viewport] != undefined
    //     ? vkb_hidden_viewport[viewport]
    //     : false;

    return (
      <AdvancedToggleControl
        label={__(`Hidden at ${capitalize(viewport)}`, "vk-blocks")}
        schema={"vkb_hidden_viewport"}
        initialFixedTable={vkb_hidden_viewport}
        jsonKey={viewport}
        {...props}
      />
    );
  });
};

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
              <ViewportSidebars {...props} />
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
