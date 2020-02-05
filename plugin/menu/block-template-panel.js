"use strict";

// import ScreenshotImg from "./screenshot-img";

const { first, last } = window.lodash;

const { parse } = wp.blocks;

const { Button, Spinner } = wp.components;

const { useState } = wp.element;

const { dispatch, select } = wp.data;

export const vkbFetchReuseableBlocks = () => {
  return wp.apiFetch({ path: `/wp/v2/blocks?per_page=-1` });
};

export default function({ slug }) {
  const [parts, setParts] = useState(null);
  const [resultParts, setResultParts] = useState(null);

  const setupParts = () => {
    if (parts) {
      return;
    }

    vkbFetchReuseableBlocks().then(result => {
      console.log(result);
      const filterd = result.filter(value => {
        return value.custom_fields.is_registerd_vkb_template === "yes";
      });
      console.log(filterd);
      setParts(filterd);
    });
  };

  const setupResultParts = () => {
    if (resultParts) {
      return;
    }

    const { insertBlocks, replaceBlocks, multiSelect } = dispatch(
      "core/editor"
    );

    const {
      getBlocks,
      getBlockCount,
      getSelectedBlock,
      getBlockInsertionPoint
    } = select("core/block-editor");

    setupParts();
    if (!parts) {
      return;
    }

    const newResultParts = parts.map(part => {
      return (
        <li>
          <Button
            className="smb-menu__template-part__button"
            onClick={() => {
              const parsedBlocks = parse(part.content.raw);
              if (parsedBlocks.length) {
                const selectedBlock = getSelectedBlock();
                if (null === selectedBlock) {
                  // when not selected block
                  // get last root block
                  const lastRootBlock = last(getBlocks());
                  const isEmpty =
                    undefined !== lastRootBlock &&
                    null === lastRootBlock.rootClientId &&
                    (!getBlockCount(lastRootBlock.clientId) ||
                      ("core/paragraph" === lastRootBlock.name &&
                        "" === lastRootBlock.attributes.content));
                  if (isEmpty) {
                    // Replace when last block is empty
                    replaceBlocks(lastRootBlock.clientId, parsedBlocks);
                  } else {
                    // Insert at the end when block is not empty
                    insertBlocks(parsedBlocks);
                  }
                } else {
                  // when selected block
                  // isEmpty is true when blocktype is paragraph and content is empty
                  const isEmpty =
                    "core/paragraph" === selectedBlock.name &&
                    "" === selectedBlock.attributes.content;
                  if (!isEmpty) {
                    // Insert after block
                    const insertionPoint = getBlockInsertionPoint();
                    insertBlocks(
                      parsedBlocks,
                      insertionPoint.index,
                      insertionPoint.rootClientId
                    );
                  } else {
                    // Replace at the block when block is empty
                    replaceBlocks(selectedBlock.clientId, parsedBlocks);
                  }
                }
                multiSelect(
                  first(parsedBlocks).clientId,
                  last(parsedBlocks).clientId
                );
              }
            }}
          >
            {/* <ScreenshotImg
              className="smb-menu__template-part__button__screenshot"
              src={part.screenshot}
              loader={
                <div className="smb-menu__template-part__button__screenshot__loading">
                  <Spinner />
                </div>
              }
            /> */}
            <span className="smb-menu__template-part__button__title">
              {part.title.raw}
            </span>
          </Button>
        </li>
      );
    });

    setResultParts(newResultParts.filter(resultPart => resultPart));
  };

  setupResultParts();

  if (resultParts) {
    return <ul>{resultParts}</ul>;
  }

  return (
    <div className="smb-menu__template-part__loading">
      <Spinner />
    </div>
  );
}
