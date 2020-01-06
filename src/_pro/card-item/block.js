/**
 * card-item block type
 *
 */
import { Component } from "./component";
import { schema } from "./schema";

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { Fragment } = wp.element;
const BlockIcon = "arrow-down";

registerBlockType("vk-blocks/card-item", {
  title: __("Card Item", "vk-blocks"),
  icon: BlockIcon,
  category: "vk-blocks-cat",
  attributes: schema,
  parent: ["vk-blocks/card"],

  edit(props) {
    return (
      <Fragment>
        <Component value={props} for_={"edit"} />
      </Fragment>
    );
  },

  save(props) {
    return <Component value={props} for_={"save"} />;
  }
});
