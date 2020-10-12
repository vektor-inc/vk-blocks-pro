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
						default: null,
					},
				},
			};
		}
		return settings;
	}
);

export function addCreatedProps( extraProps, blockType, attributes ) {
	const blockVersion = window.vkbproVersion;

	if  (blockType.name.match(/vk-blocks/g) && blockVersion ) {
		extraProps.children.props.attributes._created =blockVersion
	}

    return extraProps;
}
addFilter( 'blocks.getSaveContent.extraProps', 'vk-blocks/add-created', addCreatedProps )
