// AdminBreadcrumbSeparator.js
import { useContext } from '@wordpress/element';
import { SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { AdminContext } from '@vkblocks/admin/index';

export default function AdminBreadcrumbSeparator() {
	const { vkBlocksOption, setVkBlocksOption } = useContext(AdminContext);

	return (
		<>
			<section>
				<h3 id="breadcrumb-separator-setting">
					{__('Breadcrumb Separator Setting', 'vk-blocks-pro')}
				</h3>
				<p>
					{__(
						'Choose the design for the breadcrumb separator.',
						'vk-blocks-pro'
					)}
				</p>
				<SelectControl
					id="breadcrumb-separator-selector"
					className="vk_admin_selectControl"
					name="vk_blocks_options[breadcrumb_separator_design]"
					value={vkBlocksOption.vk_blocks_pro_breadcrumb_separator}
					onChange={(newValue) => {
						setVkBlocksOption({
							...vkBlocksOption,
							vk_blocks_pro_breadcrumb_separator: newValue,
						});
					}}
					options={[
						{
							label: __('Nothing(/)', 'vk-blocks-pro'),
							value: '',
						},
						{
							label: __('Chevron (>)', 'vk-blocks-pro'),
							value: '>',
						},
						{
							label: __('Arrow (→)', 'vk-blocks-pro'),
							value: '→',
						},
						{
							label: __('Triangle (▶︎)', 'vk-blocks-pro'),
							value: '▶︎',
						},
						{
							label: __('Triangle Outline (▷)', 'vk-blocks-pro'),
							value: '▷',
						},
						{
							label: __('Double Chevron (»)', 'vk-blocks-pro'),
							value: '»',
						},
						{
							label: __('Dotted Line (···)', 'vk-blocks-pro'),
							value: '···',
						},
					]}
				/>
			</section>
		</>
	);
}
