/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useContext, useState } from '@wordpress/element';
import {
	Button,
	Modal,
	TextControl,
	Flex,
	FlexItem,
} from '@wordpress/components';
import { plusCircle } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import { AdminContext } from '@vkblocks/admin/index';
/*globals vkBlocksObject */

// 書式設定 初期値
const CUSTOM_FORMAT_DEFAULT_OBJ = {
	title: '',
	font_weight_bold: false,
	font_italic: false,
	font_strikethrough: false,
	color: '',
	background_color: '',
	is_active_highlighter: false,
	highlighter: vkBlocksObject.highlighterColor,
	font_size: '',
	nowrap: false,
	class_name: '',
};

export const AddItemButton = () => {
	const { vkBlocksOption, setVkBlocksOption } = useContext(AdminContext);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [title, setTitle] = useState();
	const [className, setClassName] = useState();
	const [isDisableAdd, setIsDisableAdd] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	const openModal = () => setIsModalOpen(true);
	// モーダルをクローズしたらstateを初期値に戻す
	const closeModal = () => {
		setIsModalOpen(false);
		setTitle();
		setClassName();
		setIsDisableAdd(false);
		setErrorMessage('');
	};

	const addItem = () => {
		vkBlocksOption.custom_format_lists.push({
			...CUSTOM_FORMAT_DEFAULT_OBJ,
			...{
				class_name: className,
				title,
			},
		});
		setVkBlocksOption({ ...vkBlocksOption });
	};

	const validateClassName = (value) => {
		let bool = true;
		let message;
		if (typeof value !== 'string') {
			bool = false;
			message = __(
				'文字列を入力してください',
				// 'Please enter a string',
				'vk-blocks'
			);
		}
		if (!/^[a-z][a-z0-9-]*$/.test(value)) {
			bool = false;
			message = __(
				'英数字のみ使用可能です',
				// 'Only alpha-numeric characters are allowed',
				'vk-blocks'
			);
		}
		if (value === '') {
			bool = false;
			message = __(
				'クラス名は必須項目です',
				// 'Class name is required',
				'vk-blocks'
			);
		}
		// クラス名が既に登録されているか
		vkBlocksOption.custom_format_lists.forEach((option) => {
			if (option.class_name === value) {
				bool = false;
				message = __(
					'すでに登録されています',
					// 'Already registered',
					'vk-blocks'
				);
			}
		});
		setIsDisableAdd(bool);
		setErrorMessage(message);
	};

	return (
		<div className="custom_format_lists_item_add">
			<Button
				className="add-item-button"
				icon={plusCircle}
				iconSize={18}
				variant="secondary"
				onClick={openModal}
			>
				{__(
					'書式設定を追加',
					// 'Add Custom Format',
					'vk-blocks'
				)}
			</Button>
			{isModalOpen && (
				<Modal
					title={__(
						'書式設定を追加',
						// 'Add Custom Format',
						'vk-blocks'
					)}
					onRequestClose={closeModal}
					isDismissible={false}
				>
					<div className="custom_format_add_modal">
						<TextControl
							className="custom_format_item_class_name"
							label={__(
								'CSSクラス/固有ID (必須/変更不可)',
								// 'CSS class/unique ID (Required/Unchangeable)',
								'vk-blocks'
							)}
							placeholder={__(
								'(例) vk-format-1',
								// '(e.g.) vk-format-1',
								'vk-blocks'
							)}
							onChange={(value) => {
								value = value.trim();
								setClassName(value);
								validateClassName(value);
							}}
							value={className ? className : ''}
						/>
						{!isDisableAdd && (
							<p className="custom_format_item_name_error">
								{errorMessage}
							</p>
						)}
						<TextControl
							className="custom_format_item_title"
							label={__(
								'ツールバー タイトル（変更可能）',
								// 'Toolbar title (Changeable)',
								'vk-blocks'
							)}
							onChange={(value) => {
								setTitle(value);
							}}
							value={title}
						/>
						<div className="custom_format_add_modal_button_area">
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
										onClick={() => {
											addItem();
											closeModal();
										}}
										variant="primary"
										disabled={!isDisableAdd}
									>
										{__(
											'追加',
											// 'Add',
											'vk-blocks'
										)}
									</Button>
								</FlexItem>
							</Flex>
						</div>
					</div>
				</Modal>
			)}
		</div>
	);
};
