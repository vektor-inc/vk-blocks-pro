const { registerPlugin } = wp.plugins;

export const registerSidebar = plugin => {
  if (!plugin) {
    return;
  }

  const { name, settings } = plugin;
  registerPlugin(name, settings);
};
