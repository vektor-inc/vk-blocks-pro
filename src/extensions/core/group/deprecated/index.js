import save1_95_2 from './1.95.2/save';

const deprecated = [
	{
		targetVersion: 5,
		attributes: {
			color: { type: 'string', default: '' },
			linkUrl: { type: 'string', default: '' },
			linkTarget: { type: 'string', default: '' },
			tagName: { type: 'string', default: 'div' },
		},
		migrate: (attributes) => {
			return {
				...attributes,
				relAttribute: attributes.relAttribute || '',
				linkDescription: attributes.linkDescription || '',
			};
		},
		save: save1_95_2
	},
];

export default deprecated;
