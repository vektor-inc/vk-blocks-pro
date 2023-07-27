const example = {
	attributes: {
		url: 'https://www.vektor-inc.co.jp/',
	},
	innerBlocks: [
		{
			name: 'core/columns',
			attributes: {
				style: {
					spacing: { blockGap: { top: '0', left: '0' } },
					border: {
						color: '#0000001f',
						width: '1px',
						radius: '5px',
					},
				},
			},
			innerBlocks: [
				{
					name: 'core/column',
					attributes: {
						lock: {
							move: false,
							remove: true,
						},
						verticalAlignment: 'top',
						width: '33.3%',
						style: {
							spacing: {
								padding: {
									top: '1.5rem',
									right: '1.5rem',
									bottom: '1.5rem',
									left: '1.5rem',
								},
							},
						},
					},
					innerBlocks: [
						{
							name: 'vk-blocks/blog-card-featured-image',
							attributes: {
								style: {
									border: {
										color: '#0000001f',
										width: '1px',
									},
								},
							},
						},
					],
				},
				{
					name: 'core/column',
					attributes: {
						lock: {
							move: false,
							remove: true,
						},
						width: '66.6%',
						style: {
							spacing: {
								padding: {
									top: '1.5rem',
									right: '1.5rem',
									bottom: '1.5rem',
									left: '1.5rem',
								},
							},
						},
					},
					innerBlocks: [
						{ name: 'vk-blocks/blog-card-title', attributes: {} },
						{ name: 'vk-blocks/blog-card-excerpt', attributes: {} },
						{
							name: 'core/group',
							attributes: {
								style: {
									spacing: { blockGap: '6px' },
								},
								layout: {
									type: 'flex',
									flexWrap: 'nowrap',
									verticalAlignment: 'center',
								},
							},
							innerBlocks: [
								{
									name: 'vk-blocks/blog-card-site-logo',
									attributes: {
										style: {
											layout: {
												selfStretch: 'fixed',
												flexSize: '15px',
											},
										},
									},
								},
								{
									name: 'vk-blocks/blog-card-site-title',
									attributes: {},
								},
							],
						},
					],
				},
			],
		},
	],
};
export default example;
