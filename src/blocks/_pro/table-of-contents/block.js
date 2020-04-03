/**
 * table-of-contents block type
 */

import { schema } from "./schema";
import {
  isAllowedBlock,
  getBlocksByName,
  returnHtml,
  getAllHeadings,
  removeUnnecessaryElements
} from "./toc-utils";
import BlockIcon from "./icon.svg";

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const {
  ServerSideRender,
  PanelBody,
  SelectControl,
  BaseControl
} = wp.components;
const { Fragment } = wp.element;
const { InspectorControls } =
  wp.blockEditor && wp.blockEditor.BlockEdit ? wp.blockEditor : wp.editor;
const { addFilter } = wp.hooks;
const { createHigherOrderComponent } = wp.compose;
const { dispatch } = wp.data;

registerBlockType("vk-blocks/table-of-contents", {
  title: __("Table of Contents", "vk-blocks"),
  icon: <BlockIcon />,
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

  const headingList = ["core/heading", "vk-blocks/heading"];

  if (isAllowedBlock(name, allowedBlocks)) {
    const tocs = getBlocksByName("vk-blocks/table-of-contents");
    const tocClientId = tocs[0] ? tocs[0].clientId : "";
    const tocAttributes = tocs[0] ? tocs[0].attributes : "";

    const { updateBlockAttributes } = dispatch("core/editor");
    if (
      anchor === undefined &&
      isAllowedBlock(name, headingList) != undefined
    ) {
      updateBlockAttributes(clientId, {
        anchor: `vk-htags-${clientId}`
      });
    }

    let headingsRaw = getAllHeadings(headingList);
    let headings = removeUnnecessaryElements(headingsRaw);
    let render = returnHtml(headings, tocAttributes, className);

    if (isAllowedBlock(name, headingList) != undefined) {
      updateBlockAttributes(tocClientId, {
        renderHtml: render
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
