/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	BaseControl,
	ToggleControl,
	TextControl,
	SelectControl,
	Button,
	ExternalLink,
} from '@wordpress/components';
import { useState, useEffect } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';
import { useSelect, useDispatch } from '@wordpress/data';
import { chevronLeft, chevronRight, closeSmall } from '@wordpress/icons';
import { store as coreStore } from '@wordpress/core-data';

/**
 * External dependencies
 */
import parse from 'html-react-parser';

/**
 * Internal dependencies
 */
import AdvancedPopOverControl from '@vkblocks/components/advanced-popover-control';
import { STORE_NAME } from '@vkblocks/utils/store/constants';
import { updateOptions } from '@vkblocks/utils/store';

const FontAwesomeIconList = [
	'<i class="fa-solid fa-arrow-right"></i>',
	'<i class="fa-solid fa-arrow-down"></i>',
	'<i class="fa-solid fa-arrow-left"></i>',
	'<i class="fa-solid fa-circle-right"></i>',
	'<i class="fa-solid fa-circle-down"></i>',
	'<i class="fa-solid fa-circle-left"></i>',
	'<i class="fa-regular fa-circle-right"></i>',
	'<i class="fa-regular fa-circle-down"></i>',
	'<i class="fa-regular fa-circle-left"></i>',
	'<i class="fa-solid fa-square-up-right"></i>',
	'<i class="fa-solid fa-up-right-from-square"></i>',
	'<i class="fa-solid fa-download"></i>',
	'<i class="fa-solid fa-triangle-exclamation"></i>',
	'<i class="fa-solid fa-circle-exclamation"></i>',
	'<i class="fa-solid fa-exclamation"></i>',
	'<i class="fa-solid fa-question"></i>',
	'<i class="fa-solid fa-circle-question"></i>',
	'<i class="fa-solid fa-circle-info"></i>',
	'<i class="fa-solid fa-info"></i>',
	'<i class="fa-solid fa-check"></i>',
	'<i class="fa-solid fa-square-check"></i>',
	'<i class="fa-solid fa-circle-check"></i>',
	'<i class="fa-solid fa-phone"></i>',
	'<i class="fa-solid fa-square-phone"></i>',
	'<i class="fa-solid fa-mobile-screen-button"></i>',
	'<i class="fa-regular fa-envelope"></i>',
	'<i class="fa-solid fa-user"></i>',
	'<i class="fa-solid fa-users"></i>',
	'<i class="fa-regular fa-file-lines"></i>',
	'<i class="fa-solid fa-file-lines"></i>',
	'<i class="fa-solid fa-file"></i>',
	'<i class="fa-solid fa-file-pdf"></i>',
	'<i class="fa-solid fa-building"></i>',
	'<i class="fa-brands fa-square-x-twitter"></i>',
	'<i class="fa-brands fa-square-facebook"></i>',
	'<i class="fa-brands fa-line"></i>',
];

