// AdminBreadcrumb.js
import { useContext } from '@wordpress/element';
import { SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { AdminContext } from '@vkblocks/admin/index';

export default function AdminBreadcrumb() {
	const { vkBlocksOption, setVkBlocksOption } = useContext(AdminContext);

	return (
		<>
			<section>
				<h3 id="breadcrumb-setting">
					{__('Breadcrumb Setting', 'vk-blocks-pro')}
				</h3>
				<p>
					{__(
						'Please input the text you want to use as the separator. For example: / , > , ≫',
						'vk-blocks-pro'
					)}
				</p>
				<SelectControl
					id="breadcrumb-selector"
					className="vk_admin_selectControl"
					name="vk_blocks_options[breadcrumb_design]"
					value={vkBlocksOption.vk_blocks_pro_breadcrumb}
					onChange={(newValue) => {
						setVkBlocksOption({
							...vkBlocksOption,
							vk_blocks_pro_breadcrumb: newValue,
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
