/**
 * list-style block type
 *
 */

wp.blocks.registerBlockStyle('core/group',
    [
        {
            name: 'default',
            label: __('Default', 'vk-blocks'),
            isDefault: true
        },
        {
            name: 'chevron-mark',
            label: __('Chevron', 'vk-blocks'),
        }
    ]);
