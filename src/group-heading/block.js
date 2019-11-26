/**
 * group-heading block type
 *
 */
const {assign} = lodash;
const {__} = wp.i18n;
const {Fragment} = wp.element;
const {addFilter} = wp.hooks;
const {
    PanelBody,
} = wp.components;

const {
    InspectorControls,
    ColorPalette
} = wp.blockEditor;

const {createHigherOrderComponent} = wp.compose;


wp.blocks.registerBlockStyle('core/group',
    [
        {
            name: 'vk-group-default',
            label: __('Default', 'vk-blocks'),
            isDefault: true
        },
        {
            name: 'vk-group-solid',
            label: __('Solid', 'vk-blocks')
        },
        {
            name: 'vk-group-dotted',
            label: __('Dotted', 'vk-blocks')
        },
        {
            name: 'vk-group-dashed',
            label: __('Dashed', 'vk-blocks')
        },
        {
            name: 'vk-group-double',
            label: __('Double', 'vk-blocks')
        },       
        {
            name: 'vk-group-stitch',
            label: __('Stitch', 'vk-blocks')
        },
        {
            name: 'vk-group-top-bottom-border',
            label: __('top-bottom-border', 'vk-blocks')
        },
        {
            name: 'vk-group-shadow',
            label: __('Shadow', 'vk-blocks')
        }  
    ]);