export const FontAwesome = (props) => {
	const {
		attributeName,
		attributes,
		setAttributes,
		modeClass = false,
	} = props;
	// eslint-disable-next-line no-undef
	const iconsUrl = vkFontAwesome.iconsUrl;
	// eslint-disable-next-line no-undef
	const iconFamily = vkFontAwesome.iconFamily;
	// eslint-disable-next-line no-undef
	const versions = vkFontAwesome.versions;
	// eslint-disable-next-line no-undef
	const currentVersion = vkFontAwesome.currentVersion;
	const REST_API_ROUTE = '/vk-blocks/v1/options/vk_font_awesome_version/';
	const [isWaiting, setIsWaiting] = useState(false);
	const [version, setVersion] = useState();
	const [isEditMode, setIsEditMode] = useState(false);

	// クラス名を抽出する関数
	const extractIconClass = (htmlString) => {
		const match = htmlString.match(/class="([^"]+)"/);
		return match ? match[1] : htmlString;
	};

	const handleIconSelect = (iconPreset) => {
		const value = modeClass ? extractIconClass(iconPreset) : iconPreset;
		setAttributes({
			[attributeName]: value,
		});
	};

	const handleTextControlChange = (value) => {
		const extractedClass = extractIconClass(value);
		setAttributes({ [attributeName]: extractedClass });
	};

	const { canUserEdit, optionObj } = useSelect((select) => {
		const { canUser } = select(coreStore);
		const canEdit = canUser('update', 'settings');

		const { getOptions } = select(STORE_NAME);
		return {
			canUserEdit: canEdit,
			optionObj: getOptions(),
		};
	}, []);

	const { setOptions } = useDispatch(STORE_NAME);

	const updateSettings = (value) => {
		optionObj?.vkBlocksOption.icon_custom_lists?.unshift(value);
		const newObj = {
			...optionObj,
			vkBlocksOption: {
				...optionObj.vkBlocksOption,
			},
		};
		setOptions(newObj);
		updateOptions(newObj);
	};

	const deleteSettings = (value) => {
		const index = optionObj.vkBlocksOption.icon_custom_lists.indexOf(value);
		optionObj.vkBlocksOption.icon_custom_lists.splice(index, 1);
		const newObj = {
			...optionObj,
			vkBlocksOption: {
				...optionObj.vkBlocksOption,
			},
		};
		setOptions(newObj);
		updateOptions(newObj);
		if (newObj.vkBlocksOption.icon_custom_lists.length === 0) {
			setIsEditMode(false);
		}
	};

	// Set options to state.
	useEffect(() => {
		setVersion(currentVersion);
	}, []);

	// Update options.
	const handleUpdateOptions = () => {
		setIsWaiting(true);

		apiFetch({
			path: REST_API_ROUTE,
			method: 'POST',
			data: version,
		})
			.then(() => {
				setIsWaiting(false);
				window.location.reload();
			})
			.catch(() => {
				setIsWaiting(false);
			});
	};

	const canAddIconPreset =
		attributes[attributeName] &&
		!optionObj?.vkBlocksOption?.icon_custom_lists.some(
			(list) => list === attributes[attributeName]
		);

	const existsIconPreset =
		optionObj?.vkBlocksOption?.icon_custom_lists.length !== 0;

	const showIconPresetArrow =
		isEditMode && optionObj?.vkBlocksOption?.icon_custom_lists.length !== 1;

	const render = (
		<>
			<BaseControl
				className={'components-base-control__label'}
				id={`vk_fa_icon_list`}
				label={__('Icon', 'vk-blocks-pro') + ' ( ' + iconFamily + ' ) '}
			>
				<div className="vk_icon_list_wrap">
					{existsIconPreset && (
						<div className="vk_icon_list_my_list">
							<p className="vk_icon_list_title">
								{__('Custom list', 'vk-blocks-pro')}
							</p>
							<div className="vk_icon_list">
								{optionObj?.vkBlocksOption?.icon_custom_lists &&
									Object.keys(
										optionObj?.vkBlocksOption
											?.icon_custom_lists
									).map((key, index) => {
										const iconPreset =
											optionObj.vkBlocksOption
												.icon_custom_lists[key];
										return (
											<div
												className="vk_icon_area"
												key={index}
											>
												<div className="vk_icon_button_icon_area">
													<Button
														className="vk_icon_button"
														variant="secondary"
														onClick={() =>
															handleIconSelect(
																iconPreset
															)
														}
													>
														{iconPreset &&
															parse(
																`${iconPreset}`
															)}
													</Button>
													{isEditMode && (
														<Button
															className="vk_icon_button_closeSmall"
															icon={closeSmall}
															onClick={() =>
																deleteSettings(
																	iconPreset
																)
															}
															isDestructive
														/>
													)}
												</div>
												{showIconPresetArrow && (
													<div className="vk_icon_button_button_area">
														<Button
															className="vk_icon_button_chevronLeft"
															icon={chevronLeft}
															disabled={
																index === 0
															}
															onClick={() => {
																const newItems =
																	[
																		...optionObj
																			.vkBlocksOption
																			.icon_custom_lists,
																	];
																newItems[
																	index - 1
																] =
																	optionObj.vkBlocksOption.icon_custom_lists[
																		index
																	];
																newItems[
																	index
																] =
																	optionObj.vkBlocksOption.icon_custom_lists[
																		index -
																			1
																	];
																const newObj = {
																	...optionObj,
																	vkBlocksOption:
																		{
																			...optionObj.vkBlocksOption,
																			icon_custom_lists:
																				[
																					...newItems,
																				],
																		},
																};
																setOptions(
																	newObj
																);
																updateOptions(
																	newObj
																);
															}}
														/>
														<Button
															className="vk_icon_button_chevronRight"
															icon={chevronRight}
															disabled={
																index ===
																optionObj
																	.vkBlocksOption
																	.icon_custom_lists
																	.length -
																	1
															}
															onClick={() => {
																const newItems =
																	[
																		...optionObj
																			.vkBlocksOption
																			.icon_custom_lists,
																	];
																newItems[
																	index + 1
																] =
																	optionObj.vkBlocksOption.icon_custom_lists[
																		index
																	];
																newItems[
																	index
																] =
																	optionObj.vkBlocksOption.icon_custom_lists[
																		index +
																			1
																	];
																const newObj = {
																	...optionObj,
																	vkBlocksOption:
																		{
																			...optionObj.vkBlocksOption,
																			icon_custom_lists:
																				[
																					...newItems,
																				],
																		},
																};
																setOptions(
																	newObj
																);
																updateOptions(
																	newObj
																);
															}}
														/>
													</div>
												)}
											</div>
										);
									})}
							</div>
						</div>
					)}
					<div className="vk_icon_list_preset">
						{existsIconPreset && (
							<p className="vk_icon_list_title">
								{__('Preset', 'vk-blocks-pro')}
							</p>
						)}
						<div className="vk_icon_list">
							{Object.keys(FontAwesomeIconList).map(
								(key, index) => {
									const iconPreset = FontAwesomeIconList[key];
									return (
										<div
											className="vk_icon_area"
											key={index}
										>
											<div className="vk_icon_button_icon_area">
												<Button
													className="vk_icon_button"
													variant="secondary"
													onClick={() =>
														handleIconSelect(
															iconPreset
														)
													}
												>
													{iconPreset &&
														parse(`${iconPreset}`)}
												</Button>
											</div>
										</div>
									);
								}
							)}
						</div>
					</div>
				</div>
			</BaseControl>
			<hr />
			<ExternalLink
				href={iconsUrl}
				className="components-button is-primary mt-1"
			>
				{__('Font Awesome icon list', 'vk-blocks-pro')}
			</ExternalLink>
			<p className="mt-1">
				{__(
					"If you want to use an icon other than the ones listed above, you can use any of the icons from Font Awesome's icon list Please select a tag and enter it.",
					'vk-blocks-pro'
				)}
				<br />
				{__('Ex) ', 'vk-blocks-pro')}
				{'<i class="fa-solid fa-circle-right"></i>'}
			</p>
			{canUserEdit && (
				<>
					{(canAddIconPreset || existsIconPreset) && <hr />}
					<Button
						className="vk_icon_add_my_list_button"
						variant="primary"
						disabled={!canAddIconPreset}
						onClick={() =>
							updateSettings(attributes[attributeName])
						}
					>
						{__(
							'Add selected icon to custom list',
							'vk-blocks-pro'
						)}
					</Button>
					{existsIconPreset && (
						<ToggleControl
							className="mt-1"
							label={__('Delete/Sort mode', 'vk-blocks-pro')}
							checked={isEditMode}
							onChange={() => setIsEditMode(!isEditMode)}
						/>
					)}
					<hr />
					<SelectControl
						label="Font Awesome Version"
						value={version}
						options={versions}
						onChange={(value) => setVersion(value)}
						className="mt-1"
					/>
					{version !== currentVersion && (
						<>
							<p className="mt-1">
								{__(
									'When you click save button, the window will be reloaded and this setting will be applied.',
									'vk-blocks-pro'
								)}
							</p>
							<Button
								isPrimary
								disabled={isWaiting}
								onClick={handleUpdateOptions}
							>
								{__('Save', 'vk-blocks-pro')}
							</Button>
						</>
					)}
				</>
			)}
		</>
	);

	return (
		<>
			<TextControl
				value={attributes[attributeName]}
				onChange={(value) => {
					if (modeClass) {
						handleTextControlChange(value);
					} else {
						setAttributes({ [attributeName]: value });
					}
				}}
				placeholder={'<i class="fa-solid fa-circle-right"></i>'}
				className="mb-0"
			/>
			<AdvancedPopOverControl
				label={__('Select Icon', 'vk-blocks-pro')}
				renderComp={render}
				setAttributes={setAttributes}
			/>
		</>
	);
};
