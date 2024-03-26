/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import ExportForm from './export-form';
import ImportForm from './import-form';
/*globals vkBlocksObject */

export const OPTION_DEFAULT_SETTINGS = [
	{
		groupTitle: __('License Key', 'vk-blocks-pro'),
		options: [
			{
				name: 'vk_blocks_pro_license_key',
			},
		],
		isImport: !!vkBlocksObject.isLicenseSetting,
		isShow: !!vkBlocksObject.isLicenseSetting,
	},
	{
		groupTitle: __('Balloon Setting', 'vk-blocks-pro'),
		options: [
			{
				name: 'balloon_border_width',
			},
			{
				name: 'balloon_meta_lists',
				associativeArray: true,
				importMethod: 'add',
			},
		],
		isImport: true,
	},
	{
		groupTitle: __('Custom Format Setting', 'vk-blocks-pro'),
		options: [
			{
				name: 'custom_format_lists',
				associativeArray: true,
				uniqKey: 'class_name',
				importMethod: 'add',
			},
		],
		isImport: !!vkBlocksObject.isPro,
		isShow: !!vkBlocksObject.isPro,
	},
	{
		groupTitle: __('Custom Block Style Setting', 'vk-blocks-pro'),
		options: [
			{
				name: 'custom_block_style_lists',
				associativeArray: true,
				uniqKey: 'property_name',
				importMethod: 'add',
			},
		],
		isImport: !!vkBlocksObject.isPro,
		isShow: !!vkBlocksObject.isPro,
	},
	{
		groupTitle: __('Margin Setting', 'vk-blocks-pro'),
		options: [
			{
				name: 'margin_unit',
			},
			{
				name: 'margin_size',
			},
		],
		isImport: true,
	},
	{
		groupTitle: __('Load Separate Setting', 'vk-blocks-pro'),
		options: [
			{
				name: 'load_separate_option',
			},
		],
		isImport: true,
	},
	{
		groupTitle: __('FAQ Block Setting', 'vk-blocks-pro'),
		options: [
			{
				name: 'new_faq_accordion',
			},
		],
		isImport: !!vkBlocksObject.isPro,
		isShow: !!vkBlocksObject.isPro,
	},
	{
		groupTitle: __('Custom CSS Setting', 'vk-blocks-pro'),
		options: [
			{
				name: 'show_custom_css_editor_flag',
			},
		],
		isImport: !!vkBlocksObject.isPro,
		isShow: !!vkBlocksObject.isPro,
	},
	{
		groupTitle: __('Block Manager Setting', 'vk-blocks-pro'),
		options: [
			{
				name: 'disable_block_lists',
			},
		],
		isImport: true,
	},
	{
		groupTitle: __('Block Style Manager Setting', 'vk-blocks-pro'),
		options: [
			{
				name: 'disable_block_style_lists',
			},
		],
		isImport: true,
	},
	{
		groupTitle: __('Font Awesome Custom Lists Setting', 'vk-blocks-pro'),
		options: [
			{
				name: 'icon_custom_lists',
				indexedArray: true,
				importMethod: 'add',
			},
		],
		isImport: true,
	},
	{
		groupTitle: __('Custom Block Variation Setting', 'vk-blocks-pro'),
		options: [
			{
				name: 'block_variation_lists',
				associativeArray: true,
				uniqKey: 'name',
				importMethod: 'add',
			},
		],
		isImport: !!vkBlocksObject.isPro,
		isShow: !!vkBlocksObject.isPro,
	},
	{
		groupTitle: __('Breadcrumb Separator Setting', 'vk-blocks-pro'),
		options: [
			{
				name: 'breadcrumb_separator_design',
				associativeArray: true,
				uniqKey: 'name',
				importMethod: 'add',
			},
		],
		isImport: !!vkBlocksObject.isPro,
		isShow: !!vkBlocksObject.isPro,
	},
];

export default function AdminImportExport(props) {
	const { isChanged, setIsChanged } = props;
	return (
		<section>
			<h3 id="import-export-tool">
				{__('Import Export Tool', 'vk-blocks-pro')}
			</h3>
			<ExportForm isChanged={isChanged} />
			<ImportForm isChanged={isChanged} setIsChanged={setIsChanged} />
		</section>
	);
}
