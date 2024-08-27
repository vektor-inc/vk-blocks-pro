/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { TextControl } from '@wordpress/components';
import { useContext } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { AdminContext } from '@vkblocks/admin/index';

export default function AdminLicense() {
	const { vkBlocksOption, setVkBlocksOption, setReloadFlag } =
		useContext(AdminContext);

	return (
		<>
			<section>
				<h3 id="license-setting">
					{__('License key', 'vk-blocks-pro')}
				</h3>
				<p>
					{__(
						'Please enter a license key of valid Vektor Passport ( or Lightning G3 Pro Pack or Lightning Pro ).',
						'vk-blocks-pro'
					)}
				</p>
				<p>
					{__(
						'Once you enter the license key you will be able to do a one click update from the administration screen.',
						'vk-blocks-pro'
					)}
				</p>
				<TextControl
					id="vk-blocks-pro-license-key"
					label={__('License key', 'vk-blocks-pro')}
					type={'password'}
					className="admin-text-control"
					name="vk_blocks_options[vk_blocks_pro_license_key]"
					value={
						!vkBlocksOption.vk_blocks_pro_license_key
							? ''
							: vkBlocksOption.vk_blocks_pro_license_key
					}
					onChange={(newValue) => {
						newValue = newValue.trim();
						setVkBlocksOption({
							...vkBlocksOption,
							vk_blocks_pro_license_key: newValue,
						});
						setReloadFlag(true);
					}}
				/>
			</section>
		</>
	);
}
