/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useContext, useState } from '@wordpress/element';
import { Button, Modal, TextControl } from '@wordpress/components';
import { plusCircle } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import { AdminContext } from '@vkblocks/admin/index';
import { schema } from '@vkblocks/admin/text-style/schema';

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

	// indexは被らないように設定されているindexの最大値+1を設定する
	let maxIndex = 0;
	vkBlocksOption.text_style.forEach((option) => {
		if (option.index > maxIndex) {
			maxIndex = option.index;
		}
	});

	const addItem = () => {
		const addIndex = maxIndex + 1;
		vkBlocksOption.text_style.push({
			...schema,
			...{
				index: addIndex,
				class_name: className,
				title,
			},
		});
		setVkBlocksOption({ ...vkBlocksOption });
	};

	const checkClassName = (value) => {
		let bool = true;
		let message;
		if (typeof value !== 'string') {
			bool = false;
			message = __('Please enter a string', 'vk-blocks');
		}
		if (!/^[a-z][a-z0-9-]*$/.test(value)) {
			bool = false;
			message = __(
				'Only alpha-numeric characters are allowed.',
				'vk-blocks'
			);
		}
		if (value === '') {
			bool = false;
			message = __('Class name is required.', 'vk-blocks');
		}
		vkBlocksOption.text_style.forEach((option) => {
			if (option.class_name === value) {
				bool = false;
				message = __('Already registered.', 'vk-blocks');
			}
		});
		setIsDisableAdd(bool);
		setErrorMessage(message);
	};

	return (
		<div className="text_style_item_add">
			<Button
				className="add-item-button"
				icon={plusCircle}
				iconSize={18}
				variant="secondary"
				onClick={openModal}
			>
				{__('Add Text Style', 'vk-blocks')}
			</Button>
			{isModalOpen && (
				<Modal
					title={__('Add Text Style Setting ?', 'vk-blocks')}
					onRequestClose={closeModal}
					isDismissible={false}
				>
					<div className="text-style-add-modal">
						<TextControl
							className="text_style_item_class_name"
							label={__(
								'CSS class/ID (Required/Unchangeable)',
								'vk-blocks'
							)}
							onChange={(value) => {
								value = value.trim();
								setClassName(value);
								checkClassName(value);
							}}
							value={className ? className : ''}
						/>
						{!isDisableAdd && (
							<p className="text_style_item_name_error">
								{errorMessage}
							</p>
						)}
						<TextControl
							className="text_style_item_title"
							label={__(
								'Toolbar title (Changeable)',
								'vk-blocks'
							)}
							onChange={(value) => {
								setTitle(value);
							}}
							value={title}
						/>
						<div className="text-style-add-modal-button-area">
							<Button
								onClick={() => {
									addItem();
									closeModal();
								}}
								variant="primary"
								disabled={!isDisableAdd}
							>
								{__('Add', 'vk-blocks')}
							</Button>
							<Button variant="secondary" onClick={closeModal}>
								{__('Cancel', 'vk-blocks')}
							</Button>
						</div>
					</div>
				</Modal>
			)}
		</div>
	);
};
