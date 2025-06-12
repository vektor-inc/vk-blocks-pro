export const isExcludeFromToc = (attributes = {}) => {
	return !!attributes.excludeFromToc;
};

export const addExcludeFromTocAttribute = (settings) => {
	return {
		...settings,
		attributes: {
			...settings.attributes,
			excludeFromToc: {
				type: 'boolean',
				default: false,
			},
		},
	};
};
