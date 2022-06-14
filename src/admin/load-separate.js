/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useContext } from '@wordpress/element';
import { CheckboxControl } from '@wordpress/components';

/**
 * Internal dependencies
 */
import { SaveButton } from '@vkblocks/admin/save-button';
import { AdminContext } from '@vkblocks/admin/index';

export default function AdminLoadSeparate() {
	const { vkBlocksOption, setVkBlocksOption, vkBlocksBalloonMeta } =
		useContext(AdminContext);
	return (
		<>
			<section>
				<h3 id="balloon-setting">
					{__('Load Separate Setting', 'vk-blocks')}
				</h3>
				<p>
					{__(
						'Note that the order in which CSS/JS are loaded will change.',
						'vk-blocks'
					)}
				</p>
				<CheckboxControl
					label={__('Load Separate Option on', 'vk-blocks')}
					checked={vkBlocksOption.load_separate_option}
					onChange={(newValue) => {
						setVkBlocksOption({
							...vkBlocksOption,
							load_separate_option: newValue,
						});
					}}
				/>
			</section>
			<SaveButton
				vkBlocksOption={vkBlocksOption}
				vkBlocksBalloonMeta={vkBlocksBalloonMeta}
			/>
		</>
	);
}
