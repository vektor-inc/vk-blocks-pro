const { assign } = lodash;
const { __ } = wp.i18n;
const { Fragment } = wp.element;
const { addFilter } = wp.hooks;
const { PanelBody } = wp.components;
const { InspectorControls, ColorPalette } =
  wp.blockEditor && wp.blockEditor.BlockEdit ? wp.blockEditor : wp.editor;
const { createHigherOrderComponent } = wp.compose;

const { createHigherOrderComponent } = wp.compose;
const { Fragment } = wp.element;
const { InspectorControls } = wp.editor;
const { PanelBody } = wp.components;

import { AdvancedToggleControl } from "../../components/advanced-toggle-control";

const withInspectorControls = createHigherOrderComponent(BlockEdit => {
  return props => {
    return (
      <Fragment>
        <BlockEdit {...props} />
        <InspectorControls>
          <PanelBody>
            <AdvancedToggleControl initialFixedTable={} label={} {...props} />
          </PanelBody>
        </InspectorControls>
      </Fragment>
    );
  };
}, "withInspectorControl");

wp.hooks.addFilter("editor.BlockEdit", "vk-blocks/hidden-extension");
