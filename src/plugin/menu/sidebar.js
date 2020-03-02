const { Fragment } = wp.element;

const { PluginSidebar, PluginSidebarMoreMenuItem } = wp.editPost;

const { __ } = wp.i18n;

import BlockTemplatePanel from "./block-template-panel";

export default function() {
  return (
    <Fragment>
      <PluginSidebarMoreMenuItem target="vkbSidebar">
        {__("VK Blocks Templates", "vk-blocks")}
      </PluginSidebarMoreMenuItem>
      <PluginSidebar
        name="vkbSidebar"
        title={__("VK Blocks Templates", "vk-blocks")}
      >
        <BlockTemplatePanel />
      </PluginSidebar>
    </Fragment>
  );
}
