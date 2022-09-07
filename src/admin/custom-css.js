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
	// 後から追加したbooleanは値がない時にupdate_optionできない
	// https://core.trac.wordpress.org/ticket/40007
	let migrateLoadSeparateOption;
	if (vkBlocksOption.show_custom_css_editor_flag === 'true') {
		migrateLoadSeparateOption = true;
	} else {
		migrateLoadSeparateOption = false;
	}
	return (
		<>
			<section>
				<h3 id="custom-css-setting">
					{__('Custom CSS Setting', 'vk-blocks')}
				</h3>
				<ToggleControl
					name="vk_blocks_options[show_custom_css_editor_flag]"
					label={__('Show Custom CSS flag in editor', 'vk-blocks')}
					checked={migrateLoadSeparateOption}
					onChange={(newValue) => {
						if (newValue) {
							newValue = 'true';
						} else {
							newValue = 'false';
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
