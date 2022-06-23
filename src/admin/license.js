/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { TextControl } from '@wordpress/components';
import { useContext } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { SaveButton } from '@vkblocks/admin/save-button';
import { AdminContext } from '@vkblocks/admin/index';

export default function AdminLicense() {
	const { vkBlocksOption, setVkBlocksOption, vkBlocksBalloonMeta } =
		useContext(AdminContext);

	return (
		<>
			<section>
				<h3 id="license-setting">{__('License key', 'vk-blocks')}</h3>
				<p>
					{__(
						'Enter a valid Lightning G3 Pro Pack or Lightning Pro license key.',
						'vk-blocks'
					)}
				</p>
				<p>
					{__(
						'Once you enter the license key you will be able to do a one click update from the administration screen.',
						'vk-blocks'
					)}
				</p>
				<TextControl
					id='vk-blocks-pro-license-key'
					label={__('License key', 'vk-blocks')}
					className="admin-text-control"
					name="vk_blocks_options[vk_blocks_pro_license_key]"
					value={
						!vkBlocksOption.vk_blocks_pro_license_key
							? ''
							: vkBlocksOption.vk_blocks_pro_license_key
					}
					onChange={(newValue) => {
						setVkBlocksOption({
							...vkBlocksOption,
							vk_blocks_pro_license_key: newValue,
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
