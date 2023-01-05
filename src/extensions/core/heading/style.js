/**
 * heading-style block type
 *
 */
import { __ } from '@wordpress/i18n';
import { registerBlockStyle } from '@wordpress/blocks';

registerBlockStyle('core/heading', [
	{
		name: 'vk-heading-default',
		label: __('Default', 'vk-blocks'),
		isDefault: true,
	},
	{
		name: 'vk-heading-plain',
		label: __('Plain', 'vk-blocks'),
	},
	// {
	// 	name: 'vk-heading-speech_balloon_fill',
	// 	label: __('Speech balloon fill', 'vk-blocks')
	// },
	// {
	// 	name: 'vk-heading-background_fill',
	// 	label: __('Background fill', 'vk-blocks')
	// },
	// {
	// 	name: 'vk-heading-background_fill_stitch',
	// 	label: __('Background fill stitch', 'vk-blocks')
	// },
	{
		name: 'vk-heading-background_fill_lightgray',
		label: __('Background fill lightgray', 'vk-blocks'),
	},
	// {
	// 	name: 'vk-heading-topborder_background_fill_none',
	// 	label: __('Topborder background fill none', 'vk-blocks')
	// },
	// {
	// 	name: 'vk-heading-topborder_background_fill_black',
	// 	label: __('Topborder background fill black', 'vk-blocks')
	// },
	// {
	// 	name: 'vk-heading-double',
	// 	label: __('Double', 'vk-blocks')
	// },
	{
		name: 'vk-heading-double_black',
		label: __('Double border top and bottom black', 'vk-blocks'),
	},
	// {
	// 	name: 'vk-heading-double_bottomborder',
	// 	label: __('Double border-bottom', 'vk-blocks')
	// },
	{
		name: 'vk-heading-double_bottomborder_black',
		label: __('Double border bottom black', 'vk-blocks'),
	},
	// {
	// 	name: 'vk-heading-solid',
	// 	label: __('Solid', 'vk-blocks')
	// },
	{
		name: 'vk-heading-solid_black',
		label: __('Solid border top and bottom black', 'vk-blocks'),
	},
	// {
	// 	name: 'vk-heading-solid_bottomborder',
	// 	label: __('Solid border-bottom', 'vk-blocks')
	// },
	{
		name: 'vk-heading-solid_bottomborder_black',
		label: __('Solid border bottom black', 'vk-blocks'),
	},
	// {
	// 	name: 'vk-heading-solid_bottomborder_leftkeycolor',
	// 	label: __('Solid border-bottom border-left-keycolor', 'vk-blocks')
	// },
	{
		name: 'vk-heading-dotted_bottomborder_black',
		label: __('Dotted border bottom black', 'vk-blocks'),
	},
	{
		name: 'vk-heading-both_ends',
		label: __('Both ends', 'vk-blocks'),
	},
	// {
	// 	name: 'vk-heading-leftborder',
	// 	label: __('Border-left', 'vk-blocks')
	// },
	// {
	// 	name: 'vk-heading-leftborder_nobackground',
	// 	label: __('Border-left nobackground', 'vk-blocks')
	// },
	// {
	// 	name: 'vk-heading-diagonal_stripe_bottomborder',
	// 	label: __('Diagonal stripe border-bottom', 'vk-blocks')
	// },
	// 	{
	// 	name: 'vk-heading-brackets',
	// 	label: __('Brackets', 'vk-blocks')
	// },
	{
		name: 'vk-heading-brackets_black',
		label: __('Brackets black', 'vk-blocks'),
	},
	// 	{
	// 	name: 'vk-heading-small_bottomborder',
	// 	label: __('Small border-bottom', 'vk-blocks')
	// },
]);
