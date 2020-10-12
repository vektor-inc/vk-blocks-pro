const { __ } = wp.i18n;
const { Fragment } = wp.element;
const { addFilter } = wp.hooks;
/* Filter of blocks.registerBlockType
/*-----------------------------------*/
addFilter(
	"blocks.registerBlockType",
	"vk-blocks/_created",
	(settings) => {
		// If hidden function target block...
		if (settings.name.match(/vk-blocks/g)) {
			settings.attributes = {
				// Deploy original settings.attributes to array and...
				...settings.attributes,
				// Add hidden attributes
				...{
					_created: {
						type: "string",
						default: null,
					},
				},
			};
		}
		return settings;
	}
);
