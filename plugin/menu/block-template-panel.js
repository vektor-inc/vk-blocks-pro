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

  console.log(BlockPreview);

  const template0 = `<!-- wp:list {"className":"is-style-vk-arrow-mark"} -->
  <ul class="is-style-vk-arrow-mark"><li>test</li></ul>
  <!-- /wp:list -->`;

  const template1 = `
  <!-- wp:paragraph {"align":"left"} -->
  <p class="has-text-align-left">Let's talk 👋 Don't hesitate to reach out with the contact information below, or send a message using the form.</p>
  <!-- /wp:paragraph -->
  <!-- wp:heading {"align":"left"} -->
  <h2 class="has-text-align-left">Get in Touch</h2>
  <!-- /wp:heading -->
  <!-- wp:paragraph -->
  <p>10 Street Road</p>
  <!-- /wp:paragraph -->
  <!-- wp:paragraph -->
  <p>City,  10100</p>
  <!-- /wp:paragraph -->
  <!-- wp:paragraph -->
  <p>USA</p>
  <!-- /wp:paragraph -->
  <!-- wp:paragraph -->
  <p><a href="mailto:mail@example.com">mail@example.com</a></p>
  <!-- /wp:paragraph -->
  <!-- wp:paragraph -->
  <p><a href="tel:5555551234">(555) 555 1234</a></p>
  <!-- /wp:paragraph -->
`;

  const parsedBlock = parse(template1);
  // const getBlock = parsedBlock[0];

  // delete getBlock["validationIssues"];
  // delete getBlock["originalContent"];

  // console.log(getBlock);

  // let test = <BlockPreview viewportWidth={500} blocks={getBlock} />;
  // console.log(test);

  return (
    <div>
      <BlockPreview viewportWidth={300} blocks={parsedBlock} />
    </div>
  );
};
