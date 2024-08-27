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

export const DeleteButton = (props) => {
	const { vkBlocksOption, setVkBlocksOption } = useContext(AdminContext);
	const { index, blockStyleListObj } = props;

	const [isModalOpen, setIsModalOpen] = useState(false);

	const openModal = () => setIsModalOpen(true);
	const closeModal = () => setIsModalOpen(false);

	const deleteItem = () => {
		vkBlocksOption.custom_block_style_lists.splice(index, 1);
		setVkBlocksOption({
			...vkBlocksOption,
		});
	};

	const textStyleTitle = !!blockStyleListObj.property_label
		? blockStyleListObj.property_label
		: __('Custom Block Style Setting', 'vk-blocks-pro');

	return (
		<div className="custom_block_style_item_delete_button">
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
					<div className="custom_block_style_delete_modal">
						<p>
							{__(
								'If this Block Style is used for saved content, the style may change.',
								'vk-blocks-pro'
							)}
						</p>
						<div className="custom_block_style_delete_modal_button_area">
							<Flex justify="flex-end">
								<FlexItem>
									<Button isSecondary onClick={closeModal}>
										{__('Cancel')}
									</Button>
								</FlexItem>
								<FlexItem>
									<Button
										className="delete-item-button"
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
		</div>
	);
};
