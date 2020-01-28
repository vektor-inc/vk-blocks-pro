const { TabPanel, Panel, PanelBody, PanelRow, BaseControl } = wp.components;

const { Fragment } = wp.element;

const { PluginSidebar, PluginSidebarMoreMenuItem } = wp.editPost;

const { applyFilters } = wp.hooks;

const { __ } = wp.i18n;

const { dispatch, select } = wp.data;

// const BlockTemplates = "./block-templates";

export default function() {
  const { insertBlocks, replaceBlocks, multiSelect } = dispatch("core/editor");

  const {
    getBlocks,
    getBlockCount,
    getSelectedBlock,
    getBlockInsertionPoint
  } = select("core/block-editor");

  const tabMenus = [
    {
      name: "block-templates",
      title: __("Block templates", "vk-blocks"),
      className: "edit-post-sidebar__panel-tabs"
    }
  ];

  const DummyTemplate = () => {
    return (
      <div>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </div>
    );
    return (
      <li>
        <Button
          className="smb-menu__template-part__button"
          onClick={() => {
            const parsedBlocks = parse(part.content);
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
            {part.title}
          </span>
        </Button>
      </li>
    );
  };

  return (
    <Fragment>
      <PluginSidebarMoreMenuItem target="vkbSidebar">
        {__("VK Blocks", "vk-blocks")}
      </PluginSidebarMoreMenuItem>

      <PluginSidebar name="vkbSidebar" title={__("VK Blocks", "vk-blocks")}>
        <TabPanel
          className="edit-post-sidebar__panel-tab"
          activeClass="is-active"
          onSelect={tabName => applyFilters("vk-blocks.select-menu", tabName)}
          tabs={tabMenus}
        >
          {/* <BlockTemplates /> */}
          {tabData => {
            // switch (tabData.name) {
            //   case "block-templates":
            //     return <BlockTemplates />;
            // }
            // return null;
            return (
              <PanelBody title={"template1"} opened={true}>
                <BaseControl label={__("template1content", "vk-blocks")}>
                  <DummyTemplate />
                </BaseControl>
              </PanelBody>
            );
          }}
        </TabPanel>
      </PluginSidebar>
    </Fragment>
  );
}
