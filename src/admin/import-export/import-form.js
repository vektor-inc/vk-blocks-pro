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

export default function ImportForm(props) {
	const { setIsChanged } = props;
	const { vkBlocksOption, setVkBlocksOption } = useContext(AdminContext);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isImportSuccess, setIsImportSuccess] = useState(false);
	const [error, setError] = useState(null);
	const [file, setFile] = useState(null);
	const [uploadedVkBlocksOptions, setUploadedVkBlocksOptions] =
		useState(null);
	const [importSettings, setImportSettings] = useState(
		OPTION_DEFAULT_SETTINGS
	);

	const openModal = () => {
		readFile(file)
			.then((uploadedOption) => {
				setUploadedVkBlocksOptions(uploadedOption.vkBlocksOptions);
				setIsModalOpen(true);
			})
			.catch((errors) => {
				let uiMessage;
				switch (errors.message) {
					case 'Invalid JSON file':
						uiMessage = __('Invalid JSON file', 'vk-blocks-pro');
						break;
					default:
						uiMessage = __('Unknown error', 'vk-blocks-pro');
				}
				setError(uiMessage);
			});
	};

	const closeModal = () => {
		setUploadedVkBlocksOptions(null);
		setImportSettings(OPTION_DEFAULT_SETTINGS);
		setIsModalOpen(false);
	};

	const onChangeFile = (event) => {
		setFile(event.target.files[0]);
		setError(null);
	};

	const getUpdateVkBlocksOptions = (
		_uploadedVkBlocksOptions,
		_vkBlocksOption,
		_importSettings
	) => {
		const updateVkBlocksOptions = { ..._vkBlocksOption };

		const addUniqueOptions = (
			currentOptions,
			uploadedOptions,
			comparisonKey
		) => {
			const uniqueOptions = uploadedOptions.filter(
				(newOption) =>
					!currentOptions.some((existingOption) =>
						comparisonKey
							? newOption[comparisonKey] ===
							  existingOption[comparisonKey]
							: newOption === existingOption
					)
			);
			currentOptions.push(...uniqueOptions);
		};

		_importSettings.forEach(({ options, isImport, isShow = true }) => {
			options.forEach(
				({ name, associativeArray, importMethod, uniqKey }, id) => {
					if (!isImport || !isShow) {
						delete _uploadedVkBlocksOptions[name];
						return;
					}

					const currentOptions = updateVkBlocksOptions[name];
					const uploadedOptions = _uploadedVkBlocksOptions[name];

					if (importMethod === 'add' && currentOptions) {
						const comparisonKey =
							uniqKey && associativeArray ? uniqKey : null;
						if (
							'associativeArray' in options[id] ||
							'indexedArray' in options[id]
						) {
							addUniqueOptions(
								currentOptions,
								uploadedOptions,
								comparisonKey
							);
						} else {
							currentOptions.push(...uploadedOptions);
						}
						updateVkBlocksOptions[name] = currentOptions;
					} else {
						updateVkBlocksOptions[name] = uploadedOptions;
					}
				}
			);
		});
		return updateVkBlocksOptions;
	};

	const onSubmit = (event) => {
		event.preventDefault();
		if (!uploadedVkBlocksOptions) {
			return;
		}
		// アップデートするオプション値updateOptionを作る
		const updateVkBlocksOptions = getUpdateVkBlocksOptions(
			uploadedVkBlocksOptions,
			vkBlocksOption,
			importSettings
		);
		importOptions(updateVkBlocksOptions)
			.then((importResponse) => {
				closeModal();
				setIsImportSuccess(true);
				setFile(null);
				setVkBlocksOption({
					...vkBlocksOption,
					...importResponse.updateOption,
				});
				setIsChanged(false);
			})
			.catch((errors) => {
				let uiMessage;
				switch (errors.message) {
					case 'Invalid JSON file':
						uiMessage = __('Invalid JSON file', 'vk-blocks-pro');
						break;
					default:
						uiMessage = __('Unknown error', 'vk-blocks-pro');
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

	// uploadedOptionからインポートするオプションが存在するか確認
	useEffect(() => {
		if (uploadedVkBlocksOptions) {
			const copyObj = JSON.parse(JSON.stringify(importSettings));
			Object.keys(OPTION_DEFAULT_SETTINGS).forEach((key, index) => {
				const { options } = importSettings[key];
				const isFind = options.find(
					(option) =>
						uploadedVkBlocksOptions &&
						option.name in uploadedVkBlocksOptions
				);
				if (!isFind) {
					copyObj[index].isImport = false;
					setImportSettings(copyObj);
				}
			});
		}
	}, [uploadedVkBlocksOptions]);

	const onDismissError = () => {
		setError(null);
	};

	return (
		<div>
			<h4>{__('Import', 'vk-blocks-pro')}</h4>
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
					{__('Import', 'vk-blocks-pro')}
				</Button>
			</div>
			{isModalOpen && (
				<Modal
					title={__('Import data confirmation', 'vk-blocks-pro')}
					onRequestClose={closeModal}
					isDismissible={false}
					className="import_export_add_modal"
					isFullScreen={true}
				>
					{!importSettings.some((list) => list.isImport === true) && (
						<p>{__('No import data', 'vk-blocks-pro')}</p>
					)}
					{OPTION_DEFAULT_SETTINGS.map(
						({ groupTitle, options, isShow = true }, index) => {
							const isFind = options.find(
								(option) =>
									uploadedVkBlocksOptions &&
									option.name in uploadedVkBlocksOptions
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
												// translators: Import %s
												__(
													'Import %s',
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
													associativeArray = false,
													uniqKey = false,
													importMethod,
												},
												id
											) =>
												checked &&
												uniqKey &&
												importMethod && (
													<div
														key={id}
														className="import_export_detail_area"
													>
														<RadioControl
															label={__(
																'Import method',
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
																		'Add',
																		'vk-blocks-pro'
																	),
																	value: 'add',
																},
																{
																	label: __(
																		'Override',
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
															'associativeArray' in
																options[id] &&
															vkBlocksOption[
																name
															].some((preKey) =>
																uploadedVkBlocksOptions[
																	name
																].some(
																	(
																		uploadKey
																	) =>
																		uploadKey[
																			associativeArray
																		] ===
																		preKey[
																			associativeArray
																		]
																)
															) && (
																<p>
																	{__(
																		'The following data will not be imported because the identifiers are covered.',
																		'vk-blocks-pro'
																	)}
																</p>
															)}
														{importSettings[index]
															.options[id]
															.importMethod ===
															'add' &&
															'associativeArray' in
																options[id] &&
															vkBlocksOption[
																name
															].map((preKey) => {
																return uploadedVkBlocksOptions[
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
														{importSettings[index]
															.options[id]
															.importMethod ===
															'add' &&
															'indexedArray' in
																options[id] &&
															vkBlocksOption[
																name
															].some((preKey) =>
																uploadedVkBlocksOptions[
																	name
																].some(
																	(
																		uploadKey
																	) =>
																		uploadKey ===
																		preKey
																)
															) && (
																<p>
																	{__(
																		'The following data will not be imported because the identifiers are covered.',
																		'vk-blocks-pro'
																	)}
																</p>
															)}
														{importSettings[index]
															.options[id]
															.importMethod ===
															'add' &&
															'indexedArray' in
																options[id] &&
															vkBlocksOption[
																name
															].map((preKey) => {
																return uploadedVkBlocksOptions[
																	name
																].map(
																	(
																		uploadKey,
																		uploadId
																	) => {
																		return (
																			uploadKey ===
																				preKey && (
																				<div
																					key={
																						uploadId
																					}
																				>
																					{
																						uploadKey
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
									{__('Cancel', 'vk-blocks-pro')}
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
									{__('Import', 'vk-blocks-pro')}
								</Button>
							</FlexItem>
						</Flex>
					</div>
				</Modal>
			)}
			{isImportSuccess && (
				<div>
					<Snackbar>
						{__('Import Success', 'vk-blocks-pro')}{' '}
					</Snackbar>
				</div>
			)}
		</div>
	);
}
