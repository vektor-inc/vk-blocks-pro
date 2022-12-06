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
	const { index, textStyleListObj } = props;

	const [isModalOpen, setIsModalOpen] = useState(false);

	const openModal = () => setIsModalOpen(true);
	const closeModal = () => setIsModalOpen(false);

	const deleteItem = () => {
		vkBlocksOption.custom_block_style_lists.splice(index, 1);
		setVkBlocksOption({
			...vkBlocksOption,
		});
	};

	const textStyleTitle = !!textStyleListObj.property_label
		? textStyleListObj.property_label
		: __(
				'ブロックスタイル設定',
				// 'Custom Block Style',
				'vk-blocks'
		  );

	return (
		<div className="custom_block_style_item_delete_button">
			<Button
				className="delete-item-button"
				isDestructive
				onClick={openModal}
			>
				{__('Delete', 'vk-blocks')}
			</Button>
			{isModalOpen && (
				<Modal
					title={sprintf(
						// translators: Would you like to delete %s
						__(
							'%sを削除しますか？',
							// 'Would you like to delete %s?',
							'vk-blocks'
						),
						textStyleTitle
					)}
					onRequestClose={closeModal}
					isDismissible={false}
				>
					<div className="custom_block_style_delete_modal">
						<p>
							{__(
								'保存したコンテンツにこのブロックスタイルがある場合、スタイルが解除されます。',
								// 'If this Block Style is used for saved content, the style may change.',
								'vk-blocks'
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
										{__('Delete', 'vk-blocks')}
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
