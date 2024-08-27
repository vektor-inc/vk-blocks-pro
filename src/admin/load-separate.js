/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useContext } from '@wordpress/element';
import { CheckboxControl } from '@wordpress/components';

/**
 * Internal dependencies
 */
import { AdminContext } from '@vkblocks/admin/index';

export default function AdminLoadSeparate() {
	const { vkBlocksOption, setVkBlocksOption } = useContext(AdminContext);

	// PHPでstringで保存されていたオプション値を変換する
	let migrateLoadSeparateOption;
	if (vkBlocksOption.load_separate_option === 'true') {
		migrateLoadSeparateOption = true;
	} else if (
		!!vkBlocksOption.load_separate_option &&
		vkBlocksOption.load_separate_option
	) {
		migrateLoadSeparateOption = true;
	} else {
		migrateLoadSeparateOption = false;
	}

	return (
		<>
			<section>
				<h3 id="load-separete-setting">
					{__('Load Separate Setting', 'vk-blocks-pro')}
				</h3>
				<p>
					{__(
						'Note that the order in which CSS/JS are loaded will change.',
						'vk-blocks-pro'
					)}
				</p>
				<CheckboxControl
					name="vk_blocks_options[load_separate_option]"
					label={__('Load Separate Option on', 'vk-blocks-pro')}
					checked={migrateLoadSeparateOption}
					onChange={(newValue) => {
						setVkBlocksOption({
							...vkBlocksOption,
							load_separate_option: newValue,
						});
					}}
				/>
			</section>
		</>
	);
}
