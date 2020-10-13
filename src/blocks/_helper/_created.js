const { addFilter } = wp.hooks;

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
						default: window.vkbproVersion,
					},
				},
			};
		}
		return settings;
	}
);

const addCreatedProps = ( extraProps, blockType, attributes ) => {

	if  (blockType.name.match(/vk-blocks/g) && window.vkbproVersion ) {
		attributes._created =blockVersion
	}

    return extraProps;
}
addFilter( 'blocks.getSaveContent.extraProps', 'vk-blocks/add-created', addCreatedProps )
