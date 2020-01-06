/**
 * card-item block type
 *
 */
import { Component } from "./component";
import { schema } from "./schema";

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { PanelBody, BaseControl, TextControl } = wp.components;
const { InspectorControls } =
  wp.blockEditor && wp.blockEditor.BlockEdit ? wp.blockEditor : wp.editor;
const { Fragment } = wp.element;
const BlockIcon = "arrow-down";

registerBlockType("vk-blocks/card-item", {
  title: __("Card Item", "vk-blocks"),
  icon: BlockIcon,
  category: "vk-blocks-cat",
  attributes: schema,
  parent: ["vk-blocks/card"],

  edit(props) {
    const { setAttributes, attributes } = props;
    const { url } = attributes;
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
