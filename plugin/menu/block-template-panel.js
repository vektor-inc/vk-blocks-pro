import { Fragment } from "react";

// import ScreenshotImg from "./screenshot-img";

const { first, last } = window.lodash;

const { parse } = wp.blocks;

const { Button, Spinner } = wp.components;

const { BlockPreview } = wp.blockEditor;

const { useState, useMemo } = wp.element;

const { dispatch, select } = wp.data;

const { insertBlocks, replaceBlocks, multiSelect } = dispatch("core/editor");

const {
  getBlocks,
  getBlockCount,
  getSelectedBlock,
  getBlockInsertionPoint
} = select("core/block-editor");

export const vkbFetchReuseableBlocks = () => {
  return wp.apiFetch({ path: `/wp/v2/blocks?per_page=-1` });
};

export default ({ slug }) => {
  const [parts, setParts] = useState(null);
  const [resultParts, setResultParts] = useState(null);

  const setupParts = () => {
    if (parts) {
      return;
    }

    vkbFetchReuseableBlocks().then(result => {
      console.log(result);
      const filterd = result.filter(value => {
        return value.custom_fields.is_registerd_vkb_template[0] === "1";
      });
      console.log(filterd);
      setParts(filterd);
    });
  };

  const setupResultParts = () => {
    if (resultParts) {
      return;
    }

    setupParts();
    if (!parts) {
      return;
    }

    const newResultParts = parts.map(part => {
      const parsedBlock = parse(part.content.raw);
      return (
        <li>
          <Button
            className="vkb-menu__template-part__button"
            onClick={() => {
              if (parsedBlock.length) {
                const selectedBlock = getSelectedBlock();
                if (null === selectedBlock) {
                  const lastRootBlock = last(getBlocks());
                  const isEmpty =
                    undefined !== lastRootBlock &&
                    null === lastRootBlock.rootClientId &&
                    (!getBlockCount(lastRootBlock.clientId) ||
                      ("core/paragraph" === lastRootBlock.name &&
                        "" === lastRootBlock.attributes.content));
                  if (isEmpty) {
                    replaceBlocks(lastRootBlock.clientId, parsedBlock);
                  } else {
                    insertBlocks(parsedBlock);
                  }
                } else {
                  const isEmpty =
                    "core/paragraph" === selectedBlock.name &&
                    "" === selectedBlock.attributes.content;
                  if (!isEmpty) {
                    const insertionPoint = getBlockInsertionPoint();
                    insertBlocks(
                      parsedBlock,
                      insertionPoint.index,
                      insertionPoint.rootClientId
                    );
                  } else {
                    replaceBlocks(selectedBlock.clientId, parsedBlock);
                  }
                }
                multiSelect(
                  first(parsedBlock).clientId,
                  last(parsedBlock).clientId
                );
              }
            }}
          >
            <section class="container">
              <div class="card">
                <div class="content">
                  {/* <img
                    class="logo"
                    src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/76882/logo.svg"
                    alt="mparticle"
                  /> */}
                  <h6>{part.title.raw}</h6>
                  <div class="hover_content">
                    <div class="inner">
                      <BlockPreview viewportWidth={300} blocks={parsedBlock} />
                    </div>
                    {/* <p>
                      mParticle’s customer data platform empowers you to
                      Integrate all of your data and orchestrate it across
                      channels, partners, and systems.
                    </p> */}
                  </div>
                </div>
              </div>
            </section>
            {/* <BlockPreview viewportWidth={300} blocks={parsedBlock} /> */}
            {/* <span className="vkb-menu__template-part__button__title">
              <BlockPreview viewportWidth={300} blocks={parsedBlock} />
              {part.title.raw}
            </span> */}
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
    <div className="vkb-menu__template-part__loading">
      <Spinner />
    </div>
  );
};
