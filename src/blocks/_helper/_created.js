const { __ } = wp.i18n;
const { Fragment } = wp.element;
const { addFilter } = wp.hooks;

if (5.3 <= parseFloat(wpVersion)) {

	/* Filter of blocks.registerBlockType
	/*-----------------------------------*/
	addFilter(
		"blocks.registerBlockType",
		"vk-blocks/hidden-extension",
		(settings) => {
			// If hidden function target block...
			if (is_hidden(settings.name)) {
				settings.attributes = {
					// Deploy original settings.attributes to array and...
					...settings.attributes,
					// Add hidden attributes
					...{
						vkb_hidden: {
							type: "boolean",
							default: false,
						},
						vkb_hidden_xxl: {
							type: "boolean",
							default: false,
						},
						vkb_hidden_xl_v2: {
							type: "boolean",
							default: false,
						},
						vkb_hidden_xl: {
							type: "boolean",
							default: false,
						},
						vkb_hidden_lg: {
							type: "boolean",
							default: false,
						},
						vkb_hidden_md: {
							type: "boolean",
							default: false,
						},
						vkb_hidden_sm: {
							type: "boolean",
							default: false,
						},
						vkb_hidden_xs: {
							type: "boolean",
							default: false,
						},
					},
				};
			}
			return settings;
		}
	);
}
