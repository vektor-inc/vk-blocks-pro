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
            <BlockEdit {...props} />
            <InspectorControls>
              <PanelBody
                title={__("Display Settings", "vk-blocks")}
                initialOpen={false}
              >
                <BaseControl label={__("Hidden at All", "vk-blocks")}>
                  <AdvancedToggleControl
                    initialFixedTable={props.attributes.vkb_hidden}
                    schema={"vkb_hidden"}
                    {...props}
                  />
                </BaseControl>
                <BaseControl
                  label={__("Hidden at Selected Viewport", "vk-blocks")}
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
                </BaseControl>
              </PanelBody>
            </InspectorControls>
          </Fragment>
        );
      }
      // IF not hidden function target block that return original BlockEdit
      return <BlockEdit {...props} />;
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
      let custom = vkb_hidden && "d-none";
      let customXl = vkb_hidden_xl && "d-xl-none";
      let customLg = vkb_hidden_lg && "d-lg-none d-xl-block";
      let customMd = vkb_hidden_md && "d-md-none d-lg-block";
      let customSm = vkb_hidden_sm && "d-sm-none d-md-block";
      let customXs = vkb_hidden_xs && "d-none d-sm-block";

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
      const hiddenClass =
        props.attributes.vkb_hidden_xl ||
        props.attributes.vkb_hidden_lg ||
        props.attributes.vkb_hidden_md ||
        props.attributes.vkb_hidden_sm ||
        props.attributes.vkb_hidden_xs ||
        props.attributes.vkb_hidden
          ? "vkb_hidden_warning"
          : "";
      return <BlockListBlock {...props} className={hiddenClass} />;
    };
  }, "addHiddenWarning")
);
