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
		vkBlocksOption.text_style_lists.splice(index, 1);
		setVkBlocksOption({
			...vkBlocksOption,
		});
	};

	const textStyleTitle =
		textStyleListObj ??
		__(
			'書式設定',
			// 'Text Style',
			'vk-blocks'
		);

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
					title={sprintf(
						// translators: Would you like to delete %s
						__(
							'%s を削除しますか？',
							// 'Would you like to delete %s?',
							'vk-blocks'
						),
						textStyleTitle
					)}
					onRequestClose={closeModal}
					isDismissible={false}
				>
					<div className="text_style_delete_modal">
						<p>
							{__(
								'保存したコンテンツにこのフォーマットがある場合、スタイルが変更されます。',
								// 'If this format is used for saved content, the style may change.',
								'vk-blocks'
							)}
						</p>
						<div className="text_style_delete_modal_button_area">
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
										{__('Delete', 'vk-blocks')}
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
