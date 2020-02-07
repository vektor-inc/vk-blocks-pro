const {
  TabPanel,
  Panel,
  PanelBody,
  PanelRow,
  BaseControl,
  Button
} = wp.components;

const { Fragment } = wp.element;

const { PluginSidebar, PluginSidebarMoreMenuItem } = wp.editPost;

const { applyFilters } = wp.hooks;

const { __ } = wp.i18n;

const { dispatch, select } = wp.data;

const { parse } = wp.blocks;

import BlockTemplatePanel from "./block-template-panel";

export default function() {
  const tabMenus = [
    {
      name: "block-templates",
      title: __("Block templates", "vk-blocks"),
      className: "edit-post-sidebar__panel-tabs"
    }
  ];
  return (
    <Fragment>
      <PluginSidebarMoreMenuItem target="vkbSidebar">
        {__("VK Blocks", "vk-blocks")}
      </PluginSidebarMoreMenuItem>

      <PluginSidebar name="vkbSidebar" title={__("VK Blocks", "vk-blocks")}>
        <BlockTemplatePanel />
        {/* <TabPanel
          className="edit-post-sidebar__panel-tab"
          activeClass="is-active"
          onSelect={tabName => applyFilters("vk-blocks.select-menu", tabName)}
          tabs={tabMenus}
        >
          {tabData => {
            switch (tabData.name) {
              case "block-templates":
                return <BlockTemplatePanel />;
            }
            return null;
          }}
        </TabPanel> */}
      </PluginSidebar>
    </Fragment>
  );
}
