/**
 * WordPress dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import { useContext, useState } from '@wordpress/element';
import { Button, Modal } from '@wordpress/components';

/**
 * Internal dependencies
 */
import { AdminContext } from '@vkblocks/admin/index';

export const DeleteItemButton = (props) => {
	const { vkBlocksOption, setVkBlocksOption } = useContext(AdminContext);
	const { i } = props;

	const [isModalOpen, setIsModalOpen] = useState(false);

	const openModal = () => setIsModalOpen(true);
	const closeModal = () => setIsModalOpen(false);

	const deleteItem = () => {
		vkBlocksOption.text_style.splice(i, 1);
		setVkBlocksOption({
			...vkBlocksOption,
		});
	};

	const textStyleTitle = !!vkBlocksOption.text_style[i].title
		? vkBlocksOption.text_style[i].title
		: '';

	return (
		<>
			<Button
				className="delete-item-button"
				isDestructive
				onClick={openModal}
			>
				{__('Delete', 'vk-blocks')}
			</Button>
			{isModalOpen && (
				<Modal
					title={__('Delete Text Style Setting ?', 'vk-blocks')}
					onRequestClose={closeModal}
					isDismissible={false}
				>
					<div className="text-style-delete-modal">
						<p>
							{sprintf(
								// translators: Do you want to delete %s
								__(
									'Do you want to delete %s? If you are using this formatting for saved content, changing the class name may change the style.',
									'vk-blocks'
								),
								textStyleTitle
							)}
						</p>
						<div className="text-style-delete-modal-button-area">
							<Button
								isDestructive
								onClick={() => {
									deleteItem();
									closeModal();
								}}
							>
								{__('Delete', 'vk-blocks')}
							</Button>
							<Button isSecondary onClick={closeModal}>
								{__('Cancel', 'vk-blocks')}
							</Button>
						</div>
					</div>
				</Modal>
			)}
		</>
	);
};
