/**
 * table-of-contents block type
 *
 */

import { schema } from "./schema";
import {
  isAllowedBlock,
  getBlocksByName,
  getInnerBlocks,
  getBlockIndex,
  getHeadingsFromInnerBlocks,
  returnHtml
} from "./toc-utils";

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const {
  ServerSideRender,
  PanelBody,
  SelectControl,
  BaseControl
} = wp.components;
const { Fragment, useState } = wp.element;
const { InspectorControls } =
  wp.blockEditor && wp.blockEditor.BlockEdit ? wp.blockEditor : wp.editor;
const { addFilter } = wp.hooks;
const { createHigherOrderComponent } = wp.compose;
const { useDispatch } = wp.data;

const BlockIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="576"
    height="512"
    viewBox="0 0 576 512"
  >
    <g>
      <g>
        <path
          d="M199.4,402.1l266.4,0c7.1,0,12.8-5.9,12.8-12.8l0-25.6c0-7.1-5.9-12.8-12.8-12.8l-266.4,0c-7.1,0-12.8,5.9-12.8,12.8
				l0,25.6C186.6,396.3,192.5,402.1,199.4,402.1z"
        />
        <path
          d="M199.4,323l266.4,0c7.1,0,12.8-5.9,12.8-12.8v-25.6c0-7.1-5.9-12.8-12.8-12.8l-266.4,0c-7.1,0-12.8,5.9-12.8,12.8l0,25.6
				C186.6,317.3,192.5,323,199.4,323z"
        />
        <path
          d="M199.4,243.8l266.4,0c7.1,0,12.8-5.9,12.8-12.8v-25.6c0-7.1-5.9-12.8-12.8-12.8l-266.4,0c-7.1,0-12.8,5.9-12.8,12.8
				l0,25.6C186.6,238.1,192.5,243.8,199.4,243.8z"
        />
        <path
          d="M110.2,402.1l30.8,0c7.1,0,12.8-5.9,12.8-12.8l0-25.6c0-7.1-5.9-12.8-12.8-12.8h-30.8c-7.1,0-12.8,5.9-12.8,12.8l0,25.6
				C97.4,396.3,103.3,402.1,110.2,402.1z"
        />
        <path
          d="M110.2,323h30.8c7.1,0,12.8-5.9,12.8-12.8v-25.6c0-7.1-5.9-12.8-12.8-12.8h-30.8c-7.1,0-12.8,5.9-12.8,12.8l0,25.6
				C97.4,317.3,103.3,323,110.2,323z"
        />
        <path
          d="M110.2,243.8l30.8,0c7.1,0,12.8-5.9,12.8-12.8l0-25.6c0-7.1-5.9-12.8-12.8-12.8l-30.8,0c-7.1,0-12.8,5.9-12.8,12.8l0,25.6
				C97.4,238.1,103.3,243.8,110.2,243.8z"
        />
      </g>
      <path
        d="M159.7,158.5l256.7,0c5.3,0,9.9-4.6,9.9-9.9l0-28.8c0-5.3-4.6-9.9-9.9-9.9l-256.7,0c-5.3,0-9.9,4.6-9.9,9.9l0,28.8
			C149.8,154.2,154.3,158.5,159.7,158.5z"
      />
    </g>
    <path
      d="M528,32H48C21.5,32,0,53.5,0,80v352c0,26.5,21.5,48,48,48h480c26.5,0,48-21.5,48-48V80C576,53.5,554.5,32,528,32z M528,432
		H48V80h480V432z"
    />
  </svg>
);

registerBlockType("vk-blocks/table-of-contents", {
  title: __("Table of Contents", "vk-blocks"),
  icon: BlockIcon,
  category: "vk-blocks-cat",
  attributes: schema,

  edit({ attributes, setAttributes }) {
    const { style, open } = attributes;
    return (
      <Fragment>
        <InspectorControls>
          <PanelBody>
            <BaseControl label={__("Style", "vk-blocks")}>
              <SelectControl
                value={style}
                onChange={value => setAttributes({ style: value })}
                options={[
                  {
                    value: "default",
                    label: __("Default", "vk-blocks")
                  },
                  {
                    value: "",
                    label: __("No frame", "vk-blocks")
                  }
                ]}
              />
            </BaseControl>
            <BaseControl label={__("Default Display Status", "vk-blocks")}>
              <SelectControl
                value={open}
                onChange={value => setAttributes({ open: value })}
                options={[
                  {
                    value: "open",
                    label: __("OPEN", "vk-blocks")
                  },
                  {
                    value: "close",
                    label: __("CLOSE", "vk-blocks")
                  }
                ]}
              />
            </BaseControl>
          </PanelBody>
        </InspectorControls>
        <ServerSideRender
          block="vk-blocks/table-of-contents"
          attributes={attributes}
        />
      </Fragment>
    );
  },

  save() {
    return null;
  }
});

const getHeadings = props => {
  const { className, name, clientId, attributes } = props;
  const { anchor } = attributes;
  const allowedBlocks = [
    "vk-blocks/heading",
    "vk-blocks/outer",
    "core/heading",
    "core/cover",
    "core/group"
  ];

  const headingBlocks = ["vk-blocks/heading", "core/heading"];

  if (isAllowedBlock(name, allowedBlocks)) {
    const tocs = getBlocksByName("vk-blocks/table-of-contents");
    const tocClientId = tocs[0] ? tocs[0].clientId : "";
    const tocAttributes = tocs[0] ? tocs[0].attributes : "";
    const blockIndex = getBlockIndex(clientId);
    let innerBlocks = getInnerBlocks(allowedBlocks);

    let headings = getHeadingsFromInnerBlocks(innerBlocks, headingBlocks);

    let render = returnHtml(headings, tocAttributes, className);

    const { updateBlockAttributes } = useDispatch("core/editor");
    updateBlockAttributes(tocClientId, {
      renderHtml: render
    });

    if (anchor === undefined) {
      updateBlockAttributes(clientId, {
        anchor: `vk-htags-${blockIndex}`
      });
    }
  }
};

const updateTableOfContents = createHigherOrderComponent(BlockListBlock => {
  return props => {
    getHeadings(props);
    return <BlockListBlock {...props} />;
  };
}, "updateTableOfContents");

addFilter(
  "editor.BlockListBlock",
  "vk-blocks/table-of-contents",
  updateTableOfContents
);
