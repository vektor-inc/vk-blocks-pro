/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { SelectControl } from '@wordpress/components';
import { useContext } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { AdminContext } from '@vkblocks/admin/index';

export default function AdminBalloon() {
	const { vkBlocksOption, setVkBlocksOption } = useContext(AdminContext);

	return (
		<>
			<section>
				<h3 id="block-category-position-setting">
					{__('Block Category Position Setting', 'vk-blocks-pro')}
				</h3>
				<SelectControl
					id="block-category-position-selector"
					className="vk_admin_selectControl"
					name="vk_blocks_options[block_category_position]"
					value={
						!!vkBlocksOption.block_category_position &&
						vkBlocksOption.block_category_position
					}
					onChange={(newValue) => {
						setVkBlocksOption({
							...vkBlocksOption,
							block_category_position: newValue,
						});
					}}
					options={[
						{
							label: __(
								'Above the WordPress default blocks',
								'vk-blocks-pro'
							),
							value: 'above-core-blocks',
						},
						{
							label: __(
								'Under the WordPress default blocks',
								'vk-blocks-pro'
							),
							value: 'under-core-blocks',
						},
					]}
				/>
			</section>
		</>
	);
}
