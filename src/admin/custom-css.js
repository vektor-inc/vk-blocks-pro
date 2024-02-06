/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useContext } from '@wordpress/element';
import { ToggleControl } from '@wordpress/components';

/**
 * Internal dependencies
 */
import { AdminContext } from '@vkblocks/admin/index';

export default function AdminCustomCss() {
	const { vkBlocksOption, setVkBlocksOption } = useContext(AdminContext);

	return (
		<>
			<section>
				<h3 id="custom-css-setting">
					{__('Custom CSS Setting', 'vk-blocks-pro')}
				</h3>
				<ToggleControl
					name="vk_blocks_options[show_custom_css_editor_flag]"
					label={__(
						'Show Custom CSS flag in editor',
						'vk-blocks-pro'
					)}
					checked={
						vkBlocksOption.show_custom_css_editor_flag === 'show'
							? true
							: false
					}
					onChange={(newValue) => {
						if (newValue) {
							newValue = 'show';
						} else {
							newValue = 'hide';
						}
						setVkBlocksOption({
							...vkBlocksOption,
							show_custom_css_editor_flag: newValue,
						});
					}}
				/>
			</section>
		</>
	);
}
