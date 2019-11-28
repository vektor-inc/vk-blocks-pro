/**
 * heading-style block type
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
import {convertColorClass} from "../_helper/color-code-to-class.js";

const isValidBlockType = (name) => {
    const validBlockTypes = [
        'core/heading',
    ];
    return validBlockTypes.includes(name);
};

export const addAttribute = (settings) => {
    if (isValidBlockType(settings.name)) {

        settings.attributes = assign(settings.attributes, {
            color: {
                type: 'string',
            },
        });
    }
    return settings;
};
addFilter('blocks.registerBlockType', 'vk-blocks/heading-style', addAttribute);



wp.blocks.registerBlockStyle( 'core/heading', 
	[
        {
            name: 'vk-heading-default',
            label: __('Default', 'vk-blocks'),
            isDefault:true
        },	
		{
			name: 'vk-heading-plain',
			label: __('Plain', 'vk-blocks')
		},
		{
			name: 'vk-heading-speech_balloon_fill',
			label: __('Speech_balloon_fill', 'vk-blocks')
		},
		{
			name: 'vk-heading-background_fill',
			label: __('Background_fill', 'vk-blocks')
		},
		{
			name: 'vk-heading-background_fill_stitch',
			label: __('Background_fill_stitch', 'vk-blocks')
		},
		{
			name: 'vk-heading-background_fill_lightgray',
			label: __('Background_fill_lightgray', 'vk-blocks')
		},
		{
			name: 'vk-heading-topborder_background_fill_none',
			label: __('Topborder_background_fill_none', 'vk-blocks')
		},
		{
			name: 'vk-heading-topborder_background_fill_black',
			label: __('Topborder_background_fill_black', 'vk-blocks')
		},
		{
			name: 'vk-heading-double',
			label: __('Double', 'vk-blocks')
		},
		{
			name: 'vk-heading-double_black',
			label: __('Double_black', 'vk-blocks')
		},
		{
			name: 'vk-heading-double_bottomborder',
			label: __('Double_bottomborder', 'vk-blocks')
		},
		{
			name: 'vk-heading-double_bottomborder_black',
			label: __('Double_bottomborder_black', 'vk-blocks')
		},
		{
			name: 'vk-heading-solid',
			label: __('Solid', 'vk-blocks')
		},
		{
			name: 'vk-heading-solid_black',
			label: __('Solid_black', 'vk-blocks')
		},
		{
			name: 'vk-heading-solid_bottomborder',
			label: __('Solid_bottomborder', 'vk-blocks')
		},
		{
			name: 'vk-heading-solid_bottomborder_black',
			label: __('Solid_bottomborder_black', 'vk-blocks')
		},
		{
			name: 'vk-heading-solid_bottomborder_leftkeycolor',
			label: __('Solid_bottomborder_leftkeycolor', 'vk-blocks')
		},
		{
			name: 'vk-heading-dotted_bottomborder_black',
			label: __('Dotted_bottomborder_black', 'vk-blocks')
		},
		{
			name: 'vk-heading-both_ends',
			label: __('Both_ends', 'vk-blocks')
		},
		{
			name: 'vk-heading-leftborder',
			label: __('Leftborder', 'vk-blocks')
		},
		{
			name: 'vk-heading-leftborder_nobackground',
			label: __('Leftborder_nobackground', 'vk-blocks')
		},
 		{
			name: 'vk-heading-diagonal_stripe_bottomborder',
			label: __('Diagonal_stripe_bottomborder', 'vk-blocks')
		},
  		{
			name: 'vk-heading-brackets',
			label: __('Brackets', 'vk-blocks')
		},
  		{
			name: 'vk-heading-brackets_black',
			label: __('Brackets_black', 'vk-blocks')
		},
  		{
			name: 'vk-heading-small_bottomborder',
			label: __('Small_bottomborder', 'vk-blocks')
		},
    ]);
