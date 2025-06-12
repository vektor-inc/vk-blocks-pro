export const isExcludeFromToc = (attributes = {}) => {
	return !!attributes.excludeFromToc;
};

// 属性追加用
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