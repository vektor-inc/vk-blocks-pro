import { useContext } from '@wordpress/element';
import { TextControl } from '@wordpress/components'; // TextControl を追加
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
				<TextControl
					id="breadcrumb-selector"
					className="vk_admin_selectControl"
					name="vk_blocks_options[breadcrumb_separator_design]"
					value={
						!vkBlocksOption.vk_blocks_pro_breadcrumb_separator
							? ''
							: vkBlocksOption.vk_blocks_pro_breadcrumb_separator
					}
					onChange={(newValue) => {
						newValue = newValue.trim();
						setVkBlocksOption({
							...vkBlocksOption,
							vk_blocks_pro_breadcrumb_separator: newValue,
						});
					}}
				/>
			</section>
		</>
	);
}
