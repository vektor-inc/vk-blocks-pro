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
            name: 'default',
            label: __('Default', 'vk-blocks'),
            isDefault: true
        },
        {
            name: 'solid',
            label: __('Solid', 'vk-blocks')
        },
        {
            name: 'dotted',
            label: __('Dotted', 'vk-blocks')
        },
        {
            name: 'dashed',
            label: __('Dashed', 'vk-blocks')
        },
        {
            name: 'double',
            label: __('Double', 'vk-blocks')
        },       
        {
            name: 'stitch',
            label: __('Stitch', 'vk-blocks')
        },
        {
            name: 'top-bottom-border',
            label: __('top-bottom-border', 'vk-blocks')
        },
        {
            name: 'shadow',
            label: __('Shadow', 'vk-blocks')
        }  
    ]);
