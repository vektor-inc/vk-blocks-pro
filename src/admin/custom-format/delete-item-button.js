/**
 * WordPress dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import { useContext, useState } from '@wordpress/element';
import { Button, Modal, Flex, FlexItem } from '@wordpress/components';

/**
 * Internal dependencies
 */
import { AdminContext } from '@vkblocks/admin/index';

export const DeleteItemButton = (props) => {
	const { vkBlocksOption, setVkBlocksOption } = useContext(AdminContext);
	const { index, textStyleListObj } = props;

	const [isModalOpen, setIsModalOpen] = useState(false);

	const openModal = () => setIsModalOpen(true);
	const closeModal = () => setIsModalOpen(false);

	const deleteItem = () => {
		vkBlocksOption.custom_format_lists.splice(index, 1);
		setVkBlocksOption({
			...vkBlocksOption,
		});
	};

	const textStyleTitle = !!textStyleListObj.title
		? textStyleListObj.title
		: __('Custom Format', 'vk-blocks-pro');

	return (
		<>
			<Button
				className="delete-item-button"
				isDestructive
				onClick={openModal}
			>
				{__('Delete', 'vk-blocks-pro')}
			</Button>
			{isModalOpen && (
				<Modal
					title={sprintf(
						// translators: Would you like to delete %s
						__('Would you like to delete %s?', 'vk-blocks-pro'),
						textStyleTitle
					)}
					onRequestClose={closeModal}
					isDismissible={false}
				>
					<div className="custom_format_delete_modal">
						<p>
							{__(
								'If the saved content has this format, the style will be unstyled.',
								'vk-blocks-pro'
							)}
						</p>
						<div className="custom_format_delete_modal_button_area">
							<Flex justify="flex-end">
								<FlexItem>
									<Button isSecondary onClick={closeModal}>
										{__('Cancel')}
									</Button>
								</FlexItem>
								<FlexItem>
									<Button
										isDestructive
										onClick={() => {
											deleteItem();
											closeModal();
										}}
									>
										{__('Delete', 'vk-blocks-pro')}
									</Button>
								</FlexItem>
							</Flex>
						</div>
					</div>
				</Modal>
			)}
		</>
	);
};
