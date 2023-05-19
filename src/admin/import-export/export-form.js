/**
 * WordPress dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import { Button, CheckboxControl } from '@wordpress/components';
import { download as downloadIcon } from '@wordpress/icons';
import { useContext, useState } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { AdminContext } from '@vkblocks/admin/index';
import { download } from './file';
import { OPTION_DEFAULT_SETTINGS } from './index';
/*globals vkBlocksObject */

export default function ExportForm() {
	const { vkBlocksOption } = useContext(AdminContext);
	const [exportOptionLists, setExportOptionLists] = useState(
		OPTION_DEFAULT_SETTINGS
	);

	async function handleExport(event) {
		event.preventDefault();
		// 対象のオプション値のみをエクスポート対象にする
		const exportTargetOption = { ...vkBlocksOption };
		exportOptionLists.forEach((setting) => {
			if (!setting.isExport) {
				setting.options.forEach(
					(option) => delete exportTargetOption[option.name]
				);
			}
		});
		const fileContent = JSON.stringify(exportTargetOption);
		const publishDate = new Date().toISOString().split('T')[0];
		const fileName = `vk-blocks-${publishDate}-export.json`;
		download(fileName, fileContent, 'application/json');
	}

	const isExportLists = exportOptionLists.filter((list) => !!list.isExport);
	let ariaChecked;
	if (isExportLists.length === exportOptionLists.length) {
		ariaChecked = 'true';
	} else if (isExportLists.length > 0) {
		ariaChecked = 'mixed';
	} else {
		ariaChecked = 'false';
	}

	const handleToggleAll = (value) => {
		const copyObj = JSON.parse(JSON.stringify(exportOptionLists));
		copyObj.forEach((list) => (list.isExport = value));
		setExportOptionLists(copyObj);
	};

	return (
		<div>
			<h4>
				{__(
					'エクスポート',
					// 'Export',
					'vk-blocks'
				)}
			</h4>
			<CheckboxControl
				label={__(
					'すべて切り替え',
					// 'Toggle all',
					'vk-blocks'
				)}
				checked={isExportLists.length === exportOptionLists.length}
				onChange={handleToggleAll}
				aria-checked={ariaChecked}
			/>
			{Object.keys(OPTION_DEFAULT_SETTINGS).map((key, index) => {
				const { groupTitle, isShow = true } =
					OPTION_DEFAULT_SETTINGS[key];
				const checked = exportOptionLists[index].isExport
					? true
					: false;
				const handleToggle = (value) => {
					const copyObj = JSON.parse(
						JSON.stringify(exportOptionLists)
					);
					copyObj[index].isExport = value;
					setExportOptionLists(copyObj);
				};
				return (
					isShow && (
						<CheckboxControl
							key={index}
							label={sprintf(
								// translators: %sをエクスポートする
								__(
									'%sをエクスポートする',
									// 'Export %s',
									'vk-blocks'
								),
								groupTitle
							)}
							checked={checked}
							onChange={(value) => handleToggle(value, index)}
						/>
					)
				);
			})}
			{vkBlocksObject.options !== vkBlocksOption && (
				<p>
					{__(
						'変更した設定が保存されていないようです。変更前の設定内容をエクスポートします。',
						// 'It seems that the changed settings are not saved. Export settings before change.',
						'vk-blocks'
					)}
				</p>
			)}
			<div className="submit">
				<Button
					variant="primary"
					icon={downloadIcon}
					onClick={handleExport}
					disabled={
						!exportOptionLists.some((list) => !!list.isExport)
					}
				>
					{__(
						'エクスポート',
						// 'Export',
						'vk-blocks'
					)}
				</Button>
			</div>
		</div>
	);
}
