/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useContext, useEffect, useState } from '@wordpress/element';
import { CheckboxControl } from '@wordpress/components';

/**
 * Internal dependencies
 */
import { AdminContext } from '@vkblocks/admin/index';

export default function AdminLoadSeparate() {
	const { vkBlocksOption, setVkBlocksOption } = useContext(AdminContext);
	const [isDisabled, setIsDisabled] = useState(false);
	const [hasExternalControl, setHasExternalControl] = useState(false);
	const [isWp68OrLater, setIsWp68OrLater] = useState(false);

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

	// WordPress 6.8以上で他のプラグインの設定を確認
	useEffect(() => {
		// APIエンドポイントを追加して他のプラグインの設定を取得
		const checkExternalControl = async () => {
			try {
				const response = await fetch('/wp-json/vk-blocks/v1/check-on-demand-status');
				const data = await response.json();
				
				if (data.hasExternalControl) {
					setIsDisabled(true);
					setHasExternalControl(true);
					// 他のプラグインがtrueを返している場合は強制的にオンにする
					if (data.isEnabled && !migrateLoadSeparateOption) {
						setVkBlocksOption({
							...vkBlocksOption,
							load_separate_option: true,
						});
					}
				}
			} catch (error) {
				console.error('Failed to check external control status:', error);
			}
		};

		// WordPress 6.8以上の場合のみチェック
		if (window.wpVersion && window.wpVersion >= '6.8') {
			checkExternalControl();
			setIsWp68OrLater(true);
		}
	}, []);

	return (
		<>
			<section>
				<h3 id="load-separete-setting">
					{__('Load Separate Setting', 'vk-blocks-pro')}
				</h3>
				{hasExternalControl && (
					<div className="notice notice-info">
						<p>
							{__(
								'This option is currently controlled by another plugin or theme. The setting is locked to maintain compatibility.',
								'vk-blocks-pro'
							)}
						</p>
					</div>
				)}
				<p>
					{__(
						'Note that the order in which CSS/JS are loaded will change.',
						'vk-blocks-pro'
					)}
				</p>
				<CheckboxControl
					name="vk_blocks_options[load_separate_option]"
					label={__(
						'ブロックごとのCSSだけを読み込む（表示速度を高めます）',
						'vk-blocks-pro'
					)}
					checked={migrateLoadSeparateOption}
					onChange={(newValue) => {
						setVkBlocksOption({
							...vkBlocksOption,
							load_separate_option: newValue,
							// デフォルトでは他と協調する
							follow_external_on_demand: true,
						});
					}}
				/>

				{isWp68OrLater && migrateLoadSeparateOption && (
					<div className="vk-blocks-advanced-setting">
						<p className="description">
							{__(
								'※ 他の高速化プラグインなどと競合して設定が反映されない場合は、以下のオプションをお試しください',
								'vk-blocks-pro'
							)}
						</p>
						<CheckboxControl
							name="vk_blocks_options[follow_external_on_demand]"
							label={__(
								'Prioritize VK Blocks settings',
								'vk-blocks-pro'
							)}
							help={__(
								'Note: When checked, VK Blocks settings will override those from other plugins and themes.',
								'vk-blocks-pro'
							)}
							checked={!vkBlocksOption.follow_external_on_demand}
							onChange={(newValue) => {
								setVkBlocksOption({
									...vkBlocksOption,
									follow_external_on_demand: !newValue,
								});
							}}
						/>
					</div>
				)}
			</section>
		</>
	);
}
