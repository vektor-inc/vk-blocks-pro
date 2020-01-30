/**
 * card-item block type
 *
 */
import { Component } from "./component";
import { schema } from "./schema";

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { PanelBody, BaseControl, TextControl, ToggleControl } = wp.components;
const { InspectorControls } =
  wp.blockEditor && wp.blockEditor.BlockEdit ? wp.blockEditor : wp.editor;
const { Fragment, useCallback } = wp.element;
const BlockIcon = "arrow-down";

registerBlockType("vk-blocks/card-item", {
  title: __("Card Item", "vk-blocks"),
  icon: BlockIcon,
  category: "vk-blocks-cat",
  attributes: schema,
  parent: ["vk-blocks/card"],

  edit(props) {
    const { setAttributes, attributes } = props;
    const { url, linkTarget, rel } = attributes;
    const NEW_TAB_REL = "noreferrer noopener";

    const onSetLinkRel = useCallback(
      value => {
        setAttributes({ rel: value });
      },
      [setAttributes]
    );

    return (
      <Fragment>
        <InspectorControls>
          <PanelBody title={__("URL", "vk-blocks")}>
            <BaseControl id="sidebar-card-block-url">
              <TextControl
                value={url}
                onChange={value => setAttributes({ url: value })}
                placeholder={__("https://www.vektor-inc.co.jp/", "vk-blocks")}
              />
            </BaseControl>
            <BaseControl
              label={__("Link settings", "vk-blocks")}
              id="sidebar-card-block-url-settings"
            >
              <TextControl
                label={__("Link rel")}
                value={rel || ""}
                onChange={onSetLinkRel}
              />
            </BaseControl>
          </PanelBody>
        </InspectorControls>
        <Component value={props} for_={"edit"} />
      </Fragment>
    );
  },

  save(props) {
    return <Component value={props} for_={"save"} />;
  }
});

function ButtonEdit({ attributes, setAttributes, className, isSelected }) {
  const { linkTarget, rel } = attributes;
  const onSetLinkRel = useCallback(
    value => {
      setAttributes({ rel: value });
    },
    [setAttributes]
  );

  const onToggleOpenInNewTab = useCallback(
    value => {
      const newLinkTarget = value ? "_blank" : undefined;

      let updatedRel = rel;
      if (newLinkTarget && !rel) {
        updatedRel = NEW_TAB_REL;
      } else if (!newLinkTarget && rel === NEW_TAB_REL) {
        updatedRel = undefined;
      }

      setAttributes({
        linkTarget: newLinkTarget,
        rel: updatedRel
      });
    },
    [rel, setAttributes]
  );

  return (
    <InspectorControls>
      <PanelBody title={__("Link settings")}>
        <ToggleControl
          label={__("Open in new tab")}
          onChange={onToggleOpenInNewTab}
          checked={linkTarget === "_blank"}
        />
        <TextControl
          label={__("Link rel")}
          value={rel || ""}
          onChange={onSetLinkRel}
        />
      </PanelBody>
    </InspectorControls>
  );
}
