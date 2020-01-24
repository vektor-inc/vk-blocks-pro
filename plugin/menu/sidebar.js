const { TabPanel } = wp.components;

const { Fragment } = wp.element;

const { PluginSidebar, PluginSidebarMoreMenuItem } = wp.editPost;

const { applyFilters } = wp.hooks;

const { __ } = wp.i18n;

const BlockTemplates = "./block-templates";

export default function() {
  const tabMenus = [
    {
      name: "block-templates",
      title: __("Block templates", "vk-blocks"),
      className: "edit-post-sidebar__panel-tab"
    }
  ];

  return (
    <Fragment>
      <PluginSidebarMoreMenuItem target="smbSidebar">
        {__("VK Blocks", "vk-blocks")}
      </PluginSidebarMoreMenuItem>

      <PluginSidebar name="smbSidebar" title={__("VK Blocks", "vk-blocks")}>
        <TabPanel
          className="edit-post-sidebar__panel-tabs"
          activeClass="is-active"
          // onSelect={tabName => applyFilters("vk-blocks.select-menu", tabName)}
          tabs={tabMenus}
        >
          <BlockTemplates />
          {/* {tabData => {
            switch (tabData.name) {
              case "block-templates":
                return <BlockTemplates />;
            }
            return null;
          }} */}
        </TabPanel>
      </PluginSidebar>
    </Fragment>
  );
}
