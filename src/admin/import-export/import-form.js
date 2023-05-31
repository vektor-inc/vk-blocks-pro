/**
 * WordPress dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import {
	Button,
	Notice,
	Snackbar,
	Modal,
	Flex,
	FlexItem,
	RadioControl,
	CheckboxControl,
} from '@wordpress/components';
import { upload } from '@wordpress/icons';
import { useContext, useState, useEffect } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { AdminContext } from '@vkblocks/admin/index';
import { importOptions, readFile } from './import';
import { OPTION_DEFAULT_SETTINGS } from './index';

export default function ImportForm() {
	const { vkBlocksOption, setVkBlocksOption } = useContext(AdminContext);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isImportSuccess, setIsImportSuccess] = useState(false);
	const [error, setError] = useState(null);
	const [file, setFile] = useState(null);
	const [uploadedOptions, setUploadedOptions] = useState(null);
	const [importSettings, setImportSettings] = useState(
		OPTION_DEFAULT_SETTINGS
	);

	const openModal = () => {
		readFile(file)
			.then((uploadedOption) => {
				setUploadedOptions(uploadedOption);
				setIsModalOpen(true);
			})
			.catch((errors) => {
				let uiMessage;
				switch (errors.message) {
					case 'Invalid JSON file':
						uiMessage = __('Invalid JSON file');
						break;
					default:
						uiMessage = __('Unknown error');
				}
				setError(uiMessage);
			});
	};

	const closeModal = () => {
		setUploadedOptions(null);
		setImportSettings(OPTION_DEFAULT_SETTINGS);
		setIsModalOpen(false);
	};

	const onChangeFile = (event) => {
		setFile(event.target.files[0]);
		setError(null);
	};

	const getUpdateOptions = (
		_uploadedOptions,
		_vkBlocksOption,
		_importSettings
	) => {
		// isImportがfalseだったらuploadedOptionの該当のオプションを削除する(インポートしない)
		_importSettings.forEach((setting) => {
			if (!setting.isImport || ('isShow' in setting && !setting.isShow)) {
				setting.options.forEach(
					(option) => delete _uploadedOptions[option.name]
				);
			}
		});

		const updateOptions = _vkBlocksOption;
		// importMethodがaddだったら追加する
		_importSettings.forEach(({ options, isImport }) => {
			options.forEach(({ name, uniqKey, importMethod }, id) => {
				if (!!isImport) {
					if (importMethod === 'add') {
						if ('uniqKey' in options[id]) {
							// 識別子が被っていないもののみ追加する
							const addOption = [];
							if (
								_uploadedOptions[name] &&
								_uploadedOptions[name].length > 0 &&
								_vkBlocksOption[name]
							) {
								_uploadedOptions[name].forEach(
									(uploadedOptionElement) => {
										let isDuplicate = false;
										_vkBlocksOption[name].forEach(
											(vkBlocksOptionElement) => {
												if (
													uploadedOptionElement[
														uniqKey
													] ===
													vkBlocksOptionElement[
														uniqKey
													]
												) {
													isDuplicate = true;
												}
											}
										);
										if (!isDuplicate) {
											addOption.push(
												uploadedOptionElement
											);
										}
									}
								);
							}
							updateOptions[name].push(...addOption);
						} else {
							updateOptions[name].push(..._uploadedOptions[name]);
						}
					} else {
						// 上書きする
						updateOptions[name] = _uploadedOptions[name];
					}
				}
			});
		});
		return updateOptions;
	};

	const onSubmit = (event) => {
		event.preventDefault();
		if (!uploadedOptions) {
			return;
		}
		// アップデートするオプション値updateOptionを作る
		const updateOptions = getUpdateOptions(
			uploadedOptions,
			vkBlocksOption,
			importSettings
		);
		importOptions(updateOptions)
			.then((importResponse) => {
				closeModal();
				setIsImportSuccess(true);
				setFile(null);
				setVkBlocksOption({
					...vkBlocksOption,
					...importResponse.updateOption,
				});
			})
			.catch((errors) => {
				let uiMessage;
				switch (errors.message) {
					case 'Invalid JSON file':
						uiMessage = __('Invalid JSON file');
						break;
					default:
						uiMessage = __('Unknown error');
				}
				setError(uiMessage);
			});
	};

	useEffect(() => {
		if (isImportSuccess) {
			setTimeout(() => {
				setIsImportSuccess(false);
			}, 3000);
		}
	}, [isImportSuccess]);

	// uploadedOptionからインポートするオプションが存在するか確認している
	useEffect(() => {
		if (uploadedOptions) {
			const copyObj = JSON.parse(JSON.stringify(importSettings));
			Object.keys(OPTION_DEFAULT_SETTINGS).forEach((key, index) => {
				const { options } = importSettings[key];
				const isFind = options.find(
					(option) =>
						uploadedOptions && option.name in uploadedOptions
				);
				if (!isFind) {
					copyObj[index].isImport = false;
					setImportSettings(copyObj);
				}
			});
		}
	}, [uploadedOptions]);

	const onDismissError = () => {
		setError(null);
	};

	return (
		<div>
			<h4>{__('Import')}</h4>
			{error && (
				<Notice status="error" onRemove={() => onDismissError()}>
					{error}
				</Notice>
			)}
			<div>
				<input
					type="file"
					accept="application/json"
					onChange={onChangeFile}
				/>
			</div>
			<div className="submit">
				<Button
					onClick={openModal}
					variant="primary"
					icon={upload}
					disabled={!file ? true : false}
				>
					{__('Import')}
				</Button>
			</div>
			{isModalOpen && (
				<Modal
					title={__(
						'インポートデータ確認',
						// 'Import data confirmation',
						'vk-blocks-pro'
					)}
					onRequestClose={closeModal}
					isDismissible={false}
					className="import_export_add_modal"
					isFullScreen={true}
				>
					{!importSettings.some((list) => list.isImport === true) && (
						<p>
							{__(
								'インポートデータがありません',
								// 'No import data',
								'vk-blocks-pro'
							)}
						</p>
					)}
					{OPTION_DEFAULT_SETTINGS.map(
						({ groupTitle, options, isShow = true }, index) => {
							const isFind = options.find(
								(option) =>
									uploadedOptions &&
									option.name in uploadedOptions
							);
							const checked = importSettings[index].isImport;
							const handleToggle = (value) => {
								const copyObj = JSON.parse(
									JSON.stringify(importSettings)
								);
								copyObj[index].isImport = value;
								setImportSettings(copyObj);
							};
							const onChangeIsOverride = (value, id) => {
								const copyObj = JSON.parse(
									JSON.stringify(importSettings)
								);
								copyObj[index].options[id].importMethod = value;
								setImportSettings(copyObj);
							};
							return (
								isShow &&
								isFind && (
									<div
										key={index}
										className="import_export_section"
									>
										<CheckboxControl
											key={index}
											label={sprintf(
												// translators: %s をインポートする
												__(
													'%s をインポートする',
													// 'Import %s',
													'vk-blocks-pro'
												),
												groupTitle
											)}
											checked={checked}
											onChange={handleToggle}
										/>
										{options.map(
											(
												{
													name,
													uniqKey = false,
													importMethod,
												},
												id
											) =>
												checked &&
												importMethod && (
													<div
														key={id}
														className="import_export_detail_area"
													>
														<RadioControl
															label={__(
																'インポート方法',
																// 'Import method',
																'vk-blocks-pro'
															)}
															onChange={(
																value
															) => {
																onChangeIsOverride(
																	value,
																	id
																);
															}}
															options={[
																{
																	label: __(
																		'追加',
																		// 'Add',
																		'vk-blocks-pro'
																	),
																	value: 'add',
																},
																{
																	label: __(
																		'上書き',
																		// 'Override',
																		'vk-blocks-pro'
																	),
																	value: 'override',
																},
															]}
															selected={
																importSettings[
																	index
																].options[id]
																	.importMethod
															}
														/>
														{importSettings[index]
															.options[id]
															.importMethod ===
															'add' &&
															'uniqKey' in
																options[id] &&
															vkBlocksOption[
																name
															].some((preKey) =>
																uploadedOptions[
																	name
																].some(
																	(
																		uploadKey
																	) =>
																		uploadKey[
																			uniqKey
																		] ===
																		preKey[
																			uniqKey
																		]
																)
															) && (
																<p>
																	{__(
																		'以下のデータは識別子が被っているためインポートしません。',
																		'vk-blocks-pro'
																	)}
																</p>
															)}
														{importSettings[index]
															.options[id]
															.importMethod ===
															'add' &&
															'uniqKey' in
																options[id] &&
															vkBlocksOption[
																name
															].map((preKey) => {
																return uploadedOptions[
																	name
																].map(
																	(
																		uploadKey,
																		uploadId
																	) => {
																		return (
																			uploadKey[
																				uniqKey
																			] ===
																				preKey[
																					uniqKey
																				] && (
																				<div
																					key={
																						uploadId
																					}
																				>
																					{
																						uploadKey[
																							uniqKey
																						]
																					}
																				</div>
																			)
																		);
																	}
																);
															})}
													</div>
												)
										)}
									</div>
								)
							);
						}
					)}
					<div className="import_export_add_modal_button_area">
						<Flex justify="flex-end">
							<FlexItem>
								<Button
									variant="secondary"
									onClick={closeModal}
								>
									{__('Cancel')}
								</Button>
							</FlexItem>
							<FlexItem>
								<Button
									onClick={(event) => {
										onSubmit(event);
									}}
									variant="primary"
									disabled={
										!importSettings.some(
											(list) => !!list.isImport
										)
									}
								>
									{__('Import')}
								</Button>
							</FlexItem>
						</Flex>
					</div>
				</Modal>
			)}
			{isImportSuccess && (
				<div>
					<Snackbar>
						{__(
							// 'インポートしました',
							'Import Success',
							'vk-blocks-pro'
						)}{' '}
					</Snackbar>
				</div>
			)}
		</div>
	);
}
