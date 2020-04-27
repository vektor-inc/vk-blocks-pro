const { first, last } = window.lodash;

const { Spinner } = wp.components;

const { BlockPreview } = wp.blockEditor;

const { useState } = wp.element;

const { dispatch, select } = wp.data;

const { insertBlocks, replaceBlocks, multiSelect } = dispatch("core/editor");

const { __ } = wp.i18n;

const {
  getBlocks,
  getBlockCount,
  getSelectedBlock,
  getBlockInsertionPoint,
} = select("core/block-editor");

import parsedTemplates from "./default-templates";

export default ({ slug }) => {
  const [parts, setParts] = useState(null);
  const [resultParts, setResultParts] = useState(null);

  const setupParts = () => {
    if (parts) {
      return;
    }
    setParts(parsedTemplates);
  };

  const setupResultParts = () => {
    if (resultParts) {
      return;
    }

    setupParts();
    if (!parts) {
      return;
    }

    const newResultParts = parts.map((part, index) => {
      return (
	<li key={ index }>
		<div
			className="vkb-menu__template-part__button"
			onClick={ () => {
              if (part.blocks.length) {
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
                    replaceBlocks(lastRootBlock.clientId, part.blocks);
                  } else {
                    insertBlocks(part.blocks);
                  }
                } else {
                  const isEmpty =
                    "core/paragraph" === selectedBlock.name &&
                    "" === selectedBlock.attributes.content;
                  if (!isEmpty) {
                    const insertionPoint = getBlockInsertionPoint();
                    insertBlocks(part.blocks, insertionPoint.index);
                  } else {
                    replaceBlocks(selectedBlock.clientId, part.blocks);
                  }
                }
                multiSelect(
                  first(part.blocks).clientId,
                  last(part.blocks).clientId
                );
              }
            } }
          >
			<section className="vkb-menu__template-part__card__container">
				<div
					id={ `vkb-menu__template-part__card${index}` }
					className="card vkb-menu__template-part__card"
              >
					<div className="content">
						<h6>
							<span className={ "vkb-menu__template-part__header__icon" }>
								{ part.icon }
							</span>
							{ part.name }
						</h6>
						<div className="hover_content">
							<div className="inner edit-post-visual-editor editor-styles-wrapper">
								<BlockPreview viewportWidth={ 601 } blocks={ part.blocks } />
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	</li>
      );
    });
    setResultParts(newResultParts.filter((resultPart) => resultPart));
  };

  setupResultParts();

  if (resultParts) {
    return <ul className="vkb-menu__template-part">{ resultParts }</ul>;
  }
  return (
	<div className="vkb-menu__template-part__loading">
		<Spinner />
	</div>
  );
};
