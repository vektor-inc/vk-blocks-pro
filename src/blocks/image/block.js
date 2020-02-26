const {__} = wp.i18n;
wp.blocks.registerBlockStyle('core/image',
	[
		{
			name: 'vk-image-border',
			label: __('Border', 'vk-blocks'),
		},
		{
			name: 'vk-image-photoFrame',
			label: __('Photo frame', 'vk-blocks'),
		},
	]
);
