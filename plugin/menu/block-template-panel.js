import { Fragment } from "react";

// import ScreenshotImg from "./screenshot-img";

const { first, last } = window.lodash;

const { parse } = wp.blocks;

const { Button, Spinner, BlockPreview } = wp.components;

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
  // const [parts, setParts] = useState(null);
  // const [resultParts, setResultParts] = useState(null);

  // const setupParts = () => {
  //   if (parts) {
  //     return;
  //   }

  //   vkbFetchReuseableBlocks().then(result => {
  //     console.log(result);
  //     const filterd = result.filter(value => {
  //       return value.custom_fields.is_registerd_vkb_template[0] === "1";
  //     });
  //     console.log(filterd);
  //     setParts(filterd);
  //   });
  // };

  // const advancedInsertBlock = insertedBlocks => {
  //   if (insertedBlocks.length) {
  //     const selectedBlock = getSelectedBlock();
  //     if (null === selectedBlock) {
  //       const lastRootBlock = last(getBlocks());
  //       const isEmpty =
  //         undefined !== lastRootBlock &&
  //         null === lastRootBlock.rootClientId &&
  //         (!getBlockCount(lastRootBlock.clientId) ||
  //           ("core/paragraph" === lastRootBlock.name &&
  //             "" === lastRootBlock.attributes.content));
  //       if (isEmpty) {
  //         replaceBlocks(lastRootBlock.clientId, insertedBlocks);
  //       } else {
  //         insertBlocks(insertedBlocks);
  //       }
  //     } else {
  //       const isEmpty =
  //         "core/paragraph" === selectedBlock.name &&
  //         "" === selectedBlock.attributes.content;
  //       if (!isEmpty) {
  //         const insertionPoint = getBlockInsertionPoint();
  //         insertBlocks(
  //           insertedBlocks,
  //           insertionPoint.index,
  //           insertionPoint.rootClientId
  //         );
  //       } else {
  //         replaceBlocks(selectedBlock.clientId, insertedBlocks);
  //       }
  //     }
  //     multiSelect(
  //       first(insertedBlocks).clientId,
  //       last(insertedBlocks).clientId
  //     );
  //   }
  // };

  // const setupResultParts = () => {
  //   if (resultParts) {
  //     return;
  //   }

  //   setupParts();
  //   if (!parts) {
  //     return;
  //   }

  //   const newResultParts = parts.map(part => {
  //     // const parsedBlock = parse(part.content.raw);
  //     const parsedBlock = parse(`<!-- wp:paragraph -->
  //       <p><a href="tel:5555551234">(555) 555 1234</a></p>
  //       <!-- /wp:paragraph -->`);
  //     console.log(parsedBlock);
  //     return (
  //       <li>
  //         <Button
  //           className="vkb-menu__template-part__button"
  //           // onClick={advancedInsertBlock(parsedBlock)}
  //         >
  //           {/* <BlockPreview blocks={parsedBlock} /> */}
  //           {/* <ScreenshotImg
  //             className="vkb-menu__template-part__button__screenshot"
  //             src={part.screenshot}
  //             loader={
  //               <div className="vkb-menu__template-part__button__screenshot__loading">
  //                 <Spinner />
  //               </div>
  //             }
  //           /> */}
  //           <span className="vkb-menu__template-part__button__title">
  //             {part.title.raw}
  //           </span>
  //         </Button>
  //       </li>
  //     );
  //   });
  //   setResultParts(newResultParts.filter(resultPart => resultPart));
  // };

  // setupResultParts();

  // if (resultParts) {
  //   return <ul>{resultParts}</ul>;
  // }

  const parsedBlock = parse(`<!-- wp:paragraph -->
        <p><a href="tel:5555551234">(555) 555 1234</a></p>
        <!-- /wp:paragraph -->`);
  return (
    <BlockPreview blocks={parsedBlock} />
    // <div className="vkb_menu__template-part__loading">
    //   <Spinner />
    // </div>
  );
};
